/*
 * @Description: 列表请求的公共方法
 * @Author: zhang zhen
 * @FilePath: /zhiyun-outsource-web/src/hooks/listLoader.ts
 */
import { ref, reactive, onMounted } from "vue";
import request from "@/utils/axios";
import { Response, DataRowItem, PageNationFace } from "@/types/mainInterface";
import { Modal, message } from "ant-design-vue";
interface RequestOptions {
  prefix?: any,
  url: {
    list: string; // 列表接口
    delete?: string; // 删除
  };
  needLoadPage?: boolean; // 是否需要立刻加载页面
  // 其他可选参数
  otherRequest?: any
}

export default ({ prefix, url, needLoadPage = false, otherRequest = {} }: RequestOptions) => {
  // 列表数据加载
  let loading = ref<boolean>(false)
  let sortData = ref<DataRowItem>({
    column: 'createdTime',
    order: 'desc'
  });
  // 查询条件的内容
  let searchData = ref<DataRowItem>({
    name: "",
  });
  // 显示更多
  const showMore = ref<boolean>(false);
  // 列表的数据
  let dataSource = ref<DataRowItem[]>([]);

  // 分页条件
  const Pagination = reactive<PageNationFace>({
    current: 1,
    pageSize: 15,
    total: 0,
  });

  /**
   * @description: 列表搜索方法
   * @param {number} flag - 需不需要重置分页的标志位置
   * @return {*}
   */
  const handleSearch = (flag?: number) => {
    if (flag) {
      // 存在标志位置flag 分页回到第一页
      Pagination["current"] = 1;
      Pagination["pageSize"] = 15;
      Pagination["total"] = 0;
    }
    // 请求list接口
    const { current, pageSize } = Pagination;
    request({
      url: `${prefix}${url.list}`,
      method: "post",
      data: {
        ...searchData.value,
        ...sortData.value,
        pageNum: current,
        pageSize,
        ...otherRequest
      },
    }).then((res: Response | resposeType) => {
      const { code, rows, total , msg } = res;
      if (code === 200) {
        dataSource.value = rows;
        Pagination.total = total;
      } else {
        message.warning(msg as any);
      }
    });
  };

  /**
   * @description: 列表分页的方法
   * @param {PageNationFace} pagination - 分页对象
   * @return {*}
   */
  const handlePageChange = (pagination: PageNationFace) => {
    Pagination.current = pagination.current;
    Pagination.pageSize = pagination.pageSize;
    handleSearch(); // 请求分页
  };
  /**
   * @description: 重置方法
   * @return {*}
   */
  const handleReload = () => {
    searchData.value = { name: "" };
    handleSearch(1); // 请求分页
  };

  /**
   * 点击删除按钮时触发
   * @param { Object } record 删除的列表项
   * @return
   */
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "提示",
      content: "确认要删除该条数据",
      centered: true,
      onOk() {
        return new Promise((resolve, reject) => {
          request({
            url: `${prefix}${url.delete}`,
            method: "get",
            params: {
              id: record.id
            }
          }).then((res: Response | resposeType) => {
            const { code, msg } = res;
            resolve(true)
            if (code === 200) {
              handleSearch(1);
              message.success('删除成功');
            } else {
              message.warning(msg as any);
            }
          })
        });
      },
    });
  };
  // 请求列表获取接口
  onMounted(() => {
    needLoadPage && handleSearch(1)
  });

  return {
    searchData,
    sortData,
    dataSource,
    loading,
    showMore,
    Pagination,
    handleSearch,
    handlePageChange,
    handleReload,
    handleDelete,
  };
};
