<template>
    <a-config-provider :locale="locale">
        <router-view></router-view>
    </a-config-provider>
</template>

<script lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export default {
    data() {
        return {
            locale: zhCN,
        }
    }
}
</script>

<style>
.text_ellipsis {
	overflow: hidden;
	white-space: nowrap;
    word-wrap: normal;
	text-overflow: ellipsis;
}

.text_ellipsis2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	word-break: break-all;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.text_ellipsis3 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	word-break: break-all;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
</style>
