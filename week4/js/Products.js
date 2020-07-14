// 註冊分頁元件
Vue.component('pagination',{
    template:'#pagination',
    props:{
        pages: {
            type: Object,
            default() {
              return {
              };
            },
          },
    },
    methods:{
        emitPages(product){
            this.$emit('emit-pages',product);
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
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products/${id}`
            axios.get(api)
            .then((res) => {
                $('#productModal').modal('show');
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            })
        },
        //上傳產品
        updateProduct(){
            // 新增商品
            let api =`https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`
            let httpMethod = 'post';

            if(!this.isNew){ //編輯商品
                api=`https://course-ec-api.hexschool.io/api/${this.user.uuid}/ec/products/${this.tempProduct.id}`
                httpMethod = 'patch';
            }

            axios[httpMethod](api,this.tempProduct)
            .then((res)=>{
                $('#productModal').modal('hide');
                console.log(res);
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
            tempProduct:{
                imageUrl:[]
            },
            isNew:false,
            status:{
                fileUploading: false //上傳檔案
            },
            user:{
                token:'',
                uuid:'7f7cf697-969f-4e45-83f9-01ea57ba8ea3'
            }
        }
    },
    created(){
        // 取得token 的 cookie
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        
        this.getProducts();
    },
    methods: {
        // 取得產品資料
        getProducts(page = 1){
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`
            
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;
            
            axios.get(api)
            .then((res)=>{
                console.log(res.data.data);
            })
        },
        // 開啟 浮出視窗
        openModal(isNew,product){
            switch(isNew){
                case 'new':
                    this.tempProduct = {
                        imageUrl:[]
                    };
                    this.isNew = true;
                    $('#productModal').modal('show');
                    break
                case 'edit':
                    this.tempProduct = Object.assign({}, product);
                    this.isNew = false;
                    $('#productModal').modal('show');
                    break
                case 'delete':
                    this.tempProduct = Object.assign({}, product);
                    $('#productModal').modal('show');
                    break
                default:
                    break;
            }
        }
        
    },
})