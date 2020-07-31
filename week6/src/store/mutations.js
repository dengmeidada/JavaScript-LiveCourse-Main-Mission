import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  // 更新購物車資料
  reCartDetail (state, data) {
    state.cartDetail = data
  },
  // 更新購物車總額
  upCartTotal (state, value) {
    state.upCartTotalVal = value
  }
}

export default mutations
