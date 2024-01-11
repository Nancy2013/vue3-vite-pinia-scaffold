import { defineStore } from 'pinia'
import {useAppSotre} from './useAppSotre'

const appStore=useAppSotre();

export const usePassportSotre = defineStore('passportManage', {
  state:()=>({
    message:'hello',
    params:{},
  }),
  getters:{
    getMessage:(state)=>{
      const {message}=state;
      const {name}=appStore.userInfo;
      return `${message}  ${name}`;
    },
    mergeMessage(state){
      return (mergeInfo:string)=>this.getMessage+" "+mergeInfo;
    },
  },
  actions:{
    updateParams(payload:Object){
      console.log('---updateParams--',payload);
      appStore.updateUserInfo(payload);
      this.params=Object.assign({},{...payload});
    },
  },
},
)
