import axios, {
	type AxiosRequestConfig,
	type AxiosRequestHeaders,
	type AxiosResponse,
  } from "axios";
  import { message, Modal } from "ant-design-vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  // 取消重复请求
  const pending: Array<pendingType> = [];
  // 中断请求 —— 类似原生abort()
  const CancelToken = axios.CancelToken;
  
  // axios 实例
  const instance = axios.create({
	timeout: 30000,
	responseType: "json",
  });
  
  // 移除重复请求
  const removePending = (config: AxiosRequestConfig) => {
	pending.forEach((item, index) => {
	  let count: number = +index;
	  // 对象比较
	  const strObj = (obj: pendingType | AxiosRequestConfig): string => {
		return Object.entries(obj).toString();
	  };
	  // 执行存在请求体函数
	  if (Object.is(strObj(item), strObj(config))) {
		// 执行取消操作
		item.cancel("操作太频繁，请稍后再试!");
		// 数组中移除记录
		pending.splice(count, 1);
	  }
	});
  };
  
  // 添加请求拦截器
  instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
	  removePending(config);
	  const notToken = (config as any).notToken;
	  const headers = config.headers as AxiosRequestHeaders;
	  if (import.meta.env.VITE_Tag) {
		// headers[`tag`] = `${import.meta.env.VITE_Tag}`;
	  }
	  headers[`tenant-id`] = `${import.meta.env.VITE_APP_ID}`;
	  config.cancelToken = new CancelToken((c: Function) => {
		let { url, method, params, data } = config;
		pending.push({ url, method, params, data, cancel: c });
	  });
	  const accessToken: string | null = localStorage.getItem("accessToken");
	  const userId: string | null = localStorage.getItem("userId");
	  if (!notToken && accessToken) {
		headers[`Authorization`] = `Bearer ${accessToken}`;
	  }
	  if (!notToken) {
		headers[`userId`] = `${userId}`;
	  }
	  return config;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
  
  // 添加响应式拦截器 (对错误信息做过滤处理)
  instance.interceptors.response.use(
	(response: AxiosResponse) => {
	  let {
		data: { code },
		config
	  } = response as any;
	  let refreshToken = localStorage.getItem("refreshToken");
	  let accessToken = localStorage.getItem("accessToken");
	  if (code == 401 && accessToken) {
		if (refreshToken && localStorage.getItem("cancelPending") == null) {
		  instance({
			url: `${
			  import.meta.env.VITE_BASE_URL
			}/system/auth/refresh-token?refreshToken=${refreshToken}`,
			type: "json",
			method: "post",
		  } as any).then(async (res) => {
			let {
			  data: { code, data },
			} = res;
			if (code == 0) {
			  localStorage.setItem("userId", data.userId);
			  localStorage.setItem("accessToken", data.accessToken);
			  localStorage.setItem("refreshToken", data.refreshToken);
			  localStorage.removeItem("cancelPending");
			  config.headers[`Authorization`] = `Bearer ${data.accessToken}`;
			  const resp = await instance.request(config);
			  return resp.data;
			}
		  });
		}
	  } else {
		localStorage.removeItem("cancelPending");
	  }
	  return response;
	},
	(error) => {
	  return Promise.reject(error);
	}
  );
  
  /**
   * axios 基础构建
   */
  
  const request = <T, K>(info: requestType<T>): Promise<ResponseData<K>> => {
	const baseURL: string = ""; // '/api';
  
	const contentType = (): string => {
	  switch (info.type) {
		case "json":
		  return "application/json;charset=UTF-8";
		case "form-data":
		  return "multipart/form-data";
		default:
		  return "application/json;charset=UTF-8";
	  }
	};
  
	// 自定义heaader头
	const headers: AxiosRequestHeaders = {
	  "Content-Type": contentType(),
	};
  
	// 请求体
	return new Promise((resolve, reject) => {
	  const assignInfo: requestType = Object.assign({ baseURL, headers }, info);
	  instance(assignInfo as AxiosRequestConfig)
		.then((res) => {
		  if (assignInfo.notCheck) {
			resolve(res.data);
			return;
		  }
		  if (assignInfo.isDownload) {
			resolve(res as any);
		  } else {
			if (res.data.code === 0 || res.data.code === 200) {
			  resolve(res.data);
			} else {
			  const { code } = res.data;
			  localStorage.setItem("cancelPending", "y");
			  if(code != 401) message.error(res.data.msg);
			  reject(res.data);
			}
		  }
		})
		.catch((error) => {
		  reject(error);
		});
	});
  };
  
  export default request;