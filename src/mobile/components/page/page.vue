<template>
    <div :class="`fc-page`">
        <div :class="`fc-page-title`" v-if="!isWechat">
            <div ref="fc-page-title-content" class="fc-page-title-content">{{ title }}</div>
        </div>
        <div :class="`fc-page-content ${isWechat ? 'fc-page-content-wechat' : ''}`">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { is_weixin } from "@/utils/common"

export default defineComponent({
	props: {
		title: {
			type: String,
			defult: ""
		}
	},
	setup(props, { emit }) {
		
		const isWechat = ref<boolean>(is_weixin())
		return {
			isWechat
		}
	}
})



</script>

<style lang="less" scoped>
.fc-page {
	height: 100%;
}
.fc-page-title {
	z-index: 9;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	height: 0.88rem;
	background-color: #fff;
	border-bottom: 1px solid #E7E7E7;
}
.fc-page-title-content {
	font-size: 0.34rem;
	line-height: 0.88rem;
	text-align: center;
	color: #191919;

}
.fc-page-content-wechat {
	top: 0;
}

.fc-page-content {
	padding-top: 0.88rem;
}
</style>