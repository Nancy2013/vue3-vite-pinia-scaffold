# hooks 使用

## useForm

使用 userForm 校验部分字段

### 使用步骤

```js
// 1、定义rules
import type { Rule } from "ant-design-vue/es/form";
/**
 *表单校验
 *
 * @param {Rule} _rule 规则
 * @param {string} value 返回值
 * @return {*}
 */
const validate = async (_rule: Rule, value: string) => {
  if (!value) {
    const { message } = _rule;
    return Promise.reject(message);
  }
  return Promise.resolve();
};
const state = reactive({
  rules: {
    prefixCode: [{ message: "请输入国家标识前缀", validator: validate }],
    reason: [{ message: "请输入驳回原因", validator: validate }],
  },
});
```

```js
// 2、引入hook
const formRef = ref();
const opts = {
  formRef,
  rules: state.rules,
};
const { rules, formValidate, handleFocus } = useForm(opts);
```

```html
<!-- 3、监听组件 -->
 <a-input v-model:value="formData.prefixCode" @focus="handleFocus"/>
```

```js
// 4、提交表单校验
formValidate(["prefixCode"]);
formRef.value.validate().then((formData: any)=>{
    // 校验成功后的操作
})
```
