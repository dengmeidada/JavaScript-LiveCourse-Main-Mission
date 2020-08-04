<template>
    <div class="products">
      <!-- loading 套件 始 -->
       <loading :active.sync="isLoading"></loading>
       <!-- loading 套件 末 -->
        前台產品列表
        <div class="container">
            <div class="header">
              <h5 class="title text-center">所有產品</h5>
            </div>
            <!-- 產品列表開始 -->
            <div class="row mt-4">
              <div v-for="item in products" :key="item.id" class="col-md-4 mb-4">
                  <div class="card">
                      <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}" @click="openModal(item)"></div>
                  </div>
                  <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                      <h5 class="card-title">{{ item.title }}</h5>
                      <span class="priceItem">
                          <span class="price">{{ item.price | moneyFormat }}&nbsp;</span>
                      </span>
                      <span class="completed">
                          <span class="originPrice">{{ item.origin_price | moneyFormat }}</span>
                      </span>
                  </div>
                  <div class="card-footer d-flex">
                      <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal(item)">查看更多</button>
                      <button type="button" class="btn btn-primary btn-sm ml-auto" @click="addToCart(item)">加入購物車</button>
                  </div>
              </div>
            </div>
            <!-- 產品列表結束 -->
        </div>
        <!-- 產品詳情 Modal 顯現 (查看更多)-->
        <ProductModal ref="productModal"></ProductModal>
        <!-- 訊息視窗 -->
        <MsgModal ref="msgModal"></MsgModal>
    </div>
</template>
<script>
import ProductModal from '../components/ProductModal'
import MsgModal from '../components/MsgModal'
export default {
  name: 'Products',
  components: {
    ProductModal,
    MsgModal
  },
  data () {
    return {
      products: [], // 產品資料
      tempProduct: {},
      form: { // 驗證表單資料
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
      carts: {}, // 購物車資料
      cartTotal: 0,
      isCart: false, // 購物車視窗開關
      isLoading: false, // Loading 開關
      errorMsg: ''
    }
  },
  created () {
    // 在進入網頁時，事先取得產品資料
    this.getProduct()
  },
  methods: {
    // 取得產品資料
    getProduct (page = 1) {
      this.isLoading = true // 打開 Loading 效果 (等資料載入axios)
      const apiUrl = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`
      this.axios({
        method: 'get',
        url: apiUrl
      }).then((res) => {
        // console.log(res.data.data);
        this.products = res.data.data
        this.isLoading = false // 資料載完關閉
      }).catch((error) => {
        console.error(error)
      })
    },
    // 產品加入購物車
    addToCart (item, quantity = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      // console.log(cart)
      this.axios({
        method: 'post',
        url: apiUrl,
        data: cart
      }).then((res) => {
        this.errorMsg = '' // 清掉錯誤訊息
        this.$refs.productModal.closeProductCart()

        const addCaertSuccess = 'addCaertSuccess'// 加入購物車成功提示 開啟
        // 重新渲染購物車
        this.$parent.reGetCart(addCaertSuccess)
      }).catch((error) => {
        // console.log(error.response.data.errors[0])
        this.errorMsg = error.response.data.errors[0]
        this.$refs.productModal.closeProductCart()

        this.$refs.msgModal.orderComplete('AlreadyAddToCart', this.errorMsg) // 開啟提示視窗
      })
    },
    // 開啟 浮出視窗
    openModal (product) {
      this.tempProduct = JSON.parse(JSON.stringify(product)) // 深層複製
      // 使用 refs 觸發子元件方法
      this.$refs.productModal.getDetail(this.tempProduct.id) // 把此商品
    }
  }
}
</script>
