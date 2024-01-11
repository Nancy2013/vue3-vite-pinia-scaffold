<template>
  <div class="list">
    <a-button type="primary"
              @click="handleUpdate">更新</a-button>
    <a-button @click="handleReset">重置</a-button>
    <div>
      用户信息
      缓存： {{token}}
      姓名： {{userInfo.name}}
      密码： {{userInfo.password}}
      年龄： {{userInfo.age}}
    </div>

    <div>
      护照信息
      getMessage: {{getMessage}}
      mergeMessage: {{mergeMessage(userInfo.name)}}
    </div>
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
