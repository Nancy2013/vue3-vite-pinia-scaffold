import { ref, onMounted, reactive, toRefs, computed } from "vue";
// 使用说明
// 1、定义rules
// 2、引入hook
// 3、监听组件
// 4、
interface useFormOptions {
  formRef: any;
  rules?:any;
}

export const useForm = (opts: useFormOptions) => {
  const {formRef}=opts;
  const state = reactive({
    rules: {} as any,
  });

  onMounted(() => {});

  /**
   * 更新表单校验
   * @param key 字段
   * @param event 方法
   */
  const formValidate = (keys?: Array<string>) => {
    const {rules}=state;
    Object.keys(rules).forEach((item: string) => {
      delete rules[item];
      formRef.value && formRef.value.clearValidate([item]);
    });
    keys&&keys.forEach((key:string)=>{
      rules[key] = opts.rules[key];
    })
  };

  /**
   * 清除校验
   */
  const clearValidate=()=>{
    const formkeys=Object.keys(opts.rules);
    formRef&&formRef.value.clearValidate(formkeys);
  }

  /**
   * 获得焦点
   */
  const handleFocus = () => {
    clearValidate();
  };

  return {
    ...toRefs(state),
    formValidate,
    handleFocus,
  };
};
