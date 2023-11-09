export const connectSetting = {
	labelStyle: {
		fill: '#3c3c43',
		ontSize: 12,
	},
	labelBgPadding: [20, 3, 14, 2],
	labelBgBorderRadius: 4,
	style: {
		stroke: '#3c3c43',
		strokeWidth: 1,
	},
	markerStart: '',
	markerEnd: '',
	labelBgStyle: {
		fill: '',
		stroke: '',
	},
	animated: false,
};

let id = 0;
function getId() {
	return `dndnode_${id++}`;
}

export const choiceNode: Record<string, any> = {
	square: '矩形',
	ysquare: '圆角矩形',
	rhomboid: '平行四边形',
	oval: '椭圆',
	circle: '圆形',
	image: '',
};

export const imageNodeSetting = (type: string, position: object) => {
	return {
		id: getId(),
		type,
		position,
		label: choiceNode[type],
		data: {
			type,
			label: '',
			color: '#3c3c43',
			fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: '#5F95FF',
			borderColor: '#3c3c43',
			xlinkHref: '/public/src/img/svg.png',
			width: '80px',
			height: '80px',
			border: '1px solid #3c3c43',
		},
	};
};

export const nodeSetting = (type: string, position: object) => {
	return {
		id: getId(),
		type,
		position,
		label: choiceNode[type],
		data: {
			type,
			label: choiceNode[type],
			color: '#3c3c43',
			fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: '',
			borderColor: '#3c3c43',
		},
	};
};
