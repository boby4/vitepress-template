---
date: 2024-03-04
title: 浅尝WebRTC拉流，实现两个小功能
tags:
- Webrtc
description: 最近搞了个前端使用WebRTC拉取视频流，视频流里面是一个数字人的展示，然后通过文本输入/语音录入的方式向数字人提问的小功能（仅前端）。
---

# **浅尝WebRTC拉流，实现两个小功能**

最近搞了个前端使用WebRTC拉取视频流，视频流是一个数字人的展示，然后通过文本输入/语音录入的方式向数字人提问的小功能。对实现的方案以及遇到的问题做一个小总结

## **什么是WebRTC拉流**

WebRTC拉流是指使用WebRTC协议从服务器获取已有直播内容的过程。
WebRTC（Web Real-Time Communication）是一个支持浏览器进行实时语音、视频对话和数据传输的开源协议。在拉流过程中，主要涉及到以下步骤：

&emsp;1. 获取媒体流：拉流的第一步是获取媒体流，这些媒体流可以是摄像头、麦克风或屏幕共享的内容。在WebRTC中，通常使用getUserMedia API来获取这些媒体流。

&emsp;2. 创建RTCPeerConnection：RTCPeerConnection是WebRTC中用于处理与远程对等方之间音视频通信的关键对象。在拉流场景中，需要使用RTCPeerConnection来接收远程对等方发送的媒体流。

&emsp;3. 接收远程流：通过RTCPeerConnection，可以接收远程对等方发送的媒体流。

&emsp;4. 设置远程SDP：接收到远程SDP（会话描述协议）后，需要将其设置为远程对等方的描述，以便RTCPeerConnection知道远程对等方希望发送哪种类型的媒体流。

总的来说，WebRTC拉流允许客户端从服务器获取实时音视频数据，并在浏览器中进行解码和渲染，从而实现音视频内容的实时播放。浏览器暴露出RTCPeerConnection方法之后，手动触发一个发offer(sdp就在这个offer里面)的方法之后就可以跟服务器实时媒体流进行交互，通过setRemoteDescription从服务端接收SDP数据，两边这么一握手，诶做一个信息对等就可以进行通信了

## **拉流功能实现**

定一个div，把具名为'jswebrtc'的元素创建成一个视频元素对象，从'data-url'属性中获取视频流地址

Player构造函数用于接收视频流的URL和选项作为参数，然后调用startLoading 方法用于开始加载视频流，创建RTC链接监听‘ontrack’事件，当收到视频轨道时将其赋值给视频元素，然后创建一个offer，发送给服务器等待answer，服务器answer后将服务器的answer设置为远程描述，通信完成，如果设置了autoplay 选项，则会自动播放视频。

play、pause、stop 和 destroy这些方法用于控制视频的播放、暂停、停止和销毁。

update 方法用于更新视频播放状态，通过递归调用自身来持续更新视频的播放状态。

