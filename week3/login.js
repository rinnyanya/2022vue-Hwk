

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rin'; // 請加入個人 API Path

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
        })
      }
  },
  mounted(){
  
  }
}).mount('#app')