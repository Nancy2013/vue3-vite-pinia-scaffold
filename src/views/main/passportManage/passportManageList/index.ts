import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  ref,
  computed,
  nextTick,
} from "vue";
import { storeToRefs } from 'pinia'
import {useAppSotre,usePassportSotre} from '@/stores'

export default defineComponent({
  props: {},
  components: {},
  setup() {
    const appStore=useAppSotre();
    const passportSotre=usePassportSotre();
    const state = reactive({});
  
    console.log('----useAppSotre--',appStore);
    
    onMounted(()=>{})

    /**
     * 更新
     */
    const handleUpdate=()=>{
      // 批量更新
      appStore.$patch({
        token:'1234567890',
        userInfo:{
          name:'Hello World',
          password:'123456',
        }
      })

      // 单个更新
      // appStore.userInfo={
      //   name:'Hello World',
      //   password:'123456',
      // }

      // 合并
      // appStore.$patch((state:any)=>{
      //   const {userInfo}=state;
      //   appStore.userInfo={
      //     ...userInfo,
      //     age:18
      //   }
      // });

      // 使用action-同步
      // appStore.updateUserInfo({age:20});

      // 使用action-异步
      // appStore.updateUserInfoAsync({age:20});

      // store间调用
      // passportSotre.updateParams({
      //   name:'World',
      //   password:'123456',
      //   age:20,
      // });

      console.log('----useAppSotre--',appStore.userInfo);
    }

    /**
     * 重置
     */
    const handleReset=()=>{
      appStore.$reset();
    }

    return {
      ...toRefs(state),
      ...storeToRefs(appStore),
      ...storeToRefs(passportSotre),
      handleUpdate,
      handleReset,
    };
  },
});
