// 註冊分頁元件
Vue.component('pagination',{
    template:'#pagination',
    props:{
        pages: {}
    },
    data() {
        return {
        }
    },
    methods:{
        emitPages(item){
            this.$emit('emit-pages',item);
        }
    }
})

// 註冊新增商品 / 編輯商品元件
Vue.component('productModal',{
    template:'#productModal',
    props:{
        productid:'',
        status:{},
        isNew:true,
        user:{}        
    },
    data() {
        return {
            tempProduct:{
                imageUrl:[]
            }
        }
    },  
    methods:{
        //取得產品
        getProduct(id){ 
            console.log("getProduct(id)");
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`
            axios.get(api).then((res) => {
                $('#productModal').modal('show');
                this.tempProduct = res.data.data;
               
            }).catch((error)=>{
                console.log(error);
            })
        },
        //上傳產品(新增 及 編輯)
        updateProduct(){
            console.log(this.tempProduct);
            // 新增商品
            let api =`https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`
            let httpMethod = 'post';

            if(!this.isNew){ //編輯商品
                api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`
                httpMethod = 'patch';
            }

            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios[httpMethod](api,this.tempProduct).then((res)=>{
                $('#productModal').modal('hide');
                this.$emit('update');
                console.log("updateProduct()");
            }).catch((error)=>{
                console.log(error);
            })
        },
        //上傳檔案
        uploadFile(){
            const uploadFile = this.$refs.file.files[0];
            console.log(this.$refs.file.files[0]);
            const formData = new FormData();  // 一開始表單的資料是空的
            formData.append('file',uploadFile);
            const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`
            this.fileUploading = true;
            axios.post(url,formData,{
                headers:{
                    'Content':'multipart/form-data'
                }
            }).then((res)=>{
                this.fileUploading = false;
                if(res.status === 200){
                    this.tempProduct.imageUrl.push(res.data.data.path);
                }
            }).catch((error)=>{
                console.log('上傳不可超過 2 MB');
                this.status.fileUploading = false;
            })
        },
        clearProductData(){
            this.tempProduct = {
                imageUrl: [],
            };
        }
        
    }
})

// 註冊刪除商品元件
Vue.component('delProductModal',{
    template:'#delProductModal',
    props:{
        tempProduct:{
            imageUrl:[]
        },
        user:{}
    },
    data() {
        return {
        };
      },
    methods:{
        delProduct(){
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
            
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.delete(api).then((res)=>{
                $('#delProductModal').modal('hide');
                this.$emit('update');
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
})


new Vue({
    el:'#app',
    data(){
        return{
            products:[],
            pagination:{},
            tempProduct:{
                imageUrl:[]
            },
            isNew:false,
            status:{
                fileUploading: false
            },
            user:{
                token:'',
                uuid:'7f7cf697-969f-4e45-83f9-01ea57ba8ea3'
            }
        }
    },
    created(){
        // 取得token 的 cookie
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        // 若無法取得 token 則返回 Login 頁面 (當token空值時)
        if (this.user.token === '') {
            window.location = 'Login.html';
        }
        this.getProducts();
    },
    methods: {
        // 取得產品資料
        getProducts(page = 1){
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`
            
            // 預設token
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            
            axios.get(api).then((res)=>{
                this.products = res.data.data;
                this.pagination = res.data.meta.pagination;
                // console.log(res.data);
            }).catch((error)=>{
                console.log(error);
            })
        },
        // 開啟 浮出視窗
        openModal(isNew,product){
            switch(isNew){
                case 'new':
                    this.tempProduct = {
                        imageUrl: [],
                    };
                    // 使用 refs 觸發子元件方法
                    this.$refs.productModal.clearProductData(); //清空productModal元件資料
                    this.isNew = true;
                    $('#productModal').modal('show');
                    break
                case 'edit':
                    this.tempProduct = Object.assign({}, product); //淺層複製
                    // 使用 refs 觸發子元件方法
                    this.$refs.productModal.getProduct(this.tempProduct.id); //把此商品id傳進getProduct function->抓取對應商品資訊
                    this.isNew = false;
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, product);
                    $('#delProductModal').modal('show');
                    break
                default:
                    break;
            }
        }
        
    },
})