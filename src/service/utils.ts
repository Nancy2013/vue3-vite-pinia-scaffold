export const formatData = (api: string, method: string, params: any,) => {
	const url=import.meta.env.VITE_BASE_URL+api;
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