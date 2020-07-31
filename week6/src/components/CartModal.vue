<template>
    <div class="cartModal">
        <div  class="cartbox">
        <!-- 購物清單 始 -->
            <div class="content" v-if="isCheckout">
                <div class="header">
                    <h5 class="title text-center">購物清單</h5>
                </div>
                <div class="body">
                    <div class="cart-menu">
                        <!-- <span class="text-left mb-3">
                        </span> -->
                        <div class="d-flex mb-3">
                            <div class="col-6">
                                <span class="text-left">目前有共 {{cart.length}} 件 商品</span>
                            </div>

                            <div class="col-6 text-right">
                                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem()">
                                <font-awesome-icon :icon="['far','trash-alt']" />刪除所有品項
                                </button>
                            </div>
                        </div>

                    <table class="table">
                        <thead>
                            <th>刪除</th>
                            <th>品名</th>
                            <th width="150px">
                            數量
                            </th>
                            <th>單位</th>
                            <th>單價</th>
                        </thead>
                        <tbody v-if="this.$store.state.cartDetail.length">
                            <tr v-for="item in this.$store.state.cartDetail" :key="item.id">
                            <td class="align-middle">
                                <!-- 移除購物車產品 -->
                                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.product.id)">
                                <font-awesome-icon :icon="['far','trash-alt']" />
                                </button>
                            </td>
                            <td class="align-middle">
                                {{ item.product.title }}
                            </td>
                            <td class="align-middle">
                                <div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary"
                                    @click="quantityUpdata(item.product.id, item.quantity ,'add')">
                                    +
                                    </button>
                                </div>
                                <input id="inlineFormInputGroupUsername" type="text" class="form-control text-center"
                                    :value="item.quantity" @keyup.enter="quantityUpdata(item.product.id, $event.target.value)">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-primary"
                                    @click="quantityUpdata(item.product.id, item.quantity ,'minus')" :disabled="item.quantity === 1  ? '' : disabled">
                                    -
                                    </button>
                                </div>
                                </div>
                            </td>
                            <td class="align-middle">
                                {{ item.product.unit }}
                            </td>
                            <td class="align-middle text-right">
                                    {{ item.product.price | moneyFormat }}
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        </div>
                        <div class="text-right">
                        <span colspan="4" class="text-right">
                            總計
                        </span>
                        <span class="text-right">
                                {{ this.$store.state.upCartTotalVal | moneyFormat }}
                        </span>
                    </div>
                </div>
            </div>
        <!-- 購物清單 末 -->

        <!-- 購物車 始 -->
        <!-- {{ isCart }} -->
            <div v-if="isCart" :class="{ cartMenu:isCart }" ref="cart-menu">
                <!-- <div class="overlay" @click="closeCart"></div> -->
                <div  class="dialog-centered cartModalItem" role="document">
                    <div class="content">
                        <div class="card-header p-3">
                        <span class="title">已選購商品</span>
                        <button type="button" class="close" aria-label="Close" @click="closeCart">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body p-3">
                            <div class="cart-menu-scroll">
                                <div class="text-right mb-3">
                                    <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem()">
                                    <font-awesome-icon :icon="['far','trash-alt']" />刪除所有品項
                                    </button>
                                </div>

                                <table class="table-sm">
                                <tbody v-if="this.$store.state.cartDetail.length">
                                    <tr v-for="item in this.$store.state.cartDetail" :key="item.id">
                                    <td class="align-middle">
                                        <!-- 移除購物車產品 -->
                                        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.product.id)">
                                        <font-awesome-icon :icon="['far','trash-alt']" />
                                        </button>
                                    </td>
                                    <td class="align-middle "><div class="cart-img mt-2" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div></td>
                                    <td class="align-middle">
                                        <span>{{ item.product.title }}</span>
                                        <p>x {{item.quantity}} / {{ item.product.unit }}</p>
                                    </td>
                                    <td class="align-middle text-right">
                                        {{ item.product.price | moneyFormat }}
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            <div class="text-right">
                                <span colspan="4" class="text-right">
                                    總計
                                </span>
                                <span class="text-right">
                                    {{ this.$store.state.upCartTotalVal | moneyFormat }}
                                </span>
                            </div>
                        </div>
                        <div class="card-footer text-right p-2">
                            <button type="button" class="btn btn-secondary btn-sm m-1" @click="closeCart">取消</button>
                            <button type="button" class="btn btn-primary btn-sm m-1" @click="goOrder">結帳</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="test">

        </div>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex' // 使用vuex
export default {
  name: 'CartModal',
  props: {
    productId: String,
    uuid: String,
    apiPath: String,
    isCart: Boolean,
    isCheckout: Boolean, // 結帳頁面開關
    disabled: Boolean
  },
  data () {
    return {
      cart: { // 選購產品 / 購物車清單

      },
      cartTotal: 0, // 產品總計
      isCartComponent: false, // 為了動態傳遞購物車視窗開關而設
      isLoading: false // loading開關

    }
  },
  created () {
    // 在進入網頁時，事先取得購物資料
    this.getCart()
    // return this.get_reCartDetail// 使用vuex get 取得
  },
  // computed: {
  //   ...mapGetters(['get_reCartDetail']) // 使用vuex get 取得
  // },
  methods: {
    // 取得購物資訊
    getCart () {
      this.isLoading = true
      console.log('這??')
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`

      this.axios({
        method: 'get',
        url: apiUrl
      }).then((res) => {
        this.cart = res.data.data
        // console.log(this.cart.length);
        console.log('這裡是取購物資料')

        // 累加總金額
        this.cartTotal = 0
        this.cart.forEach(item => {
          this.cartTotal += item.product.price * item.quantity
        })

        // 把資料傳到Vuex
        this.$store.commit('reCartDetail', this.cart) // 購物車產品資料
        this.$store.commit('upCartTotal', this.cartTotal) // 產品總資料

        // this.$emit('carts', this.cart) // 把資料傳給父元件
        // 重新渲染購物車
        this.isLoading = false
        console.log('還是這??')
      }).catch((error) => {
        console.error(error)
      })
    },
    // 更改數量
    quantityUpdata (id, num, type) {
      this.isLoading = true
      switch (type) {
        case 'add':
          num += 1
          break
        case 'minus':
          if (num > 1) {
            num -= 1
          }
          break
      }
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping`

      const data = {
        product: id,
        quantity: num
      }
      this.axios({
        method: 'patch',
        url: apiUrl,
        data: data
      }).then((res) => {
        this.isLoading = false
        this.getCart()
        // this.$parent.reGetCart() // 傳給父元件方法(Checkout.vue)
      }).catch((error) => {
        console.error(error)
      })
    },
    // 移除購物車產品
    removeCartItem (id) {
      this.isLoading = true
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/${id}`

      this.axios({
        method: 'delete',
        url: apiUrl
      }).then((res) => {
        this.isLoading = false
        this.getCart()
        // this.$parent.reGetCart() // 傳給父元件方法(Checkout.vue)
      }).catch((error) => {
        console.error(error)
      })
    },
    // 移除所有購物車產品
    removeAllCartItem () {
      this.isLoading = true
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/shopping/all/product`
      this.axios({
        method: 'delete',
        url: apiUrl
      }).then((res) => {
        this.isLoading = false
        this.getCart()
        // this.$parent.reGetCart() // 傳給父元件方法(Checkout.vue)
      }).catch((error) => {
        console.error(error)
      })
    },
    // 前往產品訂單頁面
    goOrder () {
      this.$router.push({ path: 'checkout' }) // 前往結帳頁面
      this.isCartComponent = false
      this.$emit('update:isCart', this.isCartComponent) // 關閉購物車
    },
    // 關閉購物車視窗
    closeCart () {
      this.isCartComponent = false
      this.$emit('update:isCart', this.isCartComponent) // 把視窗開關傳回父元件(才能因此動態變更開關)
    }

  }
}
</script>
