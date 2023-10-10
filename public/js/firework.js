// 定义一个点击特效的函数
function clickEffect() {
  // 存储球对象的数组
  let balls = [];
  // 用于计算乘数
  let multiplier = 0;
  let width, height;
  let ctx;
  // 定义颜色数组
  const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
  // 创建一个 <canvas> 元素并添加到页面中
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // 设置 <canvas> 的样式
  canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
  // 检查浏览器是否支持 <canvas> 和事件监听
  if (canvas.getContext && window.addEventListener) {
    // 获取 <canvas> 的 2D 绘图上下文
    ctx = canvas.getContext("2d");
    // 更新窗口尺寸信息
    updateSize();
    // 监听窗口大小变化事件，更新 <canvas> 尺寸
    window.addEventListener('resize', updateSize, false);
    // 启动循环动画
    loop();
    // 监听鼠标按下事件
    window.addEventListener("mousedown", function(e) {
      pushBalls(randBetween(10, 20), e.clientX, e.clientY);
    }, false);
  } else {
    console.log("canvas or addEventListener is unsupported!");
  }
  // 更新 <canvas> 尺寸相关参数
  function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
  }
  // 定义球类
  class Ball {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = Math.PI * 2 * Math.random();
      this.multiplier = randBetween(6, 12);
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
      this.r = randBetween(5, 8) + 3 * Math.random();
      this.color = colours[Math.floor(Math.random() * colours.length)];
    }
    // 更新球的位置和状态
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.r -= 0.3;
      this.vx *= 0.9;
      this.vy *= 0.9;
    }
  }
  // 在指定位置创建多个球对象
  function pushBalls(count, x, y) {
    for (let i = 0; i < count; i++) {
      balls.push(new Ball(x, y));
    }
  }
  // 生成 min 和 max 之间的随机数
  function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }
  // 主循环函数
  function loop() {
    // 清空画布
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 更新每个球的位置和绘制
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.r < 0) continue;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
      ctx.fill();
      b.update();
    }
    // 清除已经离开画布的球
    removeBall();
    // 循环调用 loop 函数以进行动画
    requestAnimationFrame(loop);
  }
  // 移除离开画布的球
  function removeBall() {
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
        balls.splice(i, 1);
      }
    }
  }
}
// 调用点击特效函数，启动特效
clickEffect();
