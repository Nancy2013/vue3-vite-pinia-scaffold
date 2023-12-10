import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePassportSotre = defineStore('passportManage', {
  state:()=>({
    message:'',
    params:{},
  }),
  getters:{
    getMessage:(state)=>state.message,
    mergeMessage:(state)=>{
      return (mergeInfo:string)=>state.message+mergeInfo;
    }
  },
  actions:{
    updateParams(payload:string){
      console.log('---updateParams--',payload);
      this.message=payload;
    },
  },
},
)
