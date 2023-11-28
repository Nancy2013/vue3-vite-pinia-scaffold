import request from "@/utils/axios";
import { formatData } from './utils'


export default {
    // 查询护照管理列表
    queryContainerCategoryList:(params:any) => request(formatData('/passport/manageList','post',params)),

    // 查询容器
    queryContainer:{
        url: import.meta.env.VITE_NODE_URL + "/container/pageContainer",
		method: "post",
    },
};