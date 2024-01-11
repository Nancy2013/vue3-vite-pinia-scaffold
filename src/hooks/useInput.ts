import { ref, onMounted, reactive, toRefs, computed } from "vue";

export const useInput = (opts?: any) => {
  const state = reactive({
    readOnly: true,
    isHide: true,
  });

  onMounted(() => {
    initInput();
  });

  /**
   * 初始化
   */
  const initInput = () => {
    state.readOnly = true;
	  state.isHide=true;
  };

  /**
   * 密码输入框类型
   */
  const inputType = computed(() => {
    const { isHide } = state;
    const inputType = isHide ? "password" : "text";
    return inputType;
  });

  /**
   * 显示隐藏密码
   */
  const showPwd = () => {
    state.isHide = !state.isHide;
	  state.readOnly = true;
  };

  /**
   * input获得焦点
   */
  const handleInputFocus = () => {
    state.readOnly = false;
  };

  /**
   * input失去焦点
   */
  const handleInputblur = () => {
    state.readOnly = true;
  };

  return {
    ...toRefs(state),
    inputType,
    showPwd,
    initInput,
    handleInputFocus,
    handleInputblur,
  };
};
