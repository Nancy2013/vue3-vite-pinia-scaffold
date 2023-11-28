<template>
    <div class="mobile">
        <div class="mobile-zl">
            <!-- banner图 -->
            <div class="zl-banner">
                <!-- 标题 -->
                <div class="zl-banner-title">
                    <div class="banner-title-left"><span>{{ $t("home.title") }}</span></div>
                    <div class="banner-title-right">
                        <a-select v-model:value="selectValue" @change="convertLanguages">
                            <a-select-option value="cn">简体中文</a-select-option>
                            <a-select-option value="en">English</a-select-option>
                        </a-select>
                    </div>
                </div>
                <!-- 标记 -->
                <div class="zl-banner-remark">
                    <div class="banner-remark-item" v-for="(item, index) in remarkList" :key="index">
                        <p><label class="remark-key">{{ selectValue == 'cn' ? item.attrNameCn : item.attrNameEn }}</label></p>
                        <p><span class="remark-tag" :style="`background:${item.color}`"></span>&nbsp;<span class="remark-value">{{ item.attrValue }}</span></p>
                    </div>
                </div>
                <!-- 图片 -->
                <div class="zl-banner-img">
                    <img :src="zlDcImg" />
                </div>
            </div>
            <!-- 详情 -->
            <div class="zl-info">
                <!-- tab -->
                <div class="zl-info-tabs">
                    <div :class="['info-tabs-item', item.active ? 'active' : null, item.active ? `active-color-${index}` : null]" v-for="(item, index) in tabArr" :key="index" @click="activeTab(index)">
                        <div class="tabs-icon"><img :src="item.active ? item.activeIcon : item.icon" /></div>
                        <div class="tabs-name"><span>{{ $t(`home.${item.name}`) }}</span></div>
                    </div>
                </div>
                <!-- list -->
                <div class="zl-info-list">
                    <!-- 电池 -->
                    <template v-if="tabIndex == 0">
                        <div class="info-list-item" v-for="(item, index) in batteryList" :key="index">
                            <p class="list-key"><label>{{ selectValue == 'cn' ? item.attrNameCn : item.attrNameEn }}</label></p>
                            <p class="list-value">
                                <template v-if="item.type == 'tag'">
                                    <span class="list-value-tag"></span>
                                </template>
                                <template v-if="item.type == 'img'">
                                    <img src="@/assets/mobileImages/main/home/zl_wxhj_img.png" />
                                </template>
                                <span>{{ item.attrValue }}</span>
                            </p>
                        </div>
                    </template>
                    <!-- 材料 -->
                    <template v-if="tabIndex == 1">
                        <div class="info-list-item list-block-item" v-for="(item, index) in listArr.material" :key="index">
                            <p class="list-key"><label>{{ item.key }}</label></p>
                            <p class="list-value">
                                <template v-if="item.type == 'tag'">
                                    <span class="list-value-tag"></span>
                                </template>
                                <template v-if="item.type == 'img'">
                                    <img src="@/assets/mobileImages/main/home/zl_wxhj_img.png" />
                                </template>
                                <span>{{ item.value }}</span>
                            </p>
                        </div>
                    </template>
                    <!-- ESG -->
                    <template v-if="tabIndex == 2">
                        <div v-for="(item, index) in listArr.esg" :key="index" style="width: 100%">
                            <div class="info-list-item list-block-item">
                                <div class="list-title">{{ item.title }}</div>
                                <template v-if="item.type == 'list'">
                                    <div class="list-tag">
                                        <div class="list-tag-item" v-for="(tagItem, tagIndex) in item.arr" :key="tagIndex">
                                            <div class="tag-item-color">
                                                <img :src="tagItem.icon" />
                                            </div>
                                            <div class="tag-item-value">{{ tagItem.key }}</div>
                                        </div>
                                    </div>
                                </template>
                                <template v-if="item.type == 'card'">
                                    <div class="list-card">
                                        <div class="list-card-item" v-for="(cardItem, cardIndex) in item.arr" :key="cardIndex">
                                            <div class="card-item-title">{{ cardItem.key }}</div>
                                            <template v-if="cardItem.type == 'option'">
                                                <div class="card-item-options" v-for="(optionsItem, optionsIndex) in cardItem.value" :key="optionsIndex">
                                                    <img :src="checkCircleFill" />
                                                    <span>{{ optionsItem }}</span>
                                                </div>
                                            </template>
                                            <template v-if="cardItem.type == 'text'">
                                                <span>{{ cardItem.value }}</span>
                                            </template>
                                            <template v-if="cardItem.type == ''">
                                                <img :src="rzImg" />
                                            </template>
                                        </div>
                                    </div>
                                    <div class="list-successTip">
                                        <img :src="item.tag" />
                                    </div>
                                </template>
                                <template v-if="item.type == 'picture'">
                                    <div class="list-picture">
                                        <div class="list-picture-item" v-for="(pictureItem, pictureIndex) in item.arr" :key="pictureIndex">
                                            <div class="picture-item-labels">
                                                <p>{{ pictureItem.key }}</p>
                                                <p>无童工/{{ pictureItem.value }}人</p>
                                            </div>
                                            <template v-if="pictureItem.type == 'img'">
                                                <div class="picture-item-imgs">
                                                    <img v-for="(imgItem, imgIndex) in new Array(5).fill('1')" :key="imgIndex" :src="childrenGray" />
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="list-successTip">
                                        <img :src="item.tag" />
                                    </div>
                                </template>
                                <template v-if="item.type == 'img'"></template>
                            </div>
                            <div class="info-list-divide" v-if="index != listArr.esg.length - 1">
                                <img :src="processDivideImg" />
                            </div>
                        </div>
                    </template>
                    <!-- 数据 -->
                    <template v-if="tabIndex == 3">
                        <div class="info-list-item list-block-item" v-for="(item, index) in listArr.data.list" :key="index">
                            <div class="list-process">
                                <div class="list-process-title">
                                    <img :src="processDotImg" />
                                    <span>{{ item.title }}</span>
                                </div>
                                <div class="list-process-line">
                                    <img :src="processLineImg" />
                                </div>
                            </div>
                            <div class="list-tables">
                                <div class="list-tables-source" v-for="(tableItem, tableIndex) in item.sources" :key="tableIndex">
                                    <div class="tables-source-key">{{ tableItem.key }}</div>
                                    <div class="tables-source-value">{{ tableItem.value }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="info-list-divide">
                            <img :src="processDivideImg" />
                        </div>
                        <div class="info-list-item" v-for="(item, index) in listArr.data.list_no_wrap" :key="index">
                            <p class="list-key"><label>{{ $t(`${item.key}`) }}</label></p>
                            <p class="list-value">
                                <template v-if="item.type == 'tag'">
                                    <span class="list-value-tag"></span>
                                </template>
                                <template v-if="item.type == 'img'">
                                    <img src="@/assets/mobileImages/main/home/zl_wxhj_img.png" />
                                </template>
                                <span>{{ item.value }}</span>
                            </p>
                        </div>
                        <div class="info-list-item list-block-item" v-for="(item, index) in listArr.data.list_wrap" :key="index">
                            <p class="list-key"><label>{{ $t(`${item.key}`) }}</label></p>
                            <p class="list-value">
                                <template v-if="item.type == 'tag'">
                                    <span class="list-value-tag"></span>
                                </template>
                                <template v-if="item.type == 'img'">
                                    <img src="@/assets/mobileImages/main/home/zl_wxhj_img.png" />
                                </template>
                                <span>{{ item.value }}</span>
                            </p>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Home from "./home";
export default Home;
</script>
<style lang="less" scoped>
@import url("./home.less");
</style>