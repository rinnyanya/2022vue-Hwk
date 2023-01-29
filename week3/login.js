

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點

createApp({
  data() {
    return {
      user:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    login() {

        axios.post(`${url}/admin/signin`,this.user)
        .then((res)=>{    
          const {token,expired} = res.data; 
          document.cookie = `hexToken=${ token }; expires=${ new Date(expired) }, 31 Dec 9999 23:59:59 GMT; `;
          location.href="products.html";
        })
        .catch((error)=>{
          console.log(error)
          alert('登入失敗，請確認帳號密碼')
        })
      }
  },
}).mount('#app')