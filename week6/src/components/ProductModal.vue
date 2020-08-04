<template>
    <div class="productModal">
        <b-modal ref="product-modal" hide-footer :title="tempProduct.title">
            <div class="d-block text-center">
                <img :src="tempProduct.imageUrl[0]" class="img-fluid" alt>
                    <blockquote class="blockquote mt-3">
                        <p class="mb-0" v-html="tempProduct.content"></p>
                        <footer class="blockquote-footer text-right">
                        {{ tempProduct.description }}
                        </footer>
                    </blockquote>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <span class="completed">
                            <span class="currencyIdentifier">原價 </span>
                            <span class="originPrice"> {{ tempProduct.origin_price }}</span>
                        </span>
                        <span class="priceItem">
                            <span class="currencyIdentifier">特價 </span>
                            <span class="price">{{  tempProduct.price }}&nbsp;</span>
                        </span>
                      </div>
                      <select v-model="tempProduct.num" name class="form-control mt-3">
                        <option value="0" disabled selected>
                          請選擇數量
                        </option>
                        <option v-for="num in 10" :key="num" :value="num">
                          選購 {{ num }} {{ tempProduct.unit }}
                        </option>
                      </select>
                    </div>
                     <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-sm ml-auto" @click="productDetailAddToCart(tempProduct)">加入購物車</button>
            </div>
        </b-modal>
        <!-- loading 套件 始 (放入子元件中) -->
          <loading :active.sync="isLoading"></loading>
        <!-- loading 套件 末 -->
    </div>
</template>
<script>
export default {
  name: 'ProductModal',
  data () {
    return {
      tempProduct: {
        imageUrl: []
      },
      isLoading: false
    }
  },
  methods: {
    // 千分位方法(因為productModal藉由click抓取id後才載入對應產品，無法使用filter方法，因此使用其法轉換 註:用filter方法無法出取其值，會出現undefined)
    priceFormat: function (value) {
      const intPart = value.toString() // 轉字串
      const intPartFormat = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return 'NT$ ' + intPartFormat
    },
    // 取得單一產品細節資料(查看更多)
    getDetail (id) { // 取得點擊產品id
      const apiUrl = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.axios({
        method: 'get',
        url: apiUrl
      }).then((res) => {
      // console.log(res.data.data)
        this.tempProduct = res.data.data
        this.$set(this.tempProduct, 'num', 0)

        // 使其值轉為千分為表示
        this.tempProduct.price = this.priceFormat(this.tempProduct.price)
        this.tempProduct.origin_price = this.priceFormat(this.tempProduct.origin_price)
        this.$refs['product-modal'].show()
      }).catch((error) => {
        console.error(error)
      })
    },
    // 加入購物車
    productDetailAddToCart (tempProduct) {
      console.log(tempProduct)
      this.$parent.addToCart(tempProduct, tempProduct.num) // 傳入父元件 觸發addToCart方法  tempProduct.num-->傳產品數量
    },
    closeProductCart () {
      this.$refs['product-modal'].hide()
    }

  }
}
</script>
