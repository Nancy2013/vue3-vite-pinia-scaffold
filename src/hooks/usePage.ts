import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { deepClone } from "@/utils/common";
import { Modal, message } from "ant-design-vue";
import { showTime } from '@/utils/function'

interface UsePageOption<T, K> {
	searchInitData?: any,
	deleteRequest?: (params: T) => Promise<T>,
	transformSearch?: (params: any) => any
	sendRequest: (params: T) => Promise<ResponseData<GetListResponse<K>>>
}

const tempData={
    "code": 0,
    "data": {
        "list": [
            {
                "id": 27,
                "serialNo": "08WPEA2010001CD4T0000002",
                "content": "{\n \"Battery PassportID\":\"88.555.6008/08WPEA2010001CD4T0000002\",\n \"Battery Model\":\"GACBPHEVA8E01\",\n \"Serial number\":\"08WPEA2010001CD4T0000002\",\n \"Battery Status\":\"原始\",\n \"EV Manufacturer\":\"零跑汽车\",\n \"Country of Assembly\":\"中国\",\n \"Battery Producer\":\"正力新能\",\n \"Battery Brand\":\"正力新能\",\n \"Postal Address\":\"江苏·常熟市中国江苏省常熟市东南街道新安江路68号\",\n \"Contact Number\":\"+86 0512-5235 8288\",\n \"website and E-mail\":\"https://www.zenergy.cn/；zenergy@zenergy.cn\",\n \"Country of battery production\":\"中国\",\n \"Battery cell producer\":\"正力新能\",\n \"Country of cell production\":\"中国\",\n \"Date of manufacture\":\"2023-04-26\",\n \"Battery cell type\":\"圆柱\",\n \"Chemistry\":\"三元锂\",\n \"Number of cells per battery\":\"96\",\n \"Weight\":\"175Kg\",\n \"Total energy\":\"25KWh\",\n \"Energy density\":\"149Wh/Kg\",\n \"Rated Capacity\":\"72Ah\",\n \"Voltage(min-nominal-max)\":\"403.2V/355.2V/268.8V\",\n \"Temperature range(min-max)\":\"-30℃<T<50℃\",\n \"Battery size\":\"1070mm*795mm*235mm\",\n \"Share of renewable content\":\"镍8%   钴 21%   锂 6%\",\n \"Original power capability (in Watts)\":\"25KWh\",\n \"Power capability Limits\":\"35KWH\",\n \"Expected battery lifetime expressed in cycles, and reference test used\":\"2000\",\n \"Capacity threshold for exhaustion (only for electric vehicle batteries)\":\"80%\",\n \"Temperature range the battery can withstand when not in use (reference test)\":\"-40℃<T<60℃\",\n \"Period for which the commercial warranty for the calendar life applies\":\"6年\",\n \"Initial round trip energy efficiency\":\"90%\",\n \"Round trip energy efficiency and at 50 % of cycle-life\":\"80%\",\n \"Internal battery cell resistance\":\"<0.6mΩ\",\n \"Pack resistance\":\"41.8mΩ\",\n \"c-rate of relevant cycle-life test\":\"1C\",\n \"RecycledRawMaterials\":\"镍  钴  锂\",\n \"MaterialsTraceability\":\"30%\",\n \"GBA Membership coverage\":\"50%\",\n \"FirstTracedMaterial\":\"钴\",\n \"FirstPhysicalAmountPerBattery\":\"17KG\",\n \"SecondTracedMaterial\":\"镍\",\n \"SecondPhysicalAmountPerBattery\":\"6Kg\",\n \"FirstRawMaterialProvenance\":\"100% 中国\",\n \"SecondRawMaterialProvenance\":\"100% 中国\",\n \"The hazardous substances present in the battery, other than mercury, cadmium or lead\":\"未披露\",\n \"Usable extinguishing agent\":\"干粉灭火器\",\n \"Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight\":\"未披露\",\n \"The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste\":\"21%\",\n \"The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"6%\",\n \"The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"8%\",\n \"the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.\":\"未披露\",\n \"Data verification\":\"1/3 基础\",\n \"Traceability\":\"3/3 高\",\n \"Interoperability\":\"2/3 中\",\n \"Material flow aggregation\":\"批次电池\",\n \"Start of period\":\"2022-10-28\",\n \"End of period\":\"2023-04-18\",\n \"Rated capacity (in Ah)\":\"54AH\",\n \"Capacity fade (in %)\":\"20%\",\n \"Power (in W)\":\"11.88KW\",\n \"Power fade (in %)\":\"20%\",\n \"Internal resistance (in a) and internal resistance increase (in %)\":\"6mΩ\",\n \"Internal resistance increase (in %)\":\"12mΩ\",\n \"Where applicable, energy round trip efficiency and its fade (in %)\":\"80%、20%\",\n \"The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.\":\"2000次、6年\",\n \"Child Labor\":\"保障\",\n \"Questions answered_1\":\"14 / 14\",\n \"Number of companies\":\"5\",\n \"Human rights\":\"保障\",\n \"Questions answered\":\"15 / 15\",\n \"Number of companies_1\":\"5\",\n \"BCF (HMA)\":\"74 kg/kWh\",\n \"BCF (PMA)\":\"77 kg/kWh\",\n \"PRIMARY DATA\":\"0.596\",\n \"SECONDARY DATA\":\"0.404\",\n \"Number of companies_3\":\"5\",\n \"Administrative information about the manufacturer\":\"未披露\",\n \"Battery Model_1\":\"GACBPHEVA8E01\",\n \"Location of the battery manufacturing plant\":\"江苏·常熟市中国江苏省常熟市东南街道新安江路68号\",\n \"Battery EU Declaration of Conformity identification number\":\"未披露\",\n \"Carbon footprint share（from cradle to tomb）\":\"3327.31338kgCO₂eq\",\n \"Raw material acquisition and pre-processing\":\"2692.73514kgCO₂eq\",\n \"Main product production\":\"591.4633kgCO₂eq\",\n \"Distribution\":\"43.11591kgCO₂eq\",\n \"End of life and recycling\":\"未披露\"\n}",
                "passportName": "08WPEA2010001CD4T0000002",
                "productNo": "GACBPHEVA8E01",
                "productBatchNo": "1501C236010010",
                "num": "87/87",
                "templateId": 1,
                "templateName": "标准护照模板",
                "industry": 1,
                "status": 0,
                "creator": 1,
                "createTime": 1701408723000,
                "updater": 1,
                "updateTime": 1701408723000,
                "tradingDate": 1701408709000,
                "blockchainId": "281acbd3567ccc54420ac5905e07ff7682386cc22319996e50ad845645063c97",
                "enContent": "{\r\n \"Battery PassportID\":\"88.555.6008/08WPEA2010001CD4T0000002\",\r\n \"Battery Model\":\"GACBPHEVA8E01\",\r\n \"Serial number\":\"08WPEA2010001CD4T0000002\",\r\n \"Battery Status\":\"Original\",\r\n \"EV Manufacturer\":\"leapmotor\",\r\n \"Country of Assembly\":\"China\",\r\n \"Battery Producer\":\"Zenergy\",\r\n \"Battery Brand\":\"Zenergy\",\r\n \"Postal Address\":\"No. 68 Xin'anjiang Road, Southeast Street, Changshu City, Jiangsu Province, China\",\r\n \"Contact Number\":\"+86 0512-5235 8288\",\r\n \"website and E-mail\":\"https://www.zenergy.cn/；zenergy@zenergy.cn\",\r\n \"Country of battery production\":\"China\",\r\n \"Battery cell producer\":\"Zenergy\",\r\n \"Country of cell production\":\"China\",\r\n \"Date of manufacture\":\"2023-04-26\",\r\n \"Battery cell type\":\"cylindrical\",\r\n \"Chemistry\":\"NCM\",\r\n \"Number of cells per battery\":\"96\",\r\n \"Weight\":\"175Kg\",\r\n \"Total energy\":\"25KWh\",\r\n \"Energy density\":\"149Wh/Kg\",\r\n \"Rated Capacity\":\"72Ah\",\r\n \"Voltage(min-nominal-max)\":\"403.2V/355.2V/268.8V\",\r\n \"Temperature range(min-max)\":\"-30℃<T<50℃\",\r\n \"Battery size\":\"1070mm*795mm*235mm\",\r\n \"Share of renewable content\":\"Nickel 8% Cobalt 21% lithium 6%\",\r\n \"Original power capability (in Watts)\":\"25KWh\",\r\n \"Power capability Limits\":\"35KWH\",\r\n \"Expected battery lifetime expressed in cycles, and reference test used\":\"2000\",\r\n \"Capacity threshold for exhaustion (only for electric vehicle batteries)\":\"80%\",\r\n \"Temperature range the battery can withstand when not in use (reference test)\":\"-40℃<T<60℃\",\r\n \"Period for which the commercial warranty for the calendar life applies\":\"6 years\",\r\n \"Initial round trip energy efficiency\":\"90%\",\r\n \"Round trip energy efficiency and at 50 % of cycle-life\":\"80%\",\r\n \"Internal battery cell resistance\":\"<0.6mΩ\",\r\n \"Pack resistance\":\"41.8mΩ\",\r\n \"c-rate of relevant cycle-life test\":\"1C\",\r\n \"RecycledRawMaterials\":\"Nickel Cobalt lithium\",\r\n \"MaterialsTraceability\":\"30%\",\r\n \"GBA Membership coverage\":\"50%\",\r\n \"FirstTracedMaterial\":\"Cobalt\",\r\n \"FirstPhysicalAmountPerBattery\":\"17KG\",\r\n \"SecondTracedMaterial\":\"Nickel\",\r\n \"SecondPhysicalAmountPerBattery\":\"6Kg\",\r\n \"FirstRawMaterialProvenance\":\"100% China(review in progress)\",\r\n \"SecondRawMaterialProvenance\":\"100% China(review in progress)\",\r\n \"The hazardous substances present in the battery, other than mercury, cadmium or lead\":\"undisclosed\",\r\n \"Usable extinguishing agent\":\"powder fire extinguisher\",\r\n \"Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight\":\"undisclosed\",\r\n \"The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste\":\"21%\",\r\n \"The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"6%\",\r\n \"The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"8%\",\r\n \"the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.\":\"undisclosed\",\r\n \"Data verification\":\"1/3 basic\",\r\n \"Traceability\":\"3/3 high\",\r\n \"Interoperability\":\"2/3 med\",\r\n \"Material flow aggregation\":\"batch of batteries\",\r\n \"Start of period\":\"2022-10-28\",\r\n \"End of period\":\"2023-04-18\",\r\n \"Rated capacity (in Ah)\":\"54AH\",\r\n \"Capacity fade (in %)\":\"20%\",\r\n \"Power (in W)\":\"11.88KW\",\r\n \"Power fade (in %)\":\"20%\",\r\n \"Internal resistance (in a) and internal resistance increase (in %)\":\"6mΩ\",\r\n \"Internal resistance increase (in %)\":\"12mΩ\",\r\n \"Where applicable, energy round trip efficiency and its fade (in %)\":\"80%、20%\",\r\n \"The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.\":\"2000times 6years\",\r\n \"Child Labor\":\"safeguarded\",\r\n \"Questions answered_1\":\"14 / 14\",\r\n \"Number of companies\":\"5\",\r\n \"Human rights\":\"safeguarded\",\r\n \"Questions answered\":\"15 / 15\",\r\n \"Number of companies_1\":\"5\",\r\n \"BCF (HMA)\":\"74 kg/kWh\",\r\n \"BCF (PMA)\":\"77 kg/kWh\",\r\n \"PRIMARY DATA\":\"0.596\",\r\n \"SECONDARY DATA\":\"0.404\",\r\n \"Number of companies_3\":\"5\",\r\n \"Administrative information about the manufacturer\":\"not disclosed\",\r\n \"Battery Model_1\":\"GACBPHEVA8E01\",\r\n \"Location of the battery manufacturing plant\":\"No. 68 Xin'anjiang Road, Southeast Street, Changshu City, Jiangsu Province, China\",\r\n \"Battery EU Declaration of Conformity identification number\":\"not disclosed\",\r\n \"Carbon footprint share（from cradle to tomb）\":\"3327.31338kgCO₂eq\",\r\n \"Raw material acquisition and pre-processing\":\"2692.73514kgCO₂eq\",\r\n \"Main product production\":\"591.4633kgCO₂eq\",\r\n \"Distribution\":\"43.11591kgCO₂eq\",\r\n \"End of life and recycling\":\"Not disclosed\"\r\n}"
            },
            {
                "id": 26,
                "serialNo": "08WPEA2010001CD4T0000001",
                "content": "{\n \"Battery PassportID\":\"88.555.6008/08WPEA2010001CD4T0000001\",\n \"Battery Model\":\"GACBPHEVA8E01\",\n \"Serial number\":\"08WPEA2010001CD4T0000001\",\n \"Battery Status\":\"原始\",\n \"EV Manufacturer\":\"零跑汽车\",\n \"Country of Assembly\":\"中国\",\n \"Battery Producer\":\"正力新能\",\n \"Battery Brand\":\"正力新能\",\n \"Postal Address\":\"江苏·常熟市中国江苏省常熟市东南街道新安江路68号\",\n \"Contact Number\":\"+86 0512-5235 8288\",\n \"website and E-mail\":\"https://www.zenergy.cn/；zenergy@zenergy.cn\",\n \"Country of battery production\":\"中国\",\n \"Battery cell producer\":\"正力新能\",\n \"Country of cell production\":\"中国\",\n \"Date of manufacture\":\"2023-04-26\",\n \"Battery cell type\":\"圆柱\",\n \"Chemistry\":\"三元锂\",\n \"Number of cells per battery\":\"96\",\n \"Weight\":\"175Kg\",\n \"Total energy\":\"25KWh\",\n \"Energy density\":\"149Wh/Kg\",\n \"Rated Capacity\":\"72Ah\",\n \"Voltage(min-nominal-max)\":\"403.2V/355.2V/268.8V\",\n \"Temperature range(min-max)\":\"-30℃<T<50℃\",\n \"Battery size\":\"1070mm*795mm*235mm\",\n \"Share of renewable content\":\"镍8%   钴 21%   锂 6%\",\n \"Original power capability (in Watts)\":\"25KWh\",\n \"Power capability Limits\":\"35KWH\",\n \"Expected battery lifetime expressed in cycles, and reference test used\":\"2000\",\n \"Capacity threshold for exhaustion (only for electric vehicle batteries)\":\"80%\",\n \"Temperature range the battery can withstand when not in use (reference test)\":\"-40℃<T<60℃\",\n \"Period for which the commercial warranty for the calendar life applies\":\"6年\",\n \"Initial round trip energy efficiency\":\"90%\",\n \"Round trip energy efficiency and at 50 % of cycle-life\":\"80%\",\n \"Internal battery cell resistance\":\"<0.6mΩ\",\n \"Pack resistance\":\"41.8mΩ\",\n \"c-rate of relevant cycle-life test\":\"1C\",\n \"RecycledRawMaterials\":\"镍  钴  锂\",\n \"MaterialsTraceability\":\"30%\",\n \"GBA Membership coverage\":\"50%\",\n \"FirstTracedMaterial\":\"钴\",\n \"FirstPhysicalAmountPerBattery\":\"17KG\",\n \"SecondTracedMaterial\":\"镍\",\n \"SecondPhysicalAmountPerBattery\":\"6Kg\",\n \"FirstRawMaterialProvenance\":\"100% 中国\",\n \"SecondRawMaterialProvenance\":\"100% 中国\",\n \"The hazardous substances present in the battery, other than mercury, cadmium or lead\":\"未披露\",\n \"Usable extinguishing agent\":\"干粉灭火器\",\n \"Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight\":\"未披露\",\n \"The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste\":\"21%\",\n \"The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"6%\",\n \"The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"8%\",\n \"the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.\":\"未披露\",\n \"Data verification\":\"1/3 基础\",\n \"Traceability\":\"3/3 高\",\n \"Interoperability\":\"2/3中\",\n \"Material flow aggregation\":\"批次电池\",\n \"Start of period\":\"2022-10-28\",\n \"End of period\":\"2023-04-18\",\n \"Rated capacity (in Ah)\":\"54AH\",\n \"Capacity fade (in %)\":\"20%\",\n \"Power (in W)\":\"11.88KW\",\n \"Power fade (in %)\":\"20%\",\n \"Internal resistance (in a) and internal resistance increase (in %)\":\"6mΩ\",\n \"Internal resistance increase (in %)\":\"12mΩ\",\n \"Where applicable, energy round trip efficiency and its fade (in %)\":\"80%、20%\",\n \"The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.\":\"2000次、6年\",\n \"Child Labor\":\"保障\",\n \"Questions answered_1\":\"14 / 14\",\n \"Number of companies\":\"5\",\n \"Human rights\":\"保障\",\n \"Questions answered\":\"15 / 15\",\n \"Number of companies_1\":\"5\",\n \"BCF (HMA)\":\"74 kg/kWh\",\n \"BCF (PMA)\":\"77 kg/kWh\",\n \"PRIMARY DATA\":\"0.596\",\n \"SECONDARY DATA\":\"0.404\",\n \"Number of companies_3\":\"5\",\n \"Administrative information about the manufacturer\":\"未披露\",\n \"Battery Model_1\":\"GACBPHEVA8E01\",\n \"Location of the battery manufacturing plant\":\"江苏·常熟市中国江苏省常熟市东南街道新安江路68号\",\n \"Battery EU Declaration of Conformity identification number\":\"未披露\",\n \"Carbon footprint share（from cradle to tomb）\":\"3327.31338kgCO₂eq\",\n \"Raw material acquisition and pre-processing\":\"2692.73514kgCO₂eq\",\n \"Main product production\":\"591.4633kgCO₂eq\",\n \"Distribution\":\"43.11591kgCO₂eq\",\n \"End of life and recycling\":\"未披露\"\n}",
                "passportName": "08WPEA2010001CD4T0000001",
                "productNo": "GACBPHEVA8E01",
                "productBatchNo": "1501C236010010",
                "num": "87/87",
                "templateId": 1,
                "templateName": "标准护照模板",
                "industry": 1,
                "status": 0,
                "creator": 1,
                "createTime": 1701408713000,
                "updater": 1,
                "updateTime": 1701408713000,
                "tradingDate": 1701408699000,
                "blockchainId": "04a360d3ce5b0e981e42e3378187fbe4e6478a2288e91824945d5e88aa22fe81",
                "enContent": "{\r\n \"Battery PassportID\":\"88.555.6008/08WPEA2010001CD4T0000001\",\r\n \"Battery Model\":\"GACBPHEVA8E01\",\r\n \"Serial number\":\"08WPEA2010001CD4T0000001\",\r\n \"Battery Status\":\"Original\",\r\n \"EV Manufacturer\":\"leapmotor\",\r\n \"Country of Assembly\":\"China\",\r\n \"Battery Producer\":\"Zenergy\",\r\n \"Battery Brand\":\"Zenergy\",\r\n \"Postal Address\":\"No. 68 Xin'anjiang Road, Southeast Street, Changshu City, Jiangsu Province, China\",\r\n \"Contact Number\":\"+86 0512-5235 8288\",\r\n \"website and E-mail\":\"https://www.zenergy.cn/；zenergy@zenergy.cn\",\r\n \"Country of battery production\":\"China\",\r\n \"Battery cell producer\":\"Zenergy\",\r\n \"Country of cell production\":\"China\",\r\n \"Date of manufacture\":\"2023-04-26\",\r\n \"Battery cell type\":\"cylindrical\",\r\n \"Chemistry\":\"NCM\",\r\n \"Number of cells per battery\":\"96\",\r\n \"Weight\":\"175Kg\",\r\n \"Total energy\":\"25KWh\",\r\n \"Energy density\":\"149Wh/Kg\",\r\n \"Rated Capacity\":\"72Ah\",\r\n \"Voltage(min-nominal-max)\":\"403.2V/355.2V/268.8V\",\r\n \"Temperature range(min-max)\":\"-30℃<T<50℃\",\r\n \"Battery size\":\"1070mm*795mm*235mm\",\r\n \"Share of renewable content\":\"Nickel 8% Cobalt 21% lithium 6%\",\r\n \"Original power capability (in Watts)\":\"25KWh\",\r\n \"Power capability Limits\":\"35KWH\",\r\n \"Expected battery lifetime expressed in cycles, and reference test used\":\"2000\",\r\n \"Capacity threshold for exhaustion (only for electric vehicle batteries)\":\"80%\",\r\n \"Temperature range the battery can withstand when not in use (reference test)\":\"-40℃<T<60℃\",\r\n \"Period for which the commercial warranty for the calendar life applies\":\"6years\",\r\n \"Initial round trip energy efficiency\":\"90%\",\r\n \"Round trip energy efficiency and at 50 % of cycle-life\":\"80%\",\r\n \"Internal battery cell resistance\":\"<0.6mΩ\",\r\n \"Pack resistance\":\"41.8mΩ\",\r\n \"c-rate of relevant cycle-life test\":\"1C\",\r\n \"RecycledRawMaterials\":\"Nickel Cobalt lithium\",\r\n \"MaterialsTraceability\":\"0.3\",\r\n \"GBA Membership coverage\":\"50%\",\r\n \"FirstTracedMaterial\":\"Cobalt\",\r\n \"FirstPhysicalAmountPerBattery\":\"17KG\",\r\n \"SecondTracedMaterial\":\"Nickel\",\r\n \"SecondPhysicalAmountPerBattery\":\"6Kg\",\r\n \"FirstRawMaterialProvenance\":\"100% China(review in progress)\",\r\n \"SecondRawMaterialProvenance\":\"100% China(review in progress)\",\r\n \"The hazardous substances present in the battery, other than mercury, cadmium or lead\":\"undisclosed\",\r\n \"Usable extinguishing agent\":\"powder fire extinguisher\",\r\n \"Critical raw materials present in the battery in a concentration of more than 0,1 % weight by weight\":\"undisclosed\",\r\n \"The percentage share of cobalt in active materials and that has been recovered from battery manufacturing waste or post-consumer waste\":\"21%\",\r\n \"The percentage share of lithium in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"6%\",\r\n \"The percentage share of nickel that in active materials that has been recovered from battery manufacturing waste or post-consumer waste\":\"8%\",\r\n \"the percentage share of lead that is present in the battery and that has been recovered from waste, for each battery model per year and per manufacturing plant.\":\"undisclosed\",\r\n \"Data verification\":\"1/3 basic\",\r\n \"Traceability\":\"3/3 high\",\r\n \"Interoperability\":\"2/3 med\",\r\n \"Material flow aggregation\":\"batch of batteries\",\r\n \"Start of period\":\"2022-10-28\",\r\n \"End of period\":\"2023-04-18\",\r\n \"Rated capacity (in Ah)\":\"54AH\",\r\n \"Capacity fade (in %)\":\"20%\",\r\n \"Power (in W)\":\"11.88KW\",\r\n \"Power fade (in %)\":\"20%\",\r\n \"Internal resistance (in a) and internal resistance increase (in %)\":\"6mΩ\",\r\n \"Internal resistance increase (in %)\":\"12mΩ\",\r\n \"Where applicable, energy round trip efficiency and its fade (in %)\":\"80%、20%\",\r\n \"The expected life-time of the battery under the reference conditions for which it has been designed, in terms of cycles, except for non-cycle applications, and calendar years.\":\"2000times 6years\",\r\n \"Child Labor\":\"safeguarded\",\r\n \"Questions answered_1\":\"14 / 14\",\r\n \"Number of companies\":\"5\",\r\n \"Human rights\":\"safeguarded\",\r\n \"Questions answered\":\"15 / 15\",\r\n \"Number of companies_1\":\"5\",\r\n \"BCF (HMA)\":\"74 kg/kWh\",\r\n \"BCF (PMA)\":\"77 kg/kWh\",\r\n \"PRIMARY DATA\":\"0.596\",\r\n \"SECONDARY DATA\":\"0.404\",\r\n \"Number of companies_3\":\"5\",\r\n \"Administrative information about the manufacturer\":\"Not disclosed\",\r\n \"Battery Model_1\":\"GACBPHEVA8E01\",\r\n \"Location of the battery manufacturing plant\":\"No. 68 Xin'anjiang Road, Southeast Street, Changshu City, Jiangsu Province, China\",\r\n \"Battery EU Declaration of Conformity identification number\":\"Not disclosed\",\r\n \"Carbon footprint share（from cradle to tomb）\":\"3327.31338kgCO₂eq\",\r\n \"Raw material acquisition and pre-processing\":\"2692.73514kgCO₂eq\",\r\n \"Main product production\":\"591.4633kgCO₂eq\",\r\n \"Distribution\":\"43.11591kgCO₂eq\",\r\n \"End of life and recycling\":\"Not disclosed\"\r\n}"
            }
        ],
        "total": 2
    },
    "msg": ""
}

