import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './component/pagination.js';
import productModal from './component/productModal.js';
const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rin'; // 請加入個人 API Path

let myModal ='';
let delModal ='';




const app = createApp({
    data() {
      return {
        products:[],
        tempProduct:{
          imagesUrl: []
        },
        newProd:false,
        pages:{},
      }

    },
    methods:{
      checkAdmin() {
        axios.post(`${url}/api/user/check`)
          .then(() => {
            this.getProducts();
          })
          .catch((err) => {
            alert('驗證錯誤')
            window.location = 'login.html';
          })
      },
         getProducts(page=1) {
            axios.get(`${url}/api/${path}/admin/products/?page=${page}`)
            .then((res)=>{
              this.pages = res.data.pagination;
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
              console.log(this.newProd)
              myModal.show()
          
            }

          },
          delProd(){
            axios.delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
            .then((res)=>{
              // delModal.hide();
              this.btnModel('del');
              this.getProducts();            
            })
            .catch((error)=>{
              console.log(error)
            })
          },
          btnModel(e){
            if(e==="del"){
              delModal.hide();
              this.getProducts();

            }
            else{
              myModal.hide();
              this.getProducts();
            }
          }

    },
    mounted(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin()

       
        myModal= new bootstrap.Modal(document.querySelector('#productModal'));
        delModal = new bootstrap.Modal(document.querySelector('#delProductModal'));

       
       
    },
    components:{pagination , productModal}
  });

  // app.component('product-model',{
  //   props:['tempProduct'],
  //   template:'#product-model-temp',
  // });


  app.mount('#app')