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
		'https://github.com/boby4/picx-images-hosting/raw/master/1b91d753cbb64883aee1dacb31bea7bd.8ojpw0ssco.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/5c23d52f880511ebb6edd017c2d2eca2.7egspptub0.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/724a141e9ffd4a519b9d582151f1c54d.8l03ybivbe.png',
		'https://github.com/boby4/picx-images-hosting/raw/master/1536a1ad880511ebb6edd017c2d2eca2.wikwej4t9.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/433387c3882211ebb6edd017c2d2eca2.969rkmdowq.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/a6fec42e882111ebb6edd017c2d2eca2.7sn8gl2t4j.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/a202c44c2075478dbfac39baeb800046.60u9lojlfz.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/b29f2454efdc4ccb84ce2feb7fa24b83.41y2vce7h2.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/ba41a32b219e4b40ad055bbb52935896.13lsru62yn.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/bbc58c3d998d4f389fdae649334873f7.13lsru6baj.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/c0dd2053b27e4957af8aedd5fe3ca485.4xukasoi33.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/c53c811f880411ebb6edd017c2d2eca2.4xukasonb7.webp',
		'https://github.com/boby4/picx-images-hosting/raw/master/cb6a04e0c76f42828ab173cf0555a6a4.83a29qj87g.webp',
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
			"desc": "阿瑞的成长记录",
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


export function calculateUptime() {
  let create_time:any = new Date(2023, 7, 15); // 月份是从 0 开始计数，所以 8 月对应 7
  let currentTime:any = new Date();
  let timeDiff = currentTime - create_time;

  let days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
  timeDiff -= days * 24 * 60 * 60 * 1000;
  let hours = Math.floor(timeDiff / (60 * 60 * 1000));
  timeDiff -= hours * 60 * 60 * 1000;
  let minutes = Math.floor(timeDiff / (60 * 1000));
  timeDiff -= minutes * 60 * 1000;
  let seconds = Math.floor(timeDiff / 1000);

  return `${days}天${hours}小时${minutes}分钟${seconds}秒`;
}

export function remoteImport(url:string) {
  return new Promise((resolve:any) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    head.appendChild(script);
    script.onload = function () {
      resolve();
    };
  });
}

const observers: any[] = []; // 用于存储所有观察者 -> 收集起来主要是为了当路由变化时效果之前的观察者。
// 元素是否在视口
const isElementInViewport = (element: HTMLElement) => {
	var rect = element.getBoundingClientRect();
	const isInViewport =
		rect.top >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight);
	return isInViewport;
};

// 检查是否有自定义属性
const checkHasAttribute = (element: HTMLElement) => {
	return !!element.getAttribute('snow_is_show');
};

// 初始化函数
export const initFirstScreen = () => {
	const main = document.querySelector('.vp-doc>div') || [];
	const paragraphs = [...(main?.children || [])];
	paragraphs.forEach((item) => {
		if (isElementInViewport(item)) {
			item.classList.add('animate__animated', 'animate__fadeInUp');
			item.setAttribute('snow_is_show', true);
		}
	});
};
const getRandomAnimationClass = () => {
	const animationClasses = ['animate__fadeInUp', 'animate__fadeInLeft', 'animate__fadeInDown'];
	const probabilities = [0.5, 0.3, 0.2];
	let cumulativeProbability = 0;
	const randomValue = Math.random();
	for (let i = 0; i < animationClasses.length; i++) {
		cumulativeProbability += probabilities[i];
		if (randomValue <= cumulativeProbability) {
			return animationClasses[i];
		}
	}
	return animationClasses[animationClasses.length - 1];
};
// 核心脚本
export const animateFn = () => {
	const main = document.querySelector('.vp-doc>div') || [];
	const paragraphs = [...(main?.children || [])];
	paragraphs.forEach((item) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !checkHasAttribute(item)) {
					// 元素进入视口
					item.classList.add('animate__animated', getRandomAnimationClass());
					item.setAttribute('snow_is_show', true);
				}
			});
		});
		observer.observe(item);
		observers.push(observer);
	});
};
// 清空所有 observer 的函数
export const destructionObserver = () => {
	observers.forEach((observe) => {
		observe.disconnect();
	});
	observers.length = 0;
};

