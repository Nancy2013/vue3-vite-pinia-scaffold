<template>
	<div class="mobileNormal">
		<div class="mobileNormal-title">{{ title }}</div>
		<div class="mobileNormal-subtitle">{{ subtitle }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'mobileNormal',
	props: {
		title: {
			type: String,
			default: ""
		},
		subtitle: {
			type: String,
			default: ""
		}
	},
	setup() {
		
	},
})
</script>

<style lang="less" scoped>
.mobileNormal {
	position: relative;
	width: 5.12rem;
	height: 5.12rem;
	margin: 1.08rem auto 0;
	background: url(@/assets/mobileImages/common/normal.png) no-repeat;
	background-size: 100% 100%;
}
.mobileNormal-title {
	position: absolute;
	bottom: .44rem;
	width: 100%;
	font-size: .36rem;
	line-height: .86rem;
	text-align: center;
	color: #212326;
}
.mobileNormal-subtitle {
	position: absolute;
	bottom: .14rem;
	width: 100%;
	font-size: .28rem;
	line-height: .28rem;
	text-align: center;
	color: #797979;
}
</style>
