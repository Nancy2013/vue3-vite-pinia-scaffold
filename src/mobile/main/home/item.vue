<template>
    <div class="homeItem" :style="{ width: width }">
        <div class="homeItem-label">{{ label }}</div>
        <div class="homeItem-content">
            <div class="homeItem-content-tag" v-if="tag"></div>
            <img class="homeItem-content-icon" v-if="icon" :src="icon" alt="">
            <span class="homeItem-content-text">{{ content }}</span>
        </div>

        <div class="homeItem-imgs" v-if="Array.isArray(imgs) && imgs.length">
            <img v-for="(img, key) in imgs" :key="key" :src="img" alt="">
        </div>

		<div class="homeItem-childrenList" v-if="childrenNum > -1">

		</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export type HomeItemType = "tag" | "img" | "text";
export default defineComponent({
    name: "homeItem",
    props: {
        label: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        width: {
            type: String,
            default: "",
        },
        tag: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: "",
        },
        imgs: {
            type: Array as PropType<Array<any>>,
            default: () => {
                return [];
            },
		},
		childrenNum: {
			type: Number,
            default: -1,
		}
		
    },
    setup() {},
});
</script>

<style lang="less" scoped>
.homeItem {
    position: relative;
    width: 100%;
    padding: 0 25px 38px 32px;
    &-label {
        margin-bottom: 6px;
        font-size: 14px;
        line-height: 20px;
        color: #222222;
    }
    &-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        word-break: break-all;
        &-tag {
            margin-right: 7px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #00a887;
        }
        &-icon {
            margin-right: 8px;
            width: 30px;
            height: 20px;
        }
        &-text {
            font-size: 18px;
            line-height: 21px;
            color: #222222;
        }
    }
    &-imgs {
        position: absolute;
        right: 20px;
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
        }
    }
}
@media screen and (max-width: 960px) {
    .homeItem {
        padding: 0 0.5rem 0.76rem 0.64rem;
        &-label {
            margin-bottom: 0.12rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #222222;
        }
        &-content {
            &-tag {
                margin-right: 0.14rem;
                width: 0.3rem;
                height: 0.3rem;
            }
            &-icon {
                margin-right: 0.16rem;
                width: 0.6rem;
                height: 0.4rem;
            }
            &-text {
                font-size: 0.36rem;
                line-height: 0.42rem;
            }
        }
        &-imgs {
            right: .4rem;
            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
}
</style>
