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

// 掛載 Vue-Loading 套件
Vue.use(VueLoading);


// 全域 filter 千分位 註:在productModal無法使用，value會出現 undefined
Vue.filter('priceThousands',(value)=>{
    // console.log(value)
    const intPart = value.toString().split('.');
    intPart[0] = intPart[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return 'NT$' + intPart.join('.');
})


// 註冊全域元件
//將 VeeValidate input驗證工具載入
Vue.component('ValidationProvider',VeeValidate.ValidationProvider);
//將 VeeValidate 完整表單驗證工具載入
Vue.component('ValidationObserver',VeeValidate.ValidationObserver);
//將 VueLoading 載入 並標籤設定為 loading
Vue.component('loading', VueLoading);

//註冊 產品詳情 Modal
Vue.component('productModal',{
    template:'#productModal',
    props:{
        productId:'',
        uuid:'',
        apiPath:''        
    },
    data() {
        return {
            tempProduct:{
                imageUrl:[]
            },
            isLoading:false
        }
    },
    methods:{
        //千分位方法(因為productModal藉由click抓取id後才載入對應產品，無法使用filter方法，因此使用其法轉換 註:用filter方法無法出取其值，會出現undefined)
        priceFormat:function(value){
            const intPart = value.toString()  //轉字串
            const intPartFormat = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return  'NT$ ' + intPartFormat;
        },
        //取得單一產品細節資料(查看更多)
        getDetail(id){ //取得點擊產品id
            console.log(id);

            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`;
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                console.log(res.data.data);
                this.tempProduct = res.data.data
                this.$set(this.tempProduct, 'num', 0);

                //使其值轉為千分為表示
                this.tempProduct.price = this.priceFormat(this.tempProduct.price);
                this.tempProduct.origin_price = this.priceFormat(this.tempProduct.origin_price);

                $('#productModal').modal('show');

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

//註冊 購物車(購物清單) Modal
Vue.component('cartModal',{
    template:'#cartModal',
    props:{
        productId:'',
        uuid:'',
        apiPath:'', 
        isCart:false,
    },
    data() {
        return {
            cart: { //選購產品 / 購物車清單
                
            },
            cartTotal: 0,//產品總計
            isCartComponent:false, //為了動態傳遞購物車視窗開關而設
            isLoading:false //loading開關
        }
    },
    created(){
        // 在進入網頁時，事先取得購物資料
        this.getCart();
    },    
    methods:{
        // 取得購物資訊
        getCart(){
            this.isLoading = true;

            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
            
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                this.cart = res.data.data;
                // console.log(this.cart.length);
                // 累加總金額 
                this.cartTotal = 0;
                this.cart.forEach( item => {
                    this.cartTotal += item.product.price*item.quantity;
                });
                this.$emit('carts',this.cart); //把資料傳給父元件
                this.isLoading = false;
            
            }).catch((error)=>{
                console.error(error);
            })
        },
        //更改數量
        quantityUpdata(id,num){
            this.isLoading = true;

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
                this.isLoading = false;
                this.getCart();
            }).catch((error)=>{
                console.error(error);
            })
        },
        //移除購物車產品
        removeCartItem(id){
            this.isLoading = true;
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`;
        
            axios({
                method:'delete',
                url:apiUrl
            }).then((res)=>{
                this.isLoading = false;
                this.getCart();
            }).catch((error)=>{
                console.error(error);
            })
        },
        //移除所有購物車產品
        removeAllCartItem(){
        this.isLoading = true;
        const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`;
        axios({
            method:'delete',
            url:apiUrl
        }).then((res)=>{
            this.isLoading = false;
            this.getCart();
        }).catch((error)=>{
            console.error(error);
        })
        },
        //前往產品訂單頁面    
        goOrder(){
        window.location.href = './order.html';
        },
        //開起購物車視窗
        openCartModal(){
            $('.cartMenu').show();
        },
        //關閉購物車視窗
        closeCart(){
            $('.cartMenu').hide();
            this.isCartComponent = false;
            this.$emit('update:isCart', this.isCartComponent); //把視窗開關傳回父元件(才能因此動態變更開關)
        }
            
    }
})

//註冊 產品詳情 Modal
Vue.component('orderModal',{
    template:'#orderModal',
    props:{
        productId:'',
        uuid:'',
        apiPath:''        
    },
    data() {
        return {
            tempProduct:{
                imageUrl:[]
            },

            isLoading: false, // Loading 開關
        }
    },  
    methods:{
       
    }
})

new Vue({
    el:'#app',
    data() {
        return {
            products:[], //產品資料
            tempProduct:{},
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
            isCart:false, // 購物車視窗開關
            isLoading: false, // Loading 開關
        }
    },
    created() {
        // 在進入網頁時，事先取得產品資料
        this.getProduct();
    },
    methods: {
        // 取得產品資料
        getProduct(page = 1){
            this.isLoading = true; //打開 Loading 效果 (等資料載入axios)
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/products?page=${page}`;
            axios({
                method:'get',
                url:apiUrl
            }).then((res)=>{
                // console.log(res.data.data);
                this.products = res.data.data;
                this.isLoading = false; //資料載完關閉
            }).catch((error)=>{
                console.error(error);
            })
        },
        //產品加入購物車
        addToCart(item,quantity = 1){
            // console.log(item)

            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`;
            const cart = {
                product:item.id,
                quantity,
            }
            // console.log(cart)
            axios({
                method:'post',
                url:apiUrl,
                data:cart
            }).then((res)=>{
                $('#productModal').modal('hide');

                // 重新渲染購物車
                this.$refs.cartModal.getCart();
            }).catch((error) => {

                console.log(error.response.data.errors);
                $('#productModal').modal('hide');
            });
        },
        // 開啟 浮出視窗
        openModal(isNew,product){
            console.log(isNew,product)
            switch(isNew){
                case 'detail':  //產品詳情
                    this.tempProduct = JSON.parse(JSON.stringify( product)); //淺層複製
                    // 使用 refs 觸發子元件方法
                    this.$refs.productModal.getDetail(this.tempProduct.id); //把此商品id傳進getDetail function->抓取對應商品資訊
                    break
                case 'cart': //購物車
                    if(!this.isCart){ 
                        this.isCart = true;
                         //開啟購物車
                        console.log('1111:'+this.isCart)
                        this.$refs.cartModal.openCartModal();
                        
                    }else{
                        console.log("2222"+this.isCart)
                    }
                    
                    break
                default:
                    break;  
            }
        },
        //更新 接收資料(子傳父元件)
        updatedCarts(data){
            // console.log(data);
            this.carts = data;
        },
        //建立訂單
        createOrder(){
            const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/orders`;
            axios({
                method:'post',
                url:apiUrl,
                data:this.form
            }).then((res)=>{
                console.log(res);
                if(res.data.data){
                    // 跳出提示訊息
                    $('#orderModal').modal('show');

                    // 重新渲染購物車
                    this.$refs.cartModal.getCart();
                }
            }).catch((error)=>{
                console.error(error);
            })
        }
        
        
    },
})