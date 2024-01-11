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
  // 这是按照插件的文档，在实例上启用了该插件，这个选项是插件特有的
  persist: true,
},
)
