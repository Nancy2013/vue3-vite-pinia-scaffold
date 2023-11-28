/**
 * 路由管理
 */

export default [
	{
		path: "/mobile",
		name: "mobile",
		component: () => import("@/mobile/index.vue"),
		children: [
			{
				path: "/mobileLogin",
				name: "mobileLogin",
				component: () => import("@/mobile/sys/login/login.vue"),
			},
			{
				path: "/mobileHome",
				name: "mobileHome",
				component: () => import("@/mobile/main/home/home.vue"),
			},
			{
				path: "/mobileValidData",
				name: "mobileValidData",
				component: () => import("@/mobile/main/validData/validData.vue"),
			}
		]
	}
]