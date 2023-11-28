import { ref, reactive, toRef, onMounted, toRefs } from "vue";
import request from "@/utils/axios";
import { deepClone, isEmpty } from '@/utils/common'
import { useRouter } from "vue-router";
import { Modal, message } from "ant-design-vue";

export const usePage = (opts: any) => {
	const { search, queryParams, addPath, deleteParams, transformSearch } = opts;
	const initSearch = deepClone(search.value)
	console.log(initSearch)
	const router = useRouter();


	const state = reactive({
		loading: true,
		dataSource: [],
		pagination: {
			total: 0,
			current: 1,
			pageSize: 10,
		},
	});

	onMounted(() => {
		query();
	});

	/**
	 *查询
	 *
	 */
	const query = () => {
		let { pagination: { pageSize, current } } = state;
		state.loading = true
		const paramsData=Object.assign({ pageNum: current, pageSize }, transformSearch && typeof transformSearch === 'function' ? { ...transformSearch(search.value) } : { ...search.value });
		const params={
			...queryParams,
		}
		const {method}=queryParams;
		params[`${method==='get'?'params':'data'}`]=paramsData;		
		request(params).then((res: any) => {
			const { code, rows, total = 0,data } = res;
			const dataSource=rows||data; // 兼容不同数据结构
			state.dataSource = dataSource&&dataSource.map((item: any, key: number) => {
				item.tableIndex = (current - 1) * pageSize + key + 1
				return item
			});
			state.pagination = {
				total,
				current,
				pageSize,
			};
			state.loading = false;
		}).catch((e: any) => {
			console.error(e);
			state.loading = false;
		});
	};

	/**
	 *初始化分页组件
	 *
	 */
	const initPagination = () => {
		state.pagination.current = 1;
	};

	/**
	 *搜索
	 *
	 */
	const handleSearch = () => {
		initPagination();
		query();
	};

	/**
	 *分页
	 *
	 * @param {*} pagination 分页组件
	 */
	const paginationChange = (pagination: any) => {
		let { total, current, pageSize } = pagination;
		state.pagination = { total, current, pageSize };
		query();
	};

	/**
	 *刷新
	 *
	 */
	const handleFresh = () => {
		handleSearch();
	};

	/**
	   * 点击重置按钮触发
	   * @param { Object } record
	   * @return
	   */
	const handleReset = () => {
		search.value = deepClone(initSearch)
	}

	/**
	 *添加
	 *
	 */
	const add = () => {
		router.push({ path: addPath });
	};

	/**
	 *详情
	 *
	 */
	const edit = (item: any) => {
		router.push({ path: addPath, query: { id: item.id } });
	};

	/**
	 *跳转
	 *
	 */
	const jump = (params?: any) => {
		router.push(params)
	}

	/**
	 *删除
	 *
	 * @param {*} item
	 */
	const handleDel = (item: any,msg="确认要删除该条数据？") => {
		Modal.confirm({
			title: "提示",
			content: msg,
			centered: true,
			onOk() {
				return new Promise((resolve, reject) => {
					const params={
						...deleteParams,
					}
					const paramsData={
						id: item.id
					}
					const {method}=deleteParams;
					params[`${method==='get'?'params':'data'}`]=paramsData;
					request(params).then((res: any) => {
						resolve(true);
						message.success("删除成功");
						query()
					}).catch(() => {
						reject();
					});
				})
			},
		});
	};

	return {
		...toRefs(state),
		query,
		handleSearch,
		add,
		edit,
		jump,
		paginationChange,
		handleFresh,
		handleReset,
		handleDel,
	};
};
