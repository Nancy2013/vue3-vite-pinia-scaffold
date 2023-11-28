<template>
	<FcPage title="数据核验">
		<div>
			<div class="validData-success">
				<div class="validData-success-title">
					<p>核验成功</p>
					<span>链上数据多方协同，全网验证 高效识别成功</span>
				</div>
				<div class="validData-success-list">
					<div class="validData-success-item">
						<div class="validData-success-item-title">交易详情</div>
					</div>
				</div>
			</div>
		</div>
	</FcPage>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FcPage from '@/mobile/components/page/page.vue'
export default defineComponent({
	components: {
		FcPage
	},
	setup() {
		return {

		}
	}
})
</script>

<style lang="less" scoped>
.validData-success {
	padding-top: .6rem;
	&-title {
		width: 7.5rem;
		height: 3.2rem;
		padding: .28rem 0 0 .8rem;
		background: url(@/assets/mobileImages/main/validData/validData-success-title.png) no-repeat;
		background-size: 100% 100%;
		p {
			font-size: .44rem;
			line-height: 1.04rem;
			color: #fff;
		}
		span {
			display: block;
			max-width: 3.8rem;
			margin-top: -.14rem;
			font-size: .28rem;
			line-height: .4rem;
			color: #fff;
		}
	}
	&-list {
		padding: .5rem .32rem 0;
	}
	.validData-success-item {
		margin-bottom: .88rem;
		&-title {
			font-size: .36rem;
			line-height: .46rem;
			color: #000000;
		}
	}
}
</style>