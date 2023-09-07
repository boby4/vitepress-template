type Post = {
	frontMatter: {
		date: string;
		title: string;
		tags: string[];
		description: string;
	};
	regularPath: string;
};

export function initTags(post: Post[]) {
	const data: any = {};
	for (let index = 0; index < post.length; index++) {
		const element = post[index];
		const tags = element.frontMatter.tags;
		if (tags) {
			tags.forEach((item) => {
				if (data[item]) {
					data[item].push(element);
				} else {
					data[item] = [];
					data[item].push(element);
				}
			});
		}
	}
	return data;
}

export function useYearSort(post: Post[]) {
	const data = [];
	let year = '0';
	let num = -1;
	for (let index = 0; index < post.length; index++) {
		const element = post[index];
		if (element.frontMatter.date) {
			const y = element.frontMatter.date.split('-')[0];
			if (y === year) {
				data[num].push(element);
			} else {
				num++;
				data[num] = [] as any;
				data[num].push(element);
				year = y;
			}
		}
	}
	return data;
}

export function randomImage() {
	const imageArray = [
		'https://ice.frostsky.com/2023/09/07/4d348831ab4ef88112a19f5efc2741c3.jpeg',
		'https://ice.frostsky.com/2023/09/07/4fc03088862d4256b6df81c9f61a8cf9.jpeg',
		'https://ice.frostsky.com/2023/09/07/94565255cc9e8439decb0dbaf683b565.jpeg',
		'https://ice.frostsky.com/2023/09/07/827c01c1219949cc6f649947f3876dc2.jpeg',
		'https://ice.frostsky.com/2023/09/07/f3ff873adc3d7d095389a092e42f503d.jpeg',
		'https://ice.frostsky.com/2023/09/07/6a8f65ac5f90226096fbea2a8839ee85.jpeg',
		'https://ice.frostsky.com/2023/09/07/ef439fb9ebc4f6704cc0b4dd8d221125.jpeg',
		'https://ice.frostsky.com/2023/09/07/8ed527cc40ab38723cfb339cc2f873d3.jpeg',
		'https://ice.frostsky.com/2023/09/07/0a5c2fedda66a8ed766483596fe20ba4.jpeg',
	];
	// 生成随机索引
	const randomIndex = Math.floor(Math.random() * imageArray.length);
	// 返回随机图片
	return imageArray[randomIndex];
}
