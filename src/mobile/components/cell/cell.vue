<template>
    <div :class="{ 'mobileCell-row': true, 'mobileCell-row-success': status === 'success'  }" v-if="type === 'row'">
        <div class="mobileCell-label">{{ label }}</div>
        <div class="mobileCell-content text_ellipsis2">
            <span>{{ content }}</span>
            <a-button v-if="linkText" type="link" :href="link">{{ linkText }}</a-button>
        </div>
    </div>

    <div class="mobileCell-column" v-if="type === 'column'">
        <div class="mobileCell-label">{{ label }}</div>
        <div class="mobileCell-content">{{ content }}</div>
    </div>

    <div class="mobileCell-json" v-if="type === 'json'">
        <div class="mobileCell-label">{{ label }}</div>
        <div class="mobileCell-json-content">
            <div class="mobileCell-json-title">
                <p>Value</p>
                <div>复制</div>
            </div>
            <div class="mobileCell-json-viewer">
                <json-viewer :value="jsonData" :expand-depth="0" boxed :show-array-index="false">
                </json-viewer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RowType, RowStatus } from "./data";
import JsonViewer from "vue-json-viewer";

export default defineComponent({
    name: "mobileCell",
    components: {
        JsonViewer,
    },
    props: {
        type: {
            type: String as PropType<RowType>,
            required: true,
            default: "row",
        },
        label: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        link: {
            type: String,
            default: "",
        },
        linkText: {
            type: String,
            default: "",
        },
        jsonData: {
            type: Object,
            default: () => {
                return {};
            },
        },

        status: {
            type: String as PropType<RowStatus>,
            default: "default",
        },
    },
    setup() {},
});
</script>

<style lang="less" scoped>
.mobileCell-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 0.72rem;
}

.mobileCell-column {
    margin-bottom: 0.2rem;
    .mobileCell-label {
        line-height: 0.8rem;
    }
    .mobileCell-content {
        text-align: left;
        word-break: break-all;
        line-height: 0.44rem;
    }
}

.mobileCell-column:last-child {
    margin-bottom: 0;
}
.mobileCell-label {
    margin-right: 0.3rem;
    font-size: 0.3rem;
    color: #212326;
}
.mobileCell-content {
    flex: 1;
    font-size: 0.3rem;
    line-height: 0.36rem;
    text-align: right;
    color: #959eb6;
    a.ant-btn {
        padding-right: 0;
        padding-left: 0.2rem;
    }
}

.mobileCell-row-success {
    .mobileCell-content {
        color: @success-color;
    }
}

.mobileCell-json {
    .mobileCell-label {
        line-height: 0.72rem;
    }
    .mobileCell-json-content {
    }
    .mobileCell-json-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 0.8rem;
        padding: 0 0.26rem 0 0.2rem;
        border-radius: 0.24rem 0.24rem 0 0;
        background-color: #263238;
        p {
            font-size: 0.3rem;
            font-weight: 500;
            color: #fff;
        }
        div {
            font-size: 0.28rem;
            font-weight: 400;
            color: #fff;
        }
    }
	.mobileCell-json-viewer {
		/deep/ .jv-container .jv-code {
			padding: .2rem;
		}
	}
}
</style>