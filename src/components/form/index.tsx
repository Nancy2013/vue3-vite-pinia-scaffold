import { defineComponent, ref, type PropType, toRefs, reactive, watch } from "vue";
import { Form } from 'ant-design-vue'
import styles from "./index.module.less";
import type { RuleObject } from 'ant-design-vue/lib/form/index';
import type { SelectProps } from 'ant-design-vue/lib/select/index';
import FormItem from './formItem'
import type { CascaderOptionType } from 'ant-design-vue/lib/cascader/index';
import type { UploadListType } from 'ant-design-vue/lib/upload/interface';
import type { FormLabelAlign, } from 'ant-design-vue/lib/form/interface';
import type { ColProps } from 'ant-design-vue/lib/col/index';
import type { TreeSelectProps } from 'ant-design-vue/lib/tree-select/index';

/**
 * 输入框类型 int float word
 */
export type InputType = 'int' | 'float' | 'word'
/**
 * 表单项类型
 */
export type FormItemType = 'input' | 'select' | 'radio' | 'textarea' | 'datePicker' | 'checkbox' | 'cascader' | 'upload' | 'switch' | 'treeSelect' | 'rangeInput' | 'address'

/**
 * form的布局方式 
 */
export type Layout = 'horizontal' | 'vertical' | 'inline'

/**
 * 日期选择器类型
 */
export type datePickerType = 'datePicker' | 'rangePicker'
/**
 * 上传类型
 */
export type UploadType = 'button' | 'card'

/**
 * 
 */
export type BoxType = 'modal' | 'page' | 'search'

/**
 * 渲染的表单项
 */
export interface RenderFormItem {
	/**
	 * 描述
	 */
	label?: string
	/**
	 * 绑定的key
	 */
	key: string
	/**
	 * 表单类型
	 */
	type: FormItemType
	/**
	 * 表单宽度
	 */
	width?: string
	/**
	 * 占位符
	 */
	placeholder?: string
	/**
	 * 区间占位符
	 */
	rangePlaceholder?: string[]
	/**
	 * 是否必填
	 */
	required?: boolean
	/**
	 * 输入框类型 int(整形) float(浮点型) word(不允许输特殊符号)
	 */
	inputType?: InputType
	/**
	 * 小数位
	 */
	decimalLen?: number
	/**
	 * 输入框过滤方法
	 */
	filterFnc?: (value: string) => string
	/**
	 * 是否禁用
	 */
	disabled?: boolean
	/**
	 * 可选项
	 */
	options?: SelectProps['options']
	/**
	 * 是否带有清楚按钮
	 */
	allowClear?: boolean,
	/**
	 * 校验规则
	 */
	rules?: { [k: string]: RuleObject | RuleObject[] }
	/**
	 * 最大长度
	 */
	maxlength?: number
	/**
	 * 时间选择器类型
	 */
	datePickerType?: datePickerType
	/**
	 * 上传类型
	 */
	uploadType?: UploadType
	/**
	 * 描述
	 */
	remark?: string
	/**
	 * 标题
	 */
	title?: string
	/**
	 * 接受上传的文件类型
	 */
	accept?: string
	/**
	 * 接受上传的地址
	 */
	action?: string
	/**
	 * 最大上传数
	 */
	maxCount?: number
	/**
	 * 上传列表的内建
	 */
	listType?: UploadListType
	/**
	 * 是否多选
	 */
	multiple?: boolean
	/**
	 * 限制大小 单位B
	 */
	limitSize?: number
	/**
	 * 标签对齐
	 */
	labelAlign?: FormLabelAlign
	/**
	 * label 标签布局
	 */
	labelCol?: ColProps
	/**
	 * 是否隐藏
	 */
	isHide?: boolean
	/**
	 * 级联选择器动态加载数据方法
	 * @param { CascaderOptionType } options 选项
	 * @returns 
	 */
	loadData?: (options: CascaderOptionType) => void
	/**
	 * 是否加载状态
	 */
	loading?: boolean
	/**
	 * 选中的值
	 */
	checkedValue?: boolean | string | number
	/**
	 * 未选中的值
	 */
	unCheckedValue?: boolean | string | number
	/**
	 * 自定义label和value值
	 */
	fieldNames?: any
	/**
	 * 输入框过滤方法
	 * @returns 
	 */
	filterOption?: (input: string, option: any) => boolean
	/**
	 * 是否可以搜索
	 */
	showSearch?: boolean
	/**
	 * 输入框是否是密码类型
	 */
	password?: boolean
	/**
	 * treeSelect treeNodes 数
	 */
	treeData?: TreeSelectProps[]
	/**
	 * 使用简单格式的 treeData
	 */
	treeDataSimpleMode?: boolean
	/**
	 * 默认展开所有树节点
	 */
	treeDefaultExpandAll?: boolean
	/**
	 * 表单布局方式
	 */
	layout?: Layout
	/**
	 * datePicker类型
	 */
	picker?: any
	/**
	 * 格式化datePicker
	 */
	valueFormat?: any
	/**
	 * 日期选择器是否开启选择时间功能
	 */
	showTime?: boolean
	/**
	 * 不可选择日期
	 */
	disabledDate?: any
}

