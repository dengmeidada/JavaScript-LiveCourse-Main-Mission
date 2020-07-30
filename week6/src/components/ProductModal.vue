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
    </div>
</template>
<script>
export default {
  name: 'ProductModal',
  props: {
    productId: String,
    uuid: String,
    apiPath: String
  },
  data () {
    return {
      tempProduct: {
        imageUrl: []
      },
      isLoading: false
    }
  },
  methods: {
    // 取得單一產品細節資料(查看更多)
    getDetail (id) { // 取得點擊產品id
      console.log(id)
      const apiUrl = `${this.apiPath}/api/${this.uuid}/ec/product/${id}`
      this.axios({
        method: 'get',
        url: apiUrl
      }).then((res) => {
        console.log(res.data.data)
        this.tempProduct = res.data.data
        this.$set(this.tempProduct, 'num', 0)

        // 使其值轉為千分為表示
        // this.tempProduct.price = this.priceFormat(this.tempProduct.price)
        // this.tempProduct.origin_price = this.priceFormat(this.tempProduct.origin_price)

        // this.$('#productModal').modal('show')
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
