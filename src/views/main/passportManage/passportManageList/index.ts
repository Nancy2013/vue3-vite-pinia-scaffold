import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  ref,
  computed,
  nextTick,
} from "vue";
import { usePage } from "@/hooks/usePage";
import service from "@/service";
import { pickerFormat } from "@/utils/common";
import { convertCode } from "@/utils/function";
const columns = [
  {
    key: "tableIndex",
    dataIndex: "tableIndex",
    title: "序号",
    width: 100,
    tabs: [],
  },
  {
    key: "productNo",
    dataIndex: "productNo",
    title: "产品型号",
    width: 200,
  },
  {
    key: "productBatchNo",
    dataIndex: "productBatchNo",
    title: "批次号",
    width: 200,
  },
  {
    key: "serialNo",
    dataIndex: "serialNo",
    title: "电池序列号",
    width: 200,
  },
  {
    key: "templateName",
    dataIndex: "templateName",
    title: "护照模板名称",
    width: 200,
  },
  {
    key: "num",
    dataIndex: "num",
    title: "护照参数/数据参数",
    width: 200,
  },
  {
    key: "updateTime",
    dataIndex: "updateTime",
    title: "认证时间",
    width: 200,
  },
  {
    key: "operate",
    dataIndex: "operate",
    title: "操作",
    width: 200,
    fixed: "right",
  },
];

export default defineComponent({
  props: {},
  components: {},
  setup() {
    const formRef = ref();
    const state = reactive({
      columns,
      search: {
        templateName: "",
        serialNo: "",
        productNo: "",
        productBatchNo: "",
        timePicker:[],
        // status:3,
      } as any,
      searchRenderList: [
        {
          label: "产品型号",
          key: "productNo",
          type: "input",
          placeholder: "产品型号",
          values:[0,1,2,3],
        },
        {
          label: "批次号",
          key: "productBatchNo",
          type: "input",
          placeholder: "批次号",
          values:[0,1,2,3],
        },
        {
          label: "电池序列号",
          key: "serialNo",
          type: "input",
          placeholder: "电池序列号",
          values:[0,1,2,3],
        },
        // {
        //   label: "护照模版名称",
        //   key: "templateName",
        //   type: "input",
        //   placeholder: "护照模版名称",
        //   values:[0,1],
        // },
        // {
        //   label: "认证时间",
        //   key: "timePicker",
        //   type: 'datePicker',
        //   datePickerType: 'rangePicker',
        //   picker: 'month',
        //   valueFormat: pickerFormat.monthFormat,
        //   values:[2,3],
        // },
      ],
      visible: false,
      formData: {} as any,
      title:'电池护照二维码',
    });
    const search = toRef(state, "search");
    const { queryPassportList } = service.passportManage;

    /**
     * 转换搜索条件
     * @param search 搜索条件
     * @returns 转换结果
     */
    const transformSearch = (search: any) => {
      const newSearch = { ...search };
      delete newSearch.timePicker;
      const { timePicker } = search;
      if (Array.isArray(timePicker)) {
        const [beginTime, endTime] = timePicker || [];
        if (beginTime) {
          newSearch.beginTime = beginTime;
          newSearch.endTime = endTime;
        }
      } else {
        newSearch.beginTime = timePicker;
        newSearch.endTime = timePicker;
      }
      return newSearch;
    };
    const opts = {
      queryParams: queryPassportList,
      search,
      transformSearch,
    };
    const {
      query,
      dataSource,
      loading,
      pagination,
      handleSearch,
      paginationChange,
      handleReset,
    } = usePage(opts);
    onMounted(() => {});

    /**
     * 获取搜索条件
     */
    const getSearch=computed(()=>{
      const {search,searchRenderList}=state;
      // const searchRender=searchRenderList.filter((item:any)=>item.values.includes(search.status));
      return searchRenderList;
    });

    /**
     * 获取表格列
     */
    const getColumns = computed(() => {
      const { columns } = state;
      return columns;
    });

    /**
     * 预览
     */
    const handlePreview = (item: any) => {
      state.formData = {
        ...item,
      };
      showModal();
    };

    /**
     * 显示弹窗
     * @param item
     */
    const showModal = () => {
      state.visible = true;
      nextTick(() => {
        const { serialNo } = state.formData;
        convertCode("qrcode", serialNo);
      });
    };

    /**
     *隐藏弹窗
     *
     */
    const hideModal = () => {
      state.visible = false;
    };

    /**
     * 关闭弹窗
     */
    const handleClose = () => {
      formRef.value && formRef.value.resetFields();
      state.formData = {} as any;
    };

  /**
   * 切换tab
   * @param activeKey 当前tab
   */
    const handleChangeTab=(activeKey:number|string)=>{
      console.log('----handleChangeTab----',state.search);
      resetSearch();
      query();
    }

    /**
     * 切换tab重置搜索条件
     */
    const resetSearch=()=>{
      const {status}=state.search;

      if(status===0||status===1){
        // 待生成 | 认证中
        state.search.timePicker=[];
      }

      if(status===2||status===3){
        // 认证不通过 | 认证通过
        state.search.templateName='';
      }

    }

    return {
      ...toRefs(state),
      getColumns,
      getSearch,
      dataSource,
      loading,
      pagination,
      paginationChange,
      handleSearch,
      handlePreview,
      handleReset,
      handleClose,
      hideModal,
      handleChangeTab,
    };
  },
});
