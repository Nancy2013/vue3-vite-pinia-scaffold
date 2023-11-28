import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import request from "@/utils/axios";

import zlDcIcon from "@/assets/mobileImages/main/home/zl_dc_icon.png";
import zlClIcon from "@/assets/mobileImages/main/home/zl_cl_icon.png";
import zlEsgIcon from "@/assets/mobileImages/main/home/zl_esg_icon.png";
import zlSjIcon from "@/assets/mobileImages/main/home/zl_sj_icon.png";
import zlDcActive from "@/assets/mobileImages/main/home/zl_dc_active.png";
import zlClActive from "@/assets/mobileImages/main/home/zl_cl_active.png";
import zlEsgActive from "@/assets/mobileImages/main/home/zl_esg_active.png";
import zlSjActive from "@/assets/mobileImages/main/home/zl_sj_active.png";
import zlDcImg from "@/assets/mobileImages/main/home/zl_dc_img.png";
import processDotImg from "@/assets/mobileImages/main/home/process_dot.png";
import processLineImg from "@/assets/mobileImages/main/home/process_line.png";
import processDivideImg from "@/assets/mobileImages/main/home/process-divide.png";

import checkCircleFill from "@/assets/mobileImages/main/home/check_circle_fill.png";
import rzImg from "@/assets/mobileImages/main/home/rz_img.png";
import successTip from "@/assets/mobileImages/main/home/success_tip.png";
import childrenGray from "@/assets/mobileImages/main/home/children_gray.png";
import childrenActive from "@/assets/mobileImages/main/home/children_active.png";
import legendBzIcon from "@/assets/mobileImages/main/home/legend_bz.png";
import legendBbzIcon from "@/assets/mobileImages/main/home/legend_bbz.png";
import legendJbbzIcon from "@/assets/mobileImages/main/home/legend_jbbz.png";

import { useRoute } from "vue-router";


// tab数据
const tabArr = [
	{
		active: 1,
		icon: zlDcIcon,
		activeIcon: zlDcActive,
		name: "tabArr_name1",
	},
	{
		active: 0,
		icon: zlClIcon,
		activeIcon: zlClActive,
		name: "tabArr_name2",
	},
	{
		active: 0,
		icon: zlEsgIcon,
		activeIcon: zlEsgActive,
		name: "tabArr_name3",
	},
	{
		active: 0,
		icon: zlSjIcon,
		activeIcon: zlSjActive,
		name: "tabArr_name4",
	},
];

