export function calculateUptime() {
  let create_time = new Date(2023, 7, 15); // 月份是从 0 开始计数，所以 8 月对应 7
  let currentTime = new Date();
  let timeDiff = currentTime - create_time;
  // 计算年、月、日、小时、分钟和秒
  let years = Math.floor(timeDiff / (365 * 24 * 60 * 60 * 1000));
  timeDiff -= years * 365 * 24 * 60 * 60 * 1000;
  let months = Math.floor(timeDiff / (30 * 24 * 60 * 60 * 1000)); // 平均每月 30 天
  timeDiff -= months * 30 * 24 * 60 * 60 * 1000;
  let days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  timeDiff -= days * 24 * 60 * 60 * 1000;
  let hours = Math.floor(timeDiff / (60 * 60 * 1000));
  timeDiff -= hours * 60 * 60 * 1000;
  let minutes = Math.floor(timeDiff / (60 * 1000));
  timeDiff -= minutes * 60 * 1000;
  let seconds = Math.floor(timeDiff / 1000);
  return `${years}年${months}月${days}天${hours}小时${minutes}分钟${seconds}秒`;
}
