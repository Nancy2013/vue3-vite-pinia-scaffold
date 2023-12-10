<template>
  <div class="list">
    <fc-table
      :columns="getColumns"
      :dataSource="dataSource"
      :paginationConfig="pagination"
      @pageChange="paginationChange"
      :loading="loading"
      :searchRenderList="getSearch"
      :searchData="searchData"
      @search="handleSearch"
    >
      <template #headerBtnArea>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button @click="handleReset">重置</a-button>
      </template>
      <template #headerLeft>
        <!-- <a-tabs v-model:activeKey="search.status"  @change="handleChangeTab">
          <a-tab-pane :key="0" tab="待认证"></a-tab-pane>
          <a-tab-pane :key="1" tab="认证中"></a-tab-pane>
          <a-tab-pane :key="2" tab="认证不通过"></a-tab-pane>
          <a-tab-pane :key="3" tab="认证通过"></a-tab-pane>
        </a-tabs> -->
      </template>
      <template #operate="{ record }">
        <a-button type="link" size="small" @click="handlePreview(record)"
          >预览</a-button
        >
      </template>
    </fc-table>
    <a-modal
      v-model:visible="visible"
      :title="title"
      :maskClosable="false"
      :afterClose="handleClose"
      :footer="null"
      wrapClassName="pony-modal-wrapper"
      centered
    >
      <div class="modal">
        <div class="modal-content">
          <div class="modal-code">
            <div
              class="code"
              id="qrcode"
              v-if="formData.serialNo"
              :key="formData.serialNo"
            ></div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import Index from "./index";
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
