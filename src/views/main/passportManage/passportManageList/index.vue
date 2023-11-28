<template>
    <div class="list">
        <fc-table  :columns="getColumns" :dataSource="dataSource" :paginationConfig="pagination" @pageChange="paginationChange"
            :loading="loading" :searchRenderList="searchRenderList" :searchData="search" @search="handleSearch">
            <template #headerBtnArea>
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button @click="handleReset">重置</a-button>
            </template>
            <template #headerLeft></template>
            <template #operate="{ record }">
                <a-button type="link" size="small" @click="handlePreview(record)">预览</a-button>
            </template>
        </fc-table>
        <a-modal v-model:visible="visible" title="预览" :maskClosable="false" :afterClose="handleClose" :footer="null"
            wrapClassName="pony-modal-wrapper" centered>
            <div class="modal">
                <div class='modal-content'>
                    <div class="modal-code">
                        <div class="code" id="qrcode" v-if="formData.serialNo" :key="formData.serialNo"></div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts">
import Index from './index'
export default Index;
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>