export const usePage = <T, K>(opts: UsePageOption<T, K>) => {
	const { searchInitData, sendRequest, deleteRequest, transformSearch } = opts;
	const router = useRouter();
	const searchData = ref<any>(deepClone(searchInitData) || {})
	const loading = ref<boolean>(true)
	const dataSource = ref<Array<K>>([])
	const pagination = ref<Pagination>({
		total: 0,
		current: 1,
		pageSize: 10
	})

	onMounted(() => {
		query();
	});

	/**
	 *查询
	 *
	 */
	const query = () => {
		const { current, pageSize } = pagination.value
		loading.value = true
		const paramsData: T = Object.assign({ pageNo: current, pageSize }, transformSearch && typeof transformSearch === 'function' ? { ...transformSearch(searchData.value) } : { ...searchData.value });
		sendRequest(paramsData).then((res) => {
			// const { code, data: { total, list }} = res;
			const { code, data: { total, list }} =tempData;
			if (code === 200 || code === 0) {
				dataSource.value = list && list.map((item: any, key: number) => {
					item.tableIndex = (current - 1) * pageSize + key + 1
					return {
						...item,
						...formatTime(item),
					}

				});
				pagination.value = {
					total: total || 0,
					current,
					pageSize,
				};
			}
			loading.value = false;
		}).catch((e: any) => {
			loading.value = false;
		});
	};

	/**
	 * 格式化时间
	 * @param item 数据
	 */
	const formatTime = (item: any) => {
		const { createTime, updateTime, } = item;
		if (createTime) {
			// 创建时间
			item.createTime = showTime(createTime);
		}
		if (updateTime) {
			// 更新时间
			item.updateTime = showTime(updateTime);
		}
		return item;
	}

	/**
	 *初始化分页组件
	 *
	 */
	const initPagination = () => {
		pagination.value.current = 1;
	};

	/**
	 *搜索
	 *
	 */
	const handleSearch = () => {
		initPagination();
		query();
	};

	/**
	 *分页
	 *
	 * @param {*} pagination 分页组件
	 */
	const paginationChange = (paginationData: Pagination) => {
		pagination.value = paginationData
		query();
	};

	/**
	 *刷新
	 *
	 */
	const handleFresh = () => {
		handleSearch();
	};

	/**
	   * 点击重置按钮触发
	   * @param { Object } record
	   * @return
	   */
	const handleReset = () => {
		searchData.value = deepClone(searchInitData) || {}
	}

	/**
	 *添加
	 *
	 */
	const handleAdd = (name: string, params?: any) => {
		if (name) {
			router.push({ name, params });
		}

	};

	/**
	 *详情
	 *
	 */
	const handleEdit = (name: string, query: any, params?: any) => {
		if (name && query) {
			router.push({ name, query, params });
		}

	};

	/**
	 *跳转
	 *
	 */
	const handleJump = (path: string, query?: any) => {
		router.push({ path, query })
	}

	/**
	 *删除
	 *
	 * @param {*} item
	 */
	const handleDel = (item: any, msg = "确认要删除该条数据？") => {
		Modal.confirm({
			title: "提示",
			content: msg,
			centered: true,
			onOk() {
				return new Promise((resolve, reject) => {
					const paramsData:any = {
						id: item.id
					}
					deleteRequest&&deleteRequest(paramsData).then((res: any) => {
						resolve(true);
						message.success("删除成功");
						query()
					}).catch(() => {
						reject();
					});
				})
			},
		});
	};

	return {
		loading,
		dataSource,
		searchData,
		pagination,
		query,
		handleSearch,
		handleAdd,
		handleEdit,
		handleJump,
		paginationChange,
		handleFresh,
		handleReset,
		handleDel,
	};
};