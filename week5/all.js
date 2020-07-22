//匯入語系檔案(繁中)
import zh from './zh_TW.js';

// 加入至 VeeValidate 的設定檔案 (語系)
VeeValidate.localize('tw', zh);

// class 設定檔案(錯誤class名稱)
VeeValidate.configure({
    classes: {
        valid: 'is-valid', //驗證成功
        invalid: 'is-invalid', //驗證失敗
    }
});

// 註冊全域元件
//將 VeeValidate input驗證工具載入
Vue.component('ValidationProvider',VeeValidate.ValidationProvider);
//將 VeeValidate 完整表單驗證工具載入
Vue.component('ValidationObserver',VeeValidate.ValidationObserver);

//註冊 產品詳情 Modal
Vue.component('productModal',{
    template:'#productModal',
    props:{
        productId:'',
        status:{},
        uuid:'',
        apiPath:''        
    },
    data() {
        return {
            tempProduct:{
                imageUrl:[]
            }
        }
    },  
    methods:{
        //取得單一產品細節資料(查看更多)
        getDetail(id){ //取得點擊產品id
            console.log(id);
            this.status.loadingItem = id;
            console.log(this.status.loadingItem)
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`;
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                console.log(res.data.data);
                this.tempProduct = res.data.data
                this.$set(this.tempProduct, 'num', 0);
                $('#productModal').modal('show');
                this.status.loadingItem = '';
            }).catch((error)=>{
                console.error(error);
            })

        },
        //加入購物車
        productDetailAddToCart(tempProduct){
            console.log(tempProduct);
            this.$parent.addToCart(tempProduct,tempProduct.num); //傳入父元件 觸發addToCart方法  tempProduct.num-->傳產品數量
        }
    }
})

//註冊 購物車 Modal
Vue.component('cartModal',{
    template:'#cartModal',
    props:{
        productId:'',
        status:{},
        uuid:'',
        apiPath:'', 
    },
    data() {
        return {
            cart: {
                
            },
            cartTotal: 0,
            
        }
    },
    created(){
        this.getCart();
         
    },
    methods:{
       getCart(){
        const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
        
        axios({
            method:'get',
            url:apiUrl
        }).then((res)=>{
            this.cart = res.data.data;
            console.log(this.cart.length);
            // 累加總金額 
            this.cartTotal = 0;
            this.cart.forEach( item => {
                this.cartTotal += item.product.price*item.quantity;
            });
            this.$emit('carts',this.cart); //把資料傳給父元件
            
          
        }).catch((error)=>{
            console.error(error);
        })
       },
       //更改數量
       quantityUpdata(id,num){
        const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`;

        const data = {
            product:id,
            quantity:num,
        };
        axios({
            method:'patch',
            url:apiUrl,
            data:data
        }).then((res)=>{
            this.getCart();
        }).catch((error)=>{
            console.error(error);
        })
       },
       //移除購物車產品
       removeCartItem(id){
        const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`;
        
        axios({
            method:'delete',
            url:apiUrl
        }).then((res)=>{
            this.getCart();
        }).catch((error)=>{
            console.error(error);
        })
       },
       //移除所有購物車產品
       removeAllCartItem(){
        const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`;
        axios({
            method:'delete',
            url:apiUrl
        }).then((res)=>{
            this.getCart();
        }).catch((error)=>{
            console.error(error);
        })
       },
            
    }
})


new Vue({
    el:'#app',
    data() {
        return {
            products:[], //產品資料
            tempProduct:{},
            status:{
                loadingItem: '',
            },
            form:{ //驗證表單資料
                name:'',
                email:'',
                tel:'',
                address:'',
                payment:'',
                message: ''
            },
            uuid:'7f7cf697-969f-4e45-83f9-01ea57ba8ea3',
            apiPath:'https://course-ec-api.hexschool.io',
            carts: {}, //購物車資料
            cartTotal: 0,
        }
    },
    created() {
        this.getProduct();
    },
    methods: {
        // 取得產品資料
        getProduct(page = 1){
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/products?page=${page}`;
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                // console.log(res.data.data);
                this.products = res.data.data
            }).catch((error)=>{
                console.error(error);
            })
        },
        //產品加入購物車
        addToCart(item,quantity = 1){
            console.log(item)
            this.status.loadingItem = item.id;
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
            const cart = {
                product:item.id,
                quantity,
            }
            console.log(cart)
            axios({
                method:'post',
                url:apiUrl,
                data:cart
            }).then((res)=>{
                this.status.loadingItem = '';
                $('#productModal').modal('hide');
                this.$refs.cartModal.getCart();
            }).catch((error) => {
                this.status.loadingItem = '';
                console.log(error.response.data.errors);
                $('#productModal').modal('hide');
            });
        },
        /*
        //取得單一產品細節資料(查看更多)
        getDetail(id){ //取得點擊產品id
            // console.log(id);
            this.status.loadingItem = id;
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`;
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                console.log(res.data.data);
                this.tempProduct = res.data.data
                $('#productModal').modal('show');
            }).catch((error)=>{
                console.error(error);
            })

        }*/
        // 開啟 浮出視窗
        openModal(isNew,product){
            // console.log(isNew,product)
            switch(isNew){
                case 'detail':
                    this.tempProduct = Object.assign({}, product); //淺層複製
                    // 使用 refs 觸發子元件方法
                    console.log(this.tempProduct)
                    this.$refs.productModal.getDetail(this.tempProduct.id); //把此商品id傳進getDetail function->抓取對應商品資訊
                    break
                case 'cart':
                    $('#cartModal').modal('show');
                    break
            }
        },
        updatedCarts(data){
            // console.log("有成功嗎????");
            // console.log(data);
            this.carts = data;
        }
        
    },
})