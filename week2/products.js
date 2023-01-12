

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rin'; // 請加入個人 API Path

createApp({
    data() {
      return {
        products:[],
        temp:{},
      }

    },
    methods:{
         getProducts() {
            axios.get(`${url}/api/${path}/admin/products`)
            .then((res)=>{

             this.products = res.data.products;
            //  console.log(this.products)
            })
            .catch((error)=>{
              console.log(error)
            })
          }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts()
        if(!token){
        location.href="login.html";
        }
    }
  }).mount('#app')