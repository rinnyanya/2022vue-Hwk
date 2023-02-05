const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'rin'; // 請加入個人 API Path
export default {
    props:['tempProduct','newProd'],
    mounted(){
      const imgfile = document.querySelector('#imgfile');
      // document.getElementById('imgForm')&&document.getElementById('imgForm').reset();
    },
    methods:{

      imgBtn(i,index){
        if(i==="del"){
          this.tempProduct.imagesUrl.splice(index,1)

        }
        else{
          this.tempProduct.imagesUrl = [];
          this.tempProduct.imagesUrl.push('');
        }
      },
      upImgBtn(){
        const file = imgfile.files[0];
        if(!file){
          alert('請確認圖片路徑')
        }
        else{
          
        const formData = new FormData();
        formData.append('file-to-upload',file);

        axios.post(`${url}/api/${path}/admin/upload`,formData)
        .then((res)=>{
          if(!this.tempProduct.imagesUrl){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
            // file.reset();
            
          }
          else{
            
            this.tempProduct.imagesUrl.push(res.data.imageUrl);
           
          }
        
          

        })
        .catch((error)=>{
          console.log(error)
          alert('上傳圖片失敗')
        })
        }

      },
      sendProd(){
        if(this.newProd){
        axios.post(`${url}/api/${path}/admin/product`,{data:this.tempProduct})
        .then((res)=>{
      
          this.$emit('close');

        })
        .catch((error)=>{
          console.log(error)
          alert('新增商品失敗，請確認是否有誤')
        })
        }
        else{
        axios.put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
        .then(()=>{
        
          this.$emit('close');
          // this.getProducts();
          
         
        })
        .catch((error)=>{
          console.log(error)
        })
        }
      },
    },
      template:`
      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="newProd">新增產品</span>
              <span v-else>編輯產品{{tempProduct.id}}</span>

            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <h3>主要圖片</h3>
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control"
                           placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                  <h3>內容圖片</h3>
                  <form id="imgForm">
                  <input type="file" name="imgurl" class="form-control" id="imgfile" placeholder="請輸入圖片連結">
                  </form>
                  <button class="btn btn-success mb-3 mt-1 btn-sm d-block w-100"
                  @click="upImgBtn">
                  上傳圖片
                </button>
                  <div  v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div class="mb-3" v-for="(item,key) in tempProduct.imagesUrl" :key="key">
                     
                        <label for="imageUrl" class="form-label">輸入圖片網址</label>
                        <input type="text" class="form-control" 
                               placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                        <img :src="item" alt="" class="images m-2" style="width: 100%;">
                          <button class="btn btn-outline-danger btn-sm d-block w-50"
                          @click="imgBtn('del',key)">
                          刪除圖片
                        </button>
                       
                    
          
                    </div>
                    <div >
                      <button class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.push('')">
                        新增圖片網址
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="imgBtn">
                      新增圖片網址
                    </button>
                  </div>
                  <div>
                
                  </div>
                </div>
    
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control"
                           placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control"
                           placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入產品描述" v-model="tempProduct.description">
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control"
                            placeholder="請輸入說明內容" v-model="tempProduct.content">
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled"  v-model="tempProduct.is_enabled"  class="form-check-input" type="checkbox"
                           :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="sendProd()">
              確認
            </button>
          </div>
        </div>
      </div>
      </div>
 `,

  }