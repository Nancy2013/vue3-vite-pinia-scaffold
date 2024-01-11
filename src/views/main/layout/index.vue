<template>
  <a-layout class="manage">
    <Header :routes="routes"
            :noticeNum="noticeNum"
            v-model:activeKey="activeKey"
            @change="handleTabChange" />
    <a-layout>
      <Sider v-show="!isFullPage"
             ref="sliderRef"
             :routeList="routeList"
             :activeKey="activeKey" />
      <a-layout>
        <Breaumb v-show="!isFullPage"
                 :routeList="routeList"
                 :activeKey="activeKey" />
        <Content />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { isEmpty, isSubMenu } from "@/utils/common";
import { Sider, Header, Breaumb, Content } from "./index";
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import request from "@/utils/axios";
import { message } from "ant-design-vue";
import { convertTree } from "@/utils/function";
export default defineComponent({
  components: {
    Sider,
    Header,
    Breaumb,
    Content,
  },
  setup() {
    let state = reactive({
      routes: [] as any,
      activeKey: -1,
      routeList: [] as any,
      isFullPage: false,
      noticeNum: -1,
    });

    let isComplete = false;
    const router = useRouter();
    const route = useRoute();
    const sliderRef = ref();
    if (isEmpty(localStorage.getItem("token"))) {
      message.error("请先登录");
      // router.push({ path: "/login" });
    }

    /**
     * @description: 获取路由配置的参数 - 判断是否需要背景色
     * @return {*}
     */
    const handleGetPageSetting = () => {
      console.log(route);
      state.isFullPage = route.meta ? !!route.meta.isFullPage : false;
    };

    handleGetPageSetting();

    /**
     * 获取通知数量
     * @param
     * @return
     */
    const getNoticeNum = () => {
      request({
        url: import.meta.env.VITE_BASE_URL + "/announcementSend/getMyMsgNum",
        method: "get",
      }).then((res) => {
        state.noticeNum = (res.data as any) || 0;
      });
    };

    //

    /**
     * 获取选中的一层菜单
     * @param { Array } routes 路由列表
     * @param { String } firstKey 一级路由
     *
     * @return
     */
    const getActiveKey = (
      routes: any[],
      firstKey?: number,
      openKeys: any[] = []
    ) => {
      for (let i = 0; i < routes.length; i++) {
        const routeItem = routes[i];
        if (routeItem.path === route.path) {
          state.activeKey = firstKey ? firstKey : routeItem.id;
        }
        if (Array.isArray(routeItem.children) && routeItem.children.length) {
          getActiveKey(routeItem.children, firstKey ? firstKey : routeItem.id, [
            ...openKeys,
            routeItem.id,
          ]);
        }
      }
    };

    const getRoutes = async () => {
      // 静态路由
      state.routes = router
        .getRoutes()
        .filter((item) => Object.is(item.name, "layout"))
        .map((ele) => ele.children)[0];

      // 动态路由
      //   let res = await request({
      //       url: import.meta.env.VITE_BASE_URL + "/menu/current/user/menu",
      //       type: "json",
      //       method: "get",
      //   });
      //   if (res.code == 200) {
      //       const menus = res.data as any;
      //       if (Array.isArray(menus) && menus.length) {
      //           for (let i = 0; i < menus.length; i++) {
      //               // 判断是否有消息菜单权限
      //               if (menus[i].id === 251) {
      //                   getNoticeNum()
      //                   break
      //               }
      //           }
      //           const routes = convertTree(
      //               menus
      //                   .sort((a: any, b: any) => a.num - b.num)
      //                   .map((item: any) => {
      //                       return Object.assign({}, item, {
      //                           path: item.url,
      //                           title: item.name,
      //                       });
      //                   }),
      //               { id: "id", pid: "parentId" },
      //               "num"
      //           )
      //           console.log('routes1111', routes)
      //           state.routes = routes;
      //           if (route.path === "/") {
      //               const activeKey = routes[0].id;
      //               state.activeKey = activeKey;
      //               handleTabChange(activeKey);
      //           } else {
      //               getActiveKey(routes);
      //           }
      //       } else {
      //           router.push("/error");
      //       }
      //   }

      console.log("-----getRoutes----", state.routes);
    };

    /**
     * 处理tab改变时触发
     * @param
     * @return
     */
    const handleTabChange = (activeKey: number) => {
      const { routes } = state;
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].id === activeKey) {
          const routeList = routes[i].children || [];
          isComplete = false;
          getOpenKeys(routeList);
        }
      }
    };

    /**
     * 获取打开的菜单
     * @param
     * @return
     */
    const getOpenKeys = (routeList: any[], openKeys: any[] = []) => {
      for (let i = 0; i < routeList.length; i++) {
        const routes = routeList[i];
        if (isSubMenu(routes)) {
          if (Array.isArray(routes.children) && routes.children.length) {
            getOpenKeys(routes.children, [...openKeys, routes.id]);
          } else {
            continue;
          }
        } else {
          if (!isComplete) {
            isComplete = true;
            sliderRef.value.setOpenKeys([...openKeys]);
            router.push(routes.path);
          }
        }
      }
    };

    getRoutes();

    watch(
      [() => state.routes, () => state.activeKey],
      (newValue) => {
        const [routes, activeKey] = newValue;
        state.routeList = routes;
      },
      { immediate: true }
    );

    watch(route, (route) => {
      let activeKey: any = null;
      handleGetPageSetting();
      const getActiveKey = (routes: any[], firstId?: string | number) => {
        for (let i = 0; i < routes.length; i++) {
          const routeItem = routes[i];
          if (routeItem.path === route.path) {
            activeKey = firstId || routeItem.id;
            break;
          } else {
            if (
              isEmpty(activeKey) &&
              Array.isArray(routeItem.children) &&
              routeItem.children.length
            ) {
              getActiveKey(routeItem.children, firstId || routeItem.id);
            }
          }
        }
      };
      getActiveKey(state.routes);
      if (!isEmpty(activeKey) && activeKey !== state.activeKey) {
        state.activeKey = activeKey;
      }
    });

    return {
      ...toRefs(state),
      sliderRef,
      handleTabChange,
    };
  },
});
</script>

<style scoped>
.manage {
  height: 100vh;
  overflow: hidden;
}
</style>
