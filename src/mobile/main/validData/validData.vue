<template>
    <FcPage title="数据核验">
        <div>
            <div class="validData-success" style="display: none">
                <div class="validData-success-title">
                    <p>核验成功</p>
                    <span>链上数据多方协同，全网验证 高效识别成功</span>
                </div>
                <div class="validData-success-list">
                    <div class="validData-success-item">
                        <div class="validData-success-item-title">区块详情</div>
                        <div class="validData-success-item-card">
                            <p>区块基本信息</p>
                            <FcCell label="区块高度" content="397"></FcCell>
                            <FcCell label="区块时间" content="2023-10-12 10:00:00"></FcCell>
                            <FcCell label="区块大小(bytes)" content="9865"></FcCell>
                            <FcCell label="交易量" content="4"></FcCell>
                        </div>
                    </div>

                    <div class="validData-success-item">
                        <div class="validData-success-item-title">交易详情</div>
                        <div class="validData-success-item-card">
                            <p>交易信息</p>
                            <FcCell type="column" label="交易hash" content="12345u6yt556giecdsn983h73n7294n595n28c95nw8384n0987654tyu9876irn
"></FcCell>
                            <FcCell type="column" label="交易id" content="12345u6yt556giecdsn983h73n7294n595n28c95nw8384n0987654tyu9876irn
"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>摘要信息</p>
                            <FcCell label="交易数据大小" content="4969"></FcCell>
                            <FcCell label="区块高度" content="397"></FcCell>
                            <FcCell label="交易状态" content="成功" status="success"></FcCell>
                            <FcCell label="交易时间" content="2023-02-24  10:37:40"></FcCell>
                            <FcCell label="交易类型" content="普通交易"></FcCell>
                            <FcCell label="最新修改配置的区块号" content="2"></FcCell>
                            <FcCell label="发起者" content="OrgMSP" linkText="交易详情"></FcCell>
                            <FcCell label="背书者" content="" linkText="交易详情"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>智能合约</p>
                            <FcCell label="名称" content="电芯"></FcCell>
                            <FcCell label="方法名称" content="报告"></FcCell>
                            <FcCell label="版本" content="1.4"></FcCell>
                            <FcCell label="返回参数" content="CMgBGgRudWxs"></FcCell>
                            <FcCell type="json" label="参数列表" :jsonData="data"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>信息</p>
                            <FcCell type="column" label="发起人签名" content="MEQCID1NtkjwpMOhQQ1SNH99bBE9isnizGUjLXS1Aswci1zTAiBFPkcAjLAIYHVKwdL8kA7B0kTqgLiHcJZG+bfSTI4gWw==
"></FcCell>
                        </div>

                        <div class="validData-success-item-card">
                            <p>策略</p>
                            <FcCell label="策略" content="组织1MSP"></FcCell>
                        </div>
                    </div>
                </div>

                <div class="validData-success-bottom">
                    <p>版权所有 © www.chdpp.com，保留所有权利。</p>
                    <p>打造分布式网络平台，引领金融与监管科技</p>
                </div>
            </div>

            <FcNormal title="核验失败" subtitle="抱歉，似乎出了点问题"></FcNormal>
        </div>
    </FcPage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FcCell from "@/mobile/components/cell/cell.vue";
import FcPage from "@/mobile/components/page/page.vue";
import FcNormal from "@/mobile/components/normal/normal.vue";
export default defineComponent({
    components: {
        FcCell,
        FcPage,
        FcNormal
    },
    setup() {
        return {
            data: {
                code: 200,
                msg: "SUCCESS",
                data: {
                    userId: 726,
                    token: "ca63f7fc-20c3-4ec5-9cd6-d72721ec745d",
                    account: "enterpriseAdmin243",
                    phone: "18612340001",
                    name: "wjj",
                    email: null,
                    avatar: null,
                    enterpriseId: 10105,
                    enterpriseName: "zjj的茶企1",
                    tenantId: 9821,
                    tenantName: "zjj的租户",
                    agentId: null,
                    deptId: null,
                    deptName: null,
                    roleList: [
                        {
                            roleId: 242,
                            roleName: "茶企管理员",
                        },
                    ],
                    systemTypes: null,
                    companyRoleId: null,
                    prefix: "88.555.22565",
                    idisUserName: "复信农科(南京)技术有限公司",
                    idisPassword: "Aa12345678@",
                    superAdminFlag: 1,
                },
            },
        };
    },
});
</script>

<style lang="less" scoped>
.validData-success {
    padding-top: 0.6rem;
    &-title {
        width: 7.5rem;
        height: 3.2rem;
        padding: 0.28rem 0 0 0.8rem;
        background: url(@/assets/mobileImages/main/validData/validData-success-title.png)
            no-repeat;
        background-size: 100% 100%;
        p {
            font-size: 0.44rem;
            line-height: 1.04rem;
            color: #fff;
        }
        span {
            display: block;
            max-width: 3.8rem;
            margin-top: -0.14rem;
            font-size: 0.28rem;
            line-height: 0.4rem;
            color: #fff;
        }
    }
    &-list {
        padding: 0.5rem 0.32rem .7rem;
        background: url(@/assets/mobileImages/main/validData/validData-success-list-bg.png) no-repeat;
        background-position: 0% 100%;
        background-size: 100% 5.46rem;
    }
    &-item {
        margin-bottom: 0.88rem;
        &-title {
            font-size: 0.36rem;
            text-align: center;
            line-height: 0.46rem;
            color: #000000;
        }
        &-card {
            margin-top: 0.4rem;
            padding: 0.1rem 0.3rem 0.4rem;
            border-radius: 0.24rem;
            border: 1px solid #efefef;
            background-color: #fff;
            box-shadow: 1px 0.4rem 0.4rem 0px #f2f2f2;
            p {
                margin-bottom: 0.1rem;
                font-size: 0.32rem;
                line-height: 0.88rem;
                font-weight: bold;
                color: #000;
            }
        }
    }
    &-item:last-child {
        margin-bottom: 0;
    }
    &-bottom {
        height: 1.16rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #292930;
        p {
            font-size: .24rem;
            line-height: .34rem;
            color: #fff;
        }
    }

}
</style>