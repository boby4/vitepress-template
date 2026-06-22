---
date: 2025-06-09
title: Nginx 配置 HTTPS、Gzip 与缓存优化实战
tags:
  - Nginx
  - 运维
  - 性能优化
description: 从一份能跑的基础配置出发，逐步给 Nginx 加上 HTTPS、Gzip 压缩、静态资源缓存和安全响应头，让前端站点又快又稳。
---

# Nginx 配置 HTTPS、Gzip 与缓存优化实战

部署前端项目时，Nginx 几乎是绕不开的。但很多人的配置停留在「能访问就行」的程度——HTTP 裸奔、资源不压缩、缓存全靠浏览器默认行为。其实只要在基础配置上加几块，站点的加载速度和安全性就能上一个台阶。

这篇从一份最朴素的配置开始，一步步加料，每一步都讲清楚为什么这么配。

## 起点：一份能跑的基础配置

假设我们部署一个打包好的前端单页应用（SPA），产物在 `/var/www/myapp/dist`。最简配置长这样：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/myapp/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`try_files ... /index.html` 这行是 SPA 的关键——前端路由的路径在服务器上没有对应文件，所以统统回退到 `index.html`，交给前端路由处理。否则刷新非首页路由会 404。

这份配置能用，但问题不少：明文 HTTP、资源不压缩、没缓存策略。下面逐个解决。

## 一、上 HTTPS

现在 HTTPS 是标配，没证书浏览器会标「不安全」，还影响 SEO。证书用 Let's Encrypt 免费签，工具是 certbot：

```bash
# 安装 certbot（以 CentOS 为例）
yum install -y certbot python3-certbot-nginx

# 自动签发并写入 nginx 配置
certbot --nginx -d example.com
```

certbot 会自动帮你改配置。如果想手动控制，证书签好后配置大致是：

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # 只用安全的 TLS 版本
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/myapp/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# HTTP 自动跳转到 HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

两个要点：

- `listen 443 ssl http2` 顺手开了 HTTP/2，多路复用能显著提升加载速度，开了不亏。
- 单独一个 80 端口的 server 块做 301 跳转，保证用户敲 HTTP 也能被引到 HTTPS。

Let's Encrypt 证书 90 天过期，记得配自动续期：

```bash
# 测试续期流程
certbot renew --dry-run
# 加进定时任务，每天检查一次
echo "0 3 * * * certbot renew --quiet" >> /etc/crontab
```

## 二、开启 Gzip 压缩

文本类资源（JS、CSS、HTML）压缩后体积能减少 60%~80%，传输更快。在 `http` 块或 `server` 块里加：

```nginx
gzip on;
gzip_comp_level 6;
gzip_min_length 1024;
gzip_vary on;
gzip_types
    text/plain
    text/css
    application/json
    application/javascript
    text/xml
    application/xml
    image/svg+xml;
```

说明：

- `gzip_comp_level 6`：压缩级别 1-9，6 是压缩率和 CPU 开销的平衡点，别盲目开 9。
- `gzip_min_length 1024`：小于 1KB 的文件压缩了反而可能更大，不压。
- `gzip_vary on`：响应头加上 `Vary: Accept-Encoding`，让缓存服务器区分压缩和未压缩版本。
- `gzip_types` 不用配 `image/jpeg`、`image/png`——这些本身已经是压缩格式，再压没意义。

如果服务器装了 brotli 模块，压缩率比 gzip 还高，可以一起配上做降级。

## 三、静态资源缓存

前端打包工具（Vite、Webpack）通常会给文件名加 hash，比如 `app.a1b2c3.js`。内容一变，hash 就变。这给了我们一个完美的缓存策略：**带 hash 的资源永久强缓存，HTML 不缓存**。

```nginx
# 带 hash 的静态资源，强缓存一年
location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# HTML 不缓存，保证用户总能拿到最新入口
location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

逻辑是这样的：

- `index.html` 是入口，引用了带 hash 的资源。它必须每次都拿最新的，否则用户可能加载到旧的资源引用。
- 带 hash 的资源因为文件名唯一，可以放心永久缓存。`immutable` 告诉浏览器「这文件永远不会变，连重新验证都不用」。
- 这样发版后，HTML 变了引用新 hash，浏览器自动拉新资源；没变的资源继续走缓存，体验最优。

`access_log off` 关掉静态资源的访问日志，减少磁盘 IO，日志也清爽。

## 四、加上安全响应头

几个能显著提升安全性、配置成本却很低的响应头：

```nginx
# 强制 HTTPS，浏览器记住一年内只用 HTTPS 访问
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
# 禁止浏览器猜测 MIME 类型，防 XSS
add_header X-Content-Type-Options "nosniff" always;
# 禁止页面被嵌入 iframe，防点击劫持
add_header X-Frame-Options "DENY" always;
# 控制 referrer 信息泄露
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

注意每个 `add_header` 都加了 `always`——不加的话，某些状态码（比如 4xx、5xx）的响应不会带上这些头。

`Strict-Transport-Security`（HSTS）要谨慎：一旦下发，浏览器在 max-age 期间会强制用 HTTPS。所以**确认 HTTPS 已经稳定可用再开**，否则证书出问题时用户会无法访问。

## 五、合在一起的完整配置

把上面所有部分整合：

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/myapp/dist;
    index index.html;

    # Gzip
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_vary on;
    gzip_types text/plain text/css application/json
               application/javascript text/xml application/xml image/svg+xml;

    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # 静态资源强缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # HTML 不缓存
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

## 六、改完别忘了验证

每次改完配置，先测语法再重载，别直接重启：

```bash
# 测试配置语法是否正确
nginx -t

# 语法没问题再平滑重载（不中断现有连接）
nginx -s reload
```

`nginx -t` 这步千万别省。配置有语法错误时 `reload` 会失败，要是你之前 `restart` 了，服务可能直接起不来，站点就挂了。

验证效果可以用浏览器开发者工具看 Network 面板：响应头里有没有 `content-encoding: gzip`、静态资源的 `cache-control` 对不对、HTTPS 锁图标正不正常。或者用 [SSL Labs](https://www.ssllabs.com/ssltest/) 给你的 HTTPS 配置打个分。

## 写在最后

Nginx 的优化能做的远不止这些——限流、负载均衡、反向代理缓存都是大话题。但对一个前端站点来说，这篇覆盖的 HTTPS、Gzip、缓存、安全头四件套，已经能解决 80% 的性能和安全问题，投入产出比很高。

配置这东西，理解了每一行在干什么，比直接抄一份「最佳实践」重要得多。抄来的配置出了问题你不知道怎么调，理解了的配置才是你自己的。