```html
<div style="z-index: 1;" class="jswebrtc" data-url="webrtc://地址"></div>
<script>
  // 定义 JSWebrtc 对象
var JSWebrtc = {
    Player: null, // 播放器对象
    VideoElement: null, // 视频元素对象

    // 创建视频元素方法
    CreateVideoElements: function () {
        // 获取所有具有类名 'jswebrtc' 的元素
        var elements = document.querySelectorAll('.jswebrtc');
        // 遍历元素数组
        for (var i = 0; i < elements.length; i++) {
            // 创建视频元素对象并传入当前元素
            new JSWebrtc.VideoElement(elements[i]);
        }
    },

    // 填充查询参数方法
    FillQuery: function (query_string, obj) {
        // 初始化用户查询对象
        obj.user_query = {};
        // 如果查询字符串为空，则返回
        if (query_string.length == 0) return;
        // 如果查询字符串中包含 '?'，则将其分割为数组
        if (query_string.indexOf('?') >= 0)
            query_string = query_string.split('?')[1];
        // 将查询字符串按 '&' 分割为数组
        var queries = query_string.split('&');
        // 遍历查询数组
        for (var i = 0; i < queries.length; i++) {
            // 将每个查询按 '=' 分割为键值对
            var query = queries[i].split('=');
            // 将键值对添加到目标对象和用户查询对象中
            obj[query[0]] = query[1];
            obj.user_query[query[0]] = query[1];
        }
        // 如果目标对象包含 domain 属性，则将其赋值给 vhost 属性
        if (obj.domain) obj.vhost = obj.domain;
    },

    // 解析 URL 方法
    ParseUrl: function (rtmp_url) {
        // 创建一个链接元素
        var a = document.createElement('a');
        // 将 RTMP URL 替换为 HTTP 协议
        a.href = rtmp_url
            .replace('rtmp://', 'http://')
            .replace('webrtc://', 'http://')
            .replace('rtc://', 'http://');
        // 获取主机名、应用和流名称等信息
        var vhost = a.hostname;
        var app = a.pathname.substr(1, a.pathname.lastIndexOf('/') - 1);
        var stream = a.pathname.substr(a.pathname.lastIndexOf('/') + 1);
        // 替换应用中的特殊字符
        app = app.replace('...vhost...', '?vhost=');
        // 如果应用中包含查询参数，则解析出 vhost 参数
        if (app.indexOf('?') >= 0) {
            var params = app.substr(app.indexOf('?'));
            app = app.substr(0, app.indexOf('?'));
            if (params.indexOf('vhost=') > 0) {
                vhost = params.substr(params.indexOf('vhost=') + 'vhost='.length);
                if (vhost.indexOf('&') > 0) {
                    vhost = vhost.substr(0, vhost.indexOf('&'));
                }
            }
        }
        // 如果主机名为 IP 地址，则将 vhost 设置为默认值
        if (a.hostname == vhost) {
            var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
            if (re.test(a.hostname)) vhost = '__defaultVhost__';
        }
        // 设置协议、端口和返回对象
        var schema = 'rtmp';
        if (rtmp_url.indexOf('://') > 0)
            schema = rtmp_url.substr(0, rtmp_url.indexOf('://'));
        var port = a.port;
        if (!port) {
            if (schema === 'http') {
                port = 80;
            } else if (schema === 'https') {
                port = 443;
            } else if (schema === 'rtmp') {
                port = 1935;
            } else if (schema === 'webrtc' || schema === 'rtc') {
                port = 1985;
            }
        }
        // 构建返回对象
        var ret = {
            url: rtmp_url,
            schema: schema,
            server: a.hostname,
            port: port,
            vhost: vhost,
            app: app,
            stream: stream,
        };
        // 填充查询参数到返回对象中
        JSWebrtc.FillQuery(a.search, ret);
        return ret;
    },

    // 发起 HTTP POST 请求方法
    HttpPost: function (url, data) {
        // 返回一个 Promise 对象
        return new Promise(function (resolve, reject) {
            // 创建 XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            // 监听状态改变事件
            xhr.onreadystatechange = function () {
                // 请求完成且状态码为成功时
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    // 解析响应数据为 JSON 格式
                    var respone = JSON.parse(xhr.responseText);
                    // 清除监听事件并置空 XMLHttpRequest 对象
                    xhr.onreadystatechange = new Function();
                    xhr = null;
                    // 解析响应数据并返回
                    resolve(respone);
                }
            };
            // 打开 POST 请求，并设置超时时间、响应类型和请求头
            xhr.open('POST', url, true);
            xhr.timeout = 5e3;
            xhr.responseType = 'text';
            xhr.setRequestHeader('Content-Type', 'application/json');
            // 发送数据
            xhr.send(data);
        });
    },
};

// 当文档加载完成时
if (document.readyState === 'complete') {
    // 创建视频元素
    JSWebrtc.CreateVideoElements();
} else {
    // 监听 DOMContentLoaded 事件，并创建视频元素
    document.addEventListener('DOMContentLoaded', JSWebrtc.CreateVideoElements);
}

// 视频元素对象
JSWebrtc.VideoElement = (function () {
    'use strict';
    // 视频元素构造函数
    var VideoElement = function (element) {
        // 获取 data-url 属性值
        var url = element.dataset.url;
        // 如果没有设置 data-url 属性，则抛出异常
        if (!url) {
            throw 'VideoElement has no `data-url` attribute';
        }
        // 设置容器元素和视频元素
        this.container = element;
        this.video = document.createElement('video');
        this.video.width = '576';
        this.video.height = '864';
        this.video.autoplay = true; // 自动播放
        this.video.controls = true; // 显示视频自带的控制按钮
        this.container.appendChild(this.video);
        // 解析 data-* 属性为选项，并创建播放器对象
        var options = { video: this.video };
        for (var option in element.dataset) {
            try {
                options[option] = JSON.parse(element.dataset[option]);
            } catch (err) {
                options[option] = element.dataset[option];
            }
        }
        this.player = new JSWebrtc.Player(url, options);
        element.playerInstance = this.player;
    };
    return VideoElement;
})();

// 播放器对象
JSWebrtc.Player = (function () {
    'use strict';
    // 播放器构造函数
    var Player = function (url, options) {
        this.options = options || {};
        // 如果 URL 不是以 webrtc:// 开头，则抛出异常
        if (!url.match(/^webrtc?:\/\//)) {
            throw 'JSWebrtc just work with webrtc';
        }
        // 如果没有设置视频元素，则抛出异常
        if (!this.options.video) {
            throw 'VideoElement is null';
        }
        // 解析 URL 参数
        this.urlParams = JSWebrtc.ParseUrl(url);
        this.pc = null;
        this.autoplay = !!options.autoplay || true;
        this.paused = true;
        if (this.autoplay) this.options.video.muted = true;
        this.startLoading();
    };

    // 开始加载方法
    Player.prototype.startLoading = function () {
        var _self = this;
        // 关闭当前 PeerConnection
        if (_self.pc) {
            _self.pc.close();
        }
        // 创建新的 PeerConnection
        _self.pc = new RTCPeerConnection(null);
        _self.pc.ontrack = function (event) {
            _self.options.video['srcObject'] = event.streams[0];
        };
        _self.pc.addTransceiver('audio', { direction: 'recvonly' });
        _self.pc.addTransceiver('video', { direction: 'recvonly' });
        _self.pc
            .createOffer()
            .then(function (offer) {
                return _self.pc.setLocalDescription(offer).then(function () {
                    return offer;
                });
            })
            .then(function (offer) {
                return new Promise(function (resolve, reject) {
                    var port = _self.urlParams.port || 1985;
                    var api = _self.urlParams.user_query.play || '/rtc/v1/play/';
                    if (api.lastIndexOf('/') != api.length - 1) {
                        api += '/';
                    }
                    var url = 'http://' + _self.urlParams.server + ':' + port + api;
                    for (var key in _self.urlParams.user_query) {
                        if (key != 'api' && key != 'play') {
                            url += '&' + key + '=' + _self.urlParams.user_query[key];
                        }
                    }
                    var data = {
                        api: url,
                        streamurl: _self.urlParams.url,
                        clientip: null,
                        sdp: offer.sdp,
                    };
                    // 发送 HTTP POST 请求
                    JSWebrtc.HttpPost(url, JSON.stringify(data)).then(
                        function (res) {
                            resolve(res.sdp);
                        },
                        function (rej) {
                            reject(rej);
                        }
                    );
                });
            })
            .then(function (answer) {
                return _self.pc.setRemoteDescription(
                    new RTCSessionDescription({ type: 'answer', sdp: answer })
                );
            })
            .catch(function (reason) {
                throw reason;
            });
        if (this.autoplay) {
            this.play();
        }
    };

    // 播放方法
    Player.prototype.play = function (ev) {
        if (this.animationId) {
            return;
        }
        this.animationId = requestAnimationFrame(this.update.bind(this));
        this.paused = false;
    };

    // 暂停方法
    Player.prototype.pause = function (ev) {
        if (this.paused) {
            return;
        }
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        this.isPlaying = false;
        this.paused = true;
        this.options.video.pause();
        if (this.options.onPause) {
            this.options.onPause(this);
        }
    };

    // 停止方法
    Player.prototype.stop = function (ev) {
        this.pause();
    };

    // 销毁方法
    Player.prototype.destroy = function () {
        this.pause();
        this.pc && this.pc.close() && this.pc.destroy();
        this.audioOut && this.audioOut.destroy();
    };

    // 更新方法
    Player.prototype.update = function () {
        this.animationId = requestAnimationFrame(this.update.bind(this));
        if (this.options.video.readyState < 4) {
            return;
        }
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.options.video.play();
            if (this.options.onPlay) {
                this.options.onPlay(this);
            }
        }
    };

    return Player;
})();
</script>
```

