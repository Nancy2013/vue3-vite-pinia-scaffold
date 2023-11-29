import request from "@/utils/axios";
import { BASE_URL,formatData } from './utils'


export default {
    // 查询护照管理列表
    queryPassportList:{
        url: BASE_URL+'/dpp/master-data/page',
		method: "post",
    },
};