export default defineComponent({
	name: 'TsxForm',
	props: {
		renderList: {
			type: Object as PropType<RenderFormItem[]>,
			required: true
		},
		formData: {
			type: Object as PropType<any>,
			required: true
		},
		layout: {
			type: String as PropType<Layout>,
			default: 'inline'
		},
		type: {
			type: String,
		},
		labelAlign: {
			type: String as PropType<FormLabelAlign>,
			default: 'right'
		},
		rules: {
			type: [Array, Object] as PropType<{ [k: string]: RuleObject | RuleObject[] }>
		},
		labelCol: {
			type: [Object, String, Number, Array] as PropType<ColProps | any>
		},
		boxType: {
			type: String as PropType<BoxType>,
			default: 'modal'
		}
	},
	emits: ["change", "unifyEvent"],
	setup(props, { slots, emit }) {
		const formRef = ref()

		/**
		 * 执行校验
		 * @param { Array } nameList name数组
		 * @return
		 */
		const validate = (nameList: string[]) => {
			return new Promise((resolve, reject) => {
				formRef.value.validate(nameList).then((formData: any) => {
					resolve(formData)
				}).catch(() => {
					reject()
				})
			})
		}

		/**
		 * 移除表单项的校验结果
		 * @param
		 * @return
		 */
		const clearValidate = () => {
			formRef.value.clearValidate()
		}

		/**
		 * 对整个表单进行重置
		 * @param
		 * @return
		 */
		const resetFields = () => {
			formRef.value.resetFields()
		}

		/**
		 * 处理表单数据改变事件
		 * @param { Object } value 表单绑定的值
		 * @param { RenderFormItem } renderItem 表单项渲染数据
		 * @return
		 */
		const handleChange = (value: any, renderItem: RenderFormItem) => {
			emit("change", value, renderItem)
		}

		/**
		 * 统一处理表单事件
		 * @param { Object } event 事件数据
		 * @param { RenderFormItem } renderItem 表单项渲染数据
		 * @return
		 */
		const handleUnifyEvent = (event: any, renderItem: RenderFormItem) => {
			emit("unifyEvent", event, renderItem)
		}
		return {
			formRef,
			handleChange,
			validate,
			clearValidate,
			resetFields,
			handleUnifyEvent
		}
	},
	render() {
		return <Form ref="formRef" class={[styles['form'], styles[`form-${this.boxType}`]]} layout={this.layout} model={this.formData} labelAlign={this.labelAlign} rules={this.rules} labelCol={this.labelCol} wrapperCol={{ style: Object.assign({ marginLeft: '8px' }, { flex: 1, overflow: 'hidden' }) }}>
			{
				this.renderList.map((renderItem) => {
					return renderItem.isHide ? '' : <FormItem key={renderItem.key} renderItem={renderItem} v-model:value={this.formData[renderItem.key]} onChange={(value: any) => { this.handleChange(value, renderItem) }} onUnifyEvent={(event: any) => { this.handleUnifyEvent(event, renderItem) }}></FormItem>
				})
			}
			{ this.$slots.default && this.$slots.default() }
		</Form>
	}
})