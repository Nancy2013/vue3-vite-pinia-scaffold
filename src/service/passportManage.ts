import request from "@/utils/axios";
import { formatData } from './utils'


export default {
    // 查询护照管理列表
    queryPassportList:(params:any) => request(formatData('/dpp-platform/master-data/page','post',params)),
};