// 列表数据
const listArr = {
	// 材料
	material: [
		{
			type: "text",
			key: "回收材料名称-生产过程中使用",
			value: "三元锂、磷酸铁锂、钴酸锂",
		},
		{
			type: "text",
			key: "可追溯材料的质量占电池总重",
			value: "78%",
		},
		{
			type: "text",
			key: "第一/第二级追溯材料名称",
			value: "未披露",
		},
		{
			type: "text",
			key: "每块电池的物理数量",
			value: "2000mAh",
		},
		{
			type: "tag",
			key: "第一级/第二级材料来源",
			value: "正力",
		},
		{
			type: "text",
			key: "一级/二级材料物料号",
			value: "14010300035",
		},
		{
			type: "text",
			key: "一级/二级材料批次号/序列号",
			value: "14010300035",
		},
		{
			type: "text",
			key: "电池运输碳排放值-放入ESG",
			value: "305CO2e/km",
		},
		{
			type: "text",
			key: "单个电池材料消耗量",
			value: "299GJ",
		},
	],
	// esg
	esg: [
		{
			type: 'list',
			title: '图例说明',
			arr: [
				{
					icon: legendBzIcon,
					type: 'tag',
					key: '保障',
					value: '#02BA95'
				},
				{
					icon: legendJbbzIcon,
					type: 'tag',
					key: '基本保障',
					value: '#F2DF34'
				},
				{
					icon: legendBbzIcon,
					type: 'tag',
					key: '不保障',
					value: '#F96822'
				}
			]
		},
		{
			type: 'card',
			tag: successTip,
			title: '人权',
			arr: [
				{
					type: 'option',
					key: '工会',
					value: [
						'有工会保障机构'
					]
				},
				{
					type: 'option',
					key: '健康',
					value: [
						'职业健康证',
						'入职体验',
						'职业危害体验'
					]
				},
				{
					type: 'option',
					key: '福利',
					value: [
						'行业标准福利'
					]
				}
			]
		},
		{
			type: 'picture',
			tag: successTip,
			title: '童工',
			arr: [
				{
					type: 'img',
					key: '童工',
					value: 0
				}
			]
		},
		{
			type: 'card',
			title: '环保',
			tag: successTip,
			arr: [
				{
					type: 'text',
					key: '环保资质',
					value: 'ISO14001环境管理体系认证',
				},
				{
					type: '',
					key: '证书',
					value: '',
				}
			]
		},
		{
			type: 'card',
			title: '用工',
			tag: successTip,
			arr: [
				{
					type: 'option',
					key: '用工时间',
					value: ['8小时']
				},
				{
					type: 'option',
					key: '薪酬',
					value: ['行业标准']
				},
				{
					type: 'option',
					key: '商业道德',
					value: ['行业标准']
				},
				{
					type: 'option',
					key: '残疾人',
					value: ['有残疾人用工']
				}
			]
		},
		{
			type: 'card',
			title: '碳排放',
			tag: successTip,
			arr: [
				{
					type: 'text',
					key: '碳排放量',
					value: '“零排放” - 使用绿电生产',
				}
			]
		}
	],
	// 数据
	data: {
		list: [
			{
				title: "采矿",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "精炼",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "前驱体",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "阴极活性材料",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "阴极",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "阳极",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "电芯",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "模块",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
			{
				title: "电池",
				sources: [
					{
						key: "身份ID",
						value: "已知",
					},
					{
						key: "物料/物料流",
						value: "未追踪",
					},
					{
						key: "ESG",
						value: "估计",
					},
				],
			},
		],
		list_no_wrap: [
			{
				type: "text",
				key: "数据验证",
				value: "未披露",
			},
			{
				type: "text",
				key: "数据追溯/可追溯性",
				value: "保障",
			},
			{
				type: "text",
				key: "数据追溯/柯追溯性",
				value: "保障",
			},
			{
				type: "text",
				key: "物料流聚合",
				value: "未追踪",
			},
		],
		list_wrap: [
			{
				type: "text",
				key: "物料流数据收集开始时间",
				value: "2023年4月20日",
			},
			{
				type: "text",
				key: "物料流数据收集结束时间",
				value: "2023年4月20日",
			},
			{
				type: "text",
				key: "供应商/数据收集供应商",
				value: "未披露",
			},
			{
				type: "text",
				key: "可交互性",
				value: "未披露",
			},
		],
	}
};

export default defineComponent({
	setup() {
		const { locale } = useI18n();
		const route = useRoute();
		const state = reactive({
			selectValue: "cn",
			tabArr,
			tabIndex: 0,
			listArr: listArr as any,
			remarkList: [] as any,
			batteryList: [] as any,
			zlDcImg,
			processDotImg,
			processLineImg,
			processDivideImg,
			checkCircleFill,
			rzImg,
			childrenGray,
			childrenActive
		});
		const activeTab = (current: number) => {
			state.tabArr = state.tabArr.map((item: any, index: number) => {
				if (index == current) {
					item.active = 1;
				} else {
					item.active = 0;
				}
				return item;
			});
			state.tabIndex = current;
		};
		const convertLanguages = (value: string) => {
			locale.value = value;
		};

		/**
		 * 获取扫码信息数据
		 * @param
		 * @return
		 */
		const getScanWxInfo = async (codeId: string) => {
			let res: any = await request({
				url: import.meta.env.VITE_NODE_URL + "/wx/codeInformation",
				type: "json",
				method: "get",
				params: {
					codeId,
					lang: 'cn'
				}
			})
			if (res.code == 200) {
				let { data: { code: { businessObjectAttrBOList, boName } } } = res
				document.title = boName;
				if (businessObjectAttrBOList) {
					let remarkTags = [{ sort: 1, name: '电池序列号', color: '#F96822' }, { sort: 2, name: '电池型号', color: '#4DC3FF' }, { sort: 3, name: '电池护照ID', color: '#02BA95' }]
					let batteryTypes = [{ name: '电池生产商', type: 'tag' }, { name: '电芯生产商', type: 'tag' }, { name: '电池生产国', type: 'img' }, { name: '电芯生产国', type: 'img' }]
					let batteryArr = businessObjectAttrBOList.filter((item: any) => item.attrType == 10);
					batteryArr.forEach((element: any) => {
						// 标记点数据处理
						if (remarkTags.map((item: any) => item.name).includes(element.attrNameCn)) {
							let obj = Object.assign({}, element, {
								...remarkTags.filter((item: any) => item.name == element.attrNameCn)[0]
							})
							state.remarkList.push(obj)
						} else {
							// 电池项类型处理
							let obj = Object.assign({}, element, {
								...batteryTypes.filter((item: any) => item.name == element.attrNameCn)[0]
							})
							state.batteryList.push(obj)
						}
					})
					state.remarkList = state.remarkList.sort((a: any, b: any) => a.sort - b.sort);
				}
			}
		}

		onMounted(() => {
			const codeId: any = route.query.idisCode
			getScanWxInfo(codeId)
		})

		return {
			...toRefs(state),
			activeTab,
			convertLanguages,
		};
	},
});
