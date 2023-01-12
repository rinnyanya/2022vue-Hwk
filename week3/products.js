

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rin'; // 請加入個人 API Path
  let myModal ='';
  let delModal ='';




createApp({
    data() {
      return {
        products:[],
        tempProduct:{
          imagesUrl: []
        },
        newProd:false,
        newImg:'',
      }

    },
    methods:{
         getProducts() {
            axios.get(`${url}/api/${path}/admin/products`)
            .then((res)=>{

             this.products = res.data.products;
       
            })
            .catch((error)=>{
              console.log(error)
            })
          },
          open(prod,i){
         
            if(prod === "del") {
              delModal.show();
              this.tempProduct =i;
              this.newProd =false;
        
              
            }
            else if(prod=="edit"){
              myModal.show()
              this.tempProduct ={...i};
              this.newProd =false;
   
              
            }
            else if(prod=="new"){
              this.tempProduct={
                imagesUrl: []
              };

              this.newProd =true;
              myModal.show()
          
            }

          },
          sendProd(){
            if(this.newProd){
            axios.post(`${url}/api/${path}/admin/product`,{data:this.tempProduct})
            .then((res)=>{
          
              myModal.hide();
              this.getProducts();
              this.tempProduct={};
            })
            .catch((error)=>{
              console.log(error)
              alert('新增商品失敗，請確認是否有誤')
            })
            }
            else{
              // console.log(this.tempProduct)
              // const index = this.products.findIndex((i)=>{
              //   return i.id === this.tempProduct.id
              // })
              // console.log(i.id);
              // this.products[index] = this.tempProduct;
              // myModal.hide();
              // this.getProducts();
            axios.put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
            .then(()=>{
            
              myModal.hide();
              this.getProducts();
              
             
            })
            .catch((error)=>{
              console.log(error)
            })
            }
          },
          delProd(){
            axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
            .then((res)=>{
              delModal.hide();
              this.getProducts();            
            })
            .catch((error)=>{
              console.log(error)
            })
          },
          imgBtn(i,index){
            if(i==="push"){
              // console.log(this.tempProduct.imagesUrl)
              this.tempProduct.imagesUrl.splice(index,1)
              // this.tempProduct.imagesUrl.push(this.newImg)
            }
            else{
              // this.tempProduct.imagesUrl.pop()
              // tempProduct.imagesUrl.push('')
              // console.log(this.tempProduct.imagesUrl)
              this.tempProduct.imagesUrl = [];
              this.tempProduct.imagesUrl.push('');
            }
          }

    },
    mounted(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        this.getProducts()
        myModal= new bootstrap.Modal(document.querySelector('#productModal'));
        delModal = new bootstrap.Modal(document.querySelector('#delProductModal'));


        if(!token){
        location.href="login.html";
        }
    }
  }).mount('#app')



//     // const modalBtn = document.querySelector('#modalBtn');
//   // const modal = document.querySelector('#modal');
//   let myModal ='';

  
//   // modalBtn.addEventListener('click',()=>{
//   //   myModal.show()
//   // })
//   Vue.createApp({
//     data(){
//       return{
//         text:'ㄏㄏ'
//       }
//     },
//   methods:{
//     open(){
//       myModal.show()
//     }
//   },
//   mounted(){
//     myModal= new bootstrap.Modal(document.querySelector('#modal'));
//   }
// }).mount('#app')
    