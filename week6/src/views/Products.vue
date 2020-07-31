<template>
    <div class="products">
        前台產品列表
        <div class="container">
            <div class="header">
              <h5 class="title text-center">所有產品</h5>
            </div>
            <!-- 產品列表開始 -->
            <div class="row mt-4">
              <div v-for="item in products" :key="item.id" class="col-md-4 mb-4">
                  <div class="card">
                      <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage: `url(${item.imageUrl})`}" @click="openModal('detail',item)"></div>
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
                      <button type="button" class="btn btn-outline-secondary btn-sm" @click="openModal('detail',item)">查看更多</button>
                      <button type="button" class="btn btn-primary btn-sm ml-auto" @click="addToCart(item)">加入購物車</button>
                  </div>
              </div>
            </div>
            <!-- 產品列表結束 -->
        </div>
        <!-- 產品詳情 Modal 顯現 (查看更多)-->
        <ProductModal ref="productModal" :uuid="uuid" :api-path="apiPath"></ProductModal>
        <!-- 訊息視窗 -->
        <MsgModal ref="msgModal"></MsgModal>
    </div>
</template>
<script>
import ProductModal from '../components/ProductModal'
import MsgModal from '../components/MsgModal'
export default {
  name: 'Products',
  props: {
    uuid: String,
    apiPath: String
  },
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
      errorMsg: '',
      isErrorMsg: false
    }
  },
  created () {
    // 在進入網頁時，事先取得產品資料
    this.getProduct()
  },
  mounted () {
  },
  methods: {
    // 取得產品資料
    getProduct (page = 1) {
      this.isLoading = true // 打開 Loading 效果 (等資料載入axios)
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/products?page=${page}`
      this.$http({
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
      // console.log(item)

      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`
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
        console.log(res)
        this.errorMsg = '' // 清掉錯誤訊息
        this.isErrorMsg = false
        this.$refs.productModal.closeProductCart()
        // $('#orderModal').modal('show')
        this.$refs.msgModal.orderComplete('addToCartComplete') // 開啟提示視窗

        // 重新渲染購物車
        this.$parent.reGetCart() // 先傳回父元件的方法，來渲染購物車
      }).catch((error) => {
        console.log(error.response.data.errors[0])
        this.errorMsg = error.response.data.errors[0]
        this.isErrorMsg = true
        this.$refs.productModal.closeProductCart()
        this.$refs.msgModal.orderComplete('AlreadyAddToCart', this.errorMsg) // 開啟提示視窗
        // $('#orderModal').modal('show')
      })
    },
    // 開啟 浮出視窗
    openModal (isNew, product) {
      // console.log(isNew, product)
      switch (isNew) {
        case 'detail': // 產品詳情
          this.tempProduct = JSON.parse(JSON.stringify(product)) // 深層複製
          // 使用 refs 觸發子元件方法
          this.$refs.productModal.getDetail(this.tempProduct.id) // 把此商品id傳進getDetail function->抓取對應商品資訊
          break
        // case 'cart': // 購物車
        //   if (!this.isCart) {
        //     this.isCart = true
        //     // 開啟購物車
        //     // console.log('1111:' + this.isCart)
        //     this.$refs.cartModal.openCartModal()
        //   } else {
        //     // console.log('2222' + this.isCart)
        //   }
        //   break
        default:
          break
      }
    },
    // 更新 接收資料(子傳父元件)
    updatedCarts (data) {
      // console.log(data);
      this.carts = data
      this.$emit('homeCart', this.carts) // 把資料傳入home頁面()
    }
  }
}
</script>
<style lang="scss">

</style>