* 通过上面一系列的操作之后就可以实现把视频流渲染到播放器里了

## **实现效果**
<a data-fancybox="gallery" href="https://img2.imgtp.com/2024/03/14/B0Gt6R2l.png" data-caption="视频流拉取">
    <img v-lazy="'https://img2.imgtp.com/2024/03/14/B0Gt6R2l.png'"/>
</a>

## **录音转文本功能**

录音转文本功能的实现是通过接入讯飞录音转文本的sdk接口地址 <a style="color:blue;" href="https://www.xfyun.cn/doc/asr/voicedictation/API.html#%E6%8E%A5%E5%8F%A3demo">讯飞语音听写WebAPI文档</a>


<a data-fancybox="gallery" href="https://img2.imgtp.com/2024/03/14/FEq7R3XY.png" data-caption="视频流拉取">
    <img v-lazy="'https://img2.imgtp.com/2024/03/14/FEq7R3XY.png'"/>
</a>

下载里面的js demo即可

定义好自己的'APPID'、'API_SECRET'、'API_KEY', 然后在index.js文件做一点简单的修改，把生成的文本传到后端接口里即可：

```js
function renderResult(resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = "";
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      if (data.pgs) {
        if (data.pgs === "apd") {
          // 将resultTextTemp同步给resultText
          resultText = resultTextTemp;
        }
        // 将结果存储在resultTextTemp中
        resultTextTemp = resultText + str;
      } else {
        resultText = resultText + str;
      }
      if(btnStatus === 'CLOSING') {
        ...
        // 在这里调用你的接口把resultTextTemp/resultText参数传过去
      }
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      iatWS.close();
    }
    if (jsonData.code !== 0) {
      iatWS.close();
      console.error(jsonData);
    }
  }
```

* 到这里就实现了录音转文本之后调用接口传文本信息，成功后视频流里的数字人会做出响应。

以上

<Fancybox />
<Comment />
