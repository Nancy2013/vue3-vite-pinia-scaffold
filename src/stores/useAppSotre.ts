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
    updateUserInfo(payload:Object){
      console.log('---updateUserInfo--',payload);
      this.userInfo=Object.assign({},{...this.userInfo},{...payload});
    },
    updateUserInfoAsync(payload:Object){
      console.log('---updateUserInfoAsync--',payload);
      return new Promise((resolve) => {
        setTimeout(() => {
          this.userInfo=Object.assign({},{...this.userInfo},{...payload});
          resolve('Async done.')
        }, 3000)
      })
    },
  },
},
)
