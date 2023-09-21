export function secondToDate(second) {
	if (!second) {
		return [0, 0, 0, 0, 0];
	}
	var time = new Array(0, 0, 0, 0, 0);
	if (second >= 365 * 24 * 3600) {
		time[0] = parseInt(second / (365 * 24 * 3600));
		second %= 365 * 24 * 3600;
	}
	if (second >= 24 * 3600) {
		time[1] = parseInt(second / (24 * 3600));
		second %= 24 * 3600;
	}
	if (second >= 3600) {
		time[2] = parseInt(second / 3600);
		second %= 3600;
	}
	if (second >= 60) {
		time[3] = parseInt(second / 60);
		second %= 60;
	}
	if (second > 0) {
		time[4] = second;
	}
	return time;
}

export function calculateUptime() {
	let create_time = Math.round(
		new Date(Date.UTC(2023, 7, 15, 0, 0, 0)).getTime() / 1000
	); // 注意月份是从0开始计数，所以月份要-1
	let timestamp = Math.round(new Date().getTime() / 1000); // 不需要再加上时区偏移
	let currentTime = secondToDate(timestamp - create_time);
	let currentTimeHtml =
		currentTime[0] +
		'年' +
		currentTime[1] +
		'天' +
		currentTime[2] +
		'时' +
		currentTime[3] +
		'分' +
		currentTime[4] +
		'秒';
	return currentTimeHtml;
}
