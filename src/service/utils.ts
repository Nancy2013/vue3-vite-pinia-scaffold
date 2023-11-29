export  const BASE_URL='/admin-api' // api前缀
export const formatData = (api: string, method: string, params: any, env?: string) => {
	const url=env?import.meta.env[env] + api:BASE_URL+api;
	const data = {
		url,
		type: "json",
		method,
	} as any
	if (method === 'get') {
		data.params = params;
	} else {
		data.data = params;
	}
	return data;
};