<template>
    <div class="msgModal">
        <b-modal id="modal-center" centered ref="msg-modal" title="訊息">
            <div class="d-block text-center">
                <h6>{{ msgTxt }}</h6>
            </div>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button size="sm" variant="secondary" @click="cancel()">關閉</b-button>
                <b-button v-if="isGoProducts" size="sm" variant="primary" @click="goProducts()">繼續購物</b-button>
            </template>

        </b-modal>
    </div>
</template>
<script>
export default {
  name: 'MsgModal',
  data () {
    return {
      msgTxt: '',
      isGoProducts: false // 繼續購物 button 開關
    }
  },
  methods: {
    // 結帳/加入購物車完成訊息
    orderComplete (type, msg) {
      // console.log(type)
      this.$refs['msg-modal'].show()
      switch (type) {
        case 'orderComplete':
          this.msgTxt = '恭喜你，已完成訂單。'
          this.isGoProducts = true
          break
        case 'AlreadyAddToCart':
          this.msgTxt = msg
          this.isGoProducts = false
          break
        case 'addToCartComplete' :
          this.msgTxt = '商品已成功加入購物車。'
          this.isGoProducts = false
          break
        default:
          break
      }
    },
    // 關閉訊息視窗
    hideModal () {
      this.$refs['msg-modal'].hide()
    },
    // 繼續購物前往產品頁面
    goProducts () {
      this.$router.push({ path: 'products' })
    }
  }
}
</script>
