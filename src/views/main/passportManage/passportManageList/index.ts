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
    key: "containerTypeName",
    dataIndex: "containerTypeName",
    title: "电池序列号",
    width: 200,
  },
  {
    key: "boCategoryName",
    dataIndex: "boCategoryName",
    title: "护照参数数量",
    width: 200,
  },
  {
    key: "specs",
    dataIndex: "specs",
    title: "认证时间",
    width: 200,
  },
  {
    key: "status",
    dataIndex: "status",
    title: "认证状态",
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
        passportName: "",
        serialNo: "",
        productNo: "",
        productBatchNo: "",
      },
      searchRenderList: [
        // {
        //   label: "护照模版名称",
        //   key: "passportName",
        //   type: "input",
        //   placeholder: "护照模版名称",
        // },
        {
          label: "产品型号",
          key: "productNo",
          type: "input",
          placeholder: "产品型号",
        },
        {
          label: "批次号",
          key: "productBatchNo",
          type: "input",
          placeholder: "批次号",
        },
        {
          label: "电池序列号",
          key: "serialNo",
          type: "input",
          placeholder: "电池序列号",
        },
        // {
        //   label: "认证时间",
        //   key: "timePicker",
        //   type: 'datePicker',
        //   datePickerType: 'rangePicker',
        //   picker: 'month',
        //   valueFormat: pickerFormat.monthFormat
        // },
      ],
      visible: false,
      formData: {} as any,
    });
    const search = toRef(state, "search");
    const { queryContainer } = service.passportManage;

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
      queryParams: queryContainer,
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

    return {
      ...toRefs(state),
      getColumns,
      dataSource,
      loading,
      pagination,
      paginationChange,
      handleSearch,
      handlePreview,
      handleReset,
      handleClose,
      hideModal,
    };
  },
});
