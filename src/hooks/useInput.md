# useInput

密码输入框，禁止自动填充
备注：可以自主选择是否使用isHide属性，本实例子定义了小眼睛图标

## 使用说明

```html
<!-- 1、设置属性readOnly：false -->
<!-- 2、监听input组件获得焦点、失去焦点事件 -->
<a-input
  v-model:value.trim="formData.idisPwd"
  :disabled="disabled"
  autocomplete="off"
  :type="inputType"
  :readOnly="readOnly"
  @blur="handleInputblur"
  @focus="handleInputFocus"
/>
```

```js
// 2、引入hook
import {useInput} from '@/hooks/useInput'
const {initInput,readOnly,handleInputFocus,handleInputblur,}=useInput();
```
