const passportManage=[
    {
        id:'1-0',
        level: 1,
        icon: "detail",
        path: "#",
        name: "passportManage",
        title: "护照管理",
        ismenu: "Y",
        component: () => import("@/views/main/layout/basicLayout.vue"),
        children:[
            { // 护照管理
                id:'1-0-1',
                level: 2,
                icon: "",
                path: '/productManage/passportManageList',
                name: "passportManageList",
                title: "护照管理",
                meta: { title: "护照管理" },
                ismenu: "Y",
                component: () => import("@/views/main/passportManage/passportManageList/index.vue"),
            },
        ],
    }
]
export default passportManage;