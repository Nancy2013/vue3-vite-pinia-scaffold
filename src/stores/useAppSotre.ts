import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppSotre = defineStore('app', {
  state:()=>({
    token:'',
    userInfo:{
      name:'admin',
      password:'admin123',
    },
  }),
  getters:{
    getToken:(state)=>state.token,
  },
  actions:{
    updateUserInfo(payload:string){
      console.log('---updateUserInfo--',payload);
      this.userInfo=payload;
    },
  },
},
)
