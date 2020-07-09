new Vue({
    el:'#app',
    data:{
        products:[
            {
                id:1254789235,
                title:'天橋立一日遊',
                category:'關西',
                content:'天橋立是跟宮城縣的松島、廣島的宮島一同被稱為日本三景的名勝地。',
                description:'天橋立該名稱是延綿約3.6公里的「沙嘴」、包含智恩寺境內的橋力附隨地、傘松公園在內的總稱﹐從傘松公園可以來個跨下觀景的景觀相當有名。此名也是取自有如指向天際般的地形而來。',
                imageUrl:'https://i.pinimg.com/564x/08/63/63/08636305d3758177753559ea01d04ebd.jpg',
                isEnabled: 1,
                originPrice:'1599',
                price:'999',
                unit:'NT$'
            },
            {
                id:1245789636,
                title:'富士山河口湖一日遊',
                category:'關東',
                content:'「河口湖」與山中湖、西湖、本栖湖及精進湖並稱為富士五湖。',
                description:'富士山河口湖一日遊，一天之內走遍富士山、河口湖、忍野八海、御殿場Outlet！2020 年期間限定河口湖櫻花會場、富士芝櫻會場，帶你從東京輕鬆出發',
                imageUrl:'https://cdn.pixabay.com/photo/2016/10/01/06/13/japan-1706942_960_720.jpg',
                isEnabled: 0,
                originPrice:'2599',
                price:'1710',
                unit:'NT$'
            },
        ],
        tempProduct: {}
    },
    methods: {
         // 建立 / 修改產品
         updateProduct(){
            if(this.tempProduct.id){   //修改產品
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    // console.log(item,i); //印出目前有的產品
                    if(item.id === id){  //當為此產品id時 (為了修改對應產品)
                        this.products[i] = this.tempProduct; //更新修改改資料
                    } 
                });
            }else{ //建立新產品
                // console.log("else:"+this.tempProduct.id); 
                const id = new Date().getTime(); //讓產品id的值，為唯一
                this.tempProduct.id = id;
                this.products.push(this.tempProduct); //建立新產品塞進this.tempProduct物件中
            }
            this.tempProduct = {};
            // console.log(tempProduct);
            $('#productModal').modal('hide');
        },
        
        //打開浮出視窗
        openModal(isNew,product){  //從@clike傳值       
            switch(isNew){ //利用isNew判斷式是哪個視窗
                case 'new':
                    this.tempProduct = {}
                    $('#productModal').modal('show');
                    // console.log(isNew,product);
                    break;
                case 'edit':
                    this.tempProduct = Object.assign({},product); //淺層複製
                    $('#productModal').modal('show');
                    // console.log(isNew,product);
                    break;
                case 'delete':
                    $('#delProductModal').modal('show');
                    this.tempProduct = Object.assign({},product);
                    // console.log(isNew,product);
                    break;
                default:
                    break;        
            }

        },
       
        //刪除商品
        delProduct(){
            if(this.tempProduct.id){ 
                const id = this.tempProduct.id;
                this.products.forEach((item,i) => {
                    if(item.id === id){ //當為此產品id時 (為了刪除對應產品)
                        this.products.splice(i,1);
                        this.tempProduct = {};
                    }
                //  console.log(this.tempProduct.id);   
                });
            }
            $('#delProductModal').modal('hide');
        },
    },
})