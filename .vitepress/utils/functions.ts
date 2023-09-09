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

export function initTagsParams(post: Post[]) {
	const transformedData: Record<string, any>[] = [];
	const uniqueTags = Array.from(new Set(post.flatMap(item => item.frontMatter.tags)));
	uniqueTags.forEach(tag => {
		const tagData: Record<string, any> = {
			selectTag: tag,
			item: []
		};
		post.forEach(item => {
			if (item.frontMatter.tags.includes(tag)) {
				tagData.item.push({
					date: item.frontMatter.date,
					description: item.frontMatter.description,
					tags: item.frontMatter.tags,
					title: item.frontMatter.title,
					regularPath: item.regularPath
				});
			}
		});
		transformedData.push(tagData);
	});
	return transformedData;
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

export function albumImage() {
	return [
		{
			"src": "https://ice.frostsky.com/2023/09/09/e7750c04695b425c69bdffc0d1effc13.jpeg",
			"title": "",
			"desc": "Sept 2023 Summer",
			"time": ""
		},
		{
			"src": "",
			"title": "",
			"desc": "成长记录",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/c265b05fc7eb240cda44abbfa71693e8.jpeg",
			"title": "",
			"desc": "Sept 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/57388f4dc445870739e4249f255d8ec3.jpeg",
			"title": "",
			"desc": "Aug 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/b524fab939572d3adc3849f38725655a.jpeg",
			"title": "",
			"desc": "Jul 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/3dc0a4b9b807eef8904efd924696db66.jpeg",
			"title": "",
			"desc": "Jun 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/51ef74485020f9b7a83c0535efaa52aa.jpeg",
			"title": "",
			"desc": "May 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/c23b16eacfdac61b0819082ea33847d5.jpeg",
			"title": "",
			"desc": "Apr 2023 Summer",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/6f34de29d851afbde629ff81d32f1a1a.jpeg",
			"title": "",
			"desc": "Mar 2023 Spring",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/3a51d65179cd9d763c6d1acf845c0255.jpeg",
			"title": "",
			"desc": "Feb 2023 Spring",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/e573573587aff38b2f2a03bb78963360.jpeg",
			"title": "",
			"desc": "Jan 2023 Winter",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/f0c9670bb36235e4780461d53a653c97.jpeg",
			"title": "",
			"desc": "Dec 2022 Winter",
			"time": ""
		},
		{
			"src": "https://ice.frostsky.com/2023/09/09/0f87edac7730988ed1ac36e8295aeb66.jpeg",
			"title": "",
			"desc": "Nov 2022 Autumn",
			"time": "",
		},
		{
			"src": 'https://ice.frostsky.com/2023/09/09/eda49f3aa6c51a88ece76cdfb9c28537.jpeg',
			"title": "",
			"desc": "Oct 2022 Autumn",
			"time": "",
		},
		{
			"src": 'https://ice.frostsky.com/2023/09/09/3b97510b22e2551100fb89a2705a26e4.jpeg',
			"title": "",
			"desc": "Oct 2022 Autumn",
			"time": "",
		},
		{
			"src": 'https://ice.frostsky.com/2023/09/09/a4b0c020d41e80f35680ab1317a75218.jpeg',
			"title": "",
			"desc": "Sept 2022 Summer",
			"time": "",
		}
	]
}
