<template>
    <div class="checkout container">
        結帳
        <CartModal :uuid="uuid" :api-path="apiPath" :isCheckout="isCheckout"></CartModal>
      <!--訂單頁面 表單驗證 Modal 開始-->
        <div class="my-5 row justify-content-center" >
            <h5 class="title">訂單資訊</h5>
            <validation-observer v-slot="{ invalid }" class="col-md-6">
                <form @submit.prevent="createOrder">
                    <div class="form-group">
                        <!--validation-provider input驗證 -->
                        <!--  rules :驗證規則 v-slot: 回傳內容 classes -->
                        <validation-provider rules = "required" v-slot="{errors,classes}" >
                            <label for="username">收件人姓名</label>
                            <input id="username" class="form-control" v-model="form.name" type="text" :class="classes">
                            <!-- :class="classes" 動態綁定 className。 在all.js中設定成功失敗樣式 -->
                            <!-- 當驗證錯誤時，會跑出錯誤訊息errors[0]text-danger 為 顯示的錯誤顏色-->
                            <span v-if="errors[0]"  class="text-danger">{{errors[0]}}</span>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules = "required|email" v-slot="{errors,classes}" >
                            <label for="email">電子信箱</label>
                            <input id="email" class="form-control" v-model="form.email" type="text" :class="classes">
                            <span v-if="errors[0]"  class="text-danger">{{errors[0]}}</span>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules = "required|min:8" v-slot="{errors,classes}" >
                            <label for="tel">電話</label>
                            <input id="tel" class="form-control" v-model="form.tel" type="text" :class="classes">
                            <span v-if="errors[0]"  class="text-danger">{{errors[0]}}</span>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules = "required" v-slot="{errors,classes}" >
                            <label for="address">地址</label>
                            <input id="address" class="form-control" v-model="form.address" type="text" :class="classes">
                            <span v-if="errors[0]"  class="text-danger">{{errors[0]}}</span>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <validation-provider rules = "required" v-slot="{errors,classes}" >
                        <label for="payment">付款方式</label>
                            <select id="payment" v-model="form.payment" class="form-control" required :class="classes">
                                <option value="" disabled>
                                請選擇付款方式
                                </option>
                                <option value="WebATM">
                                WebATM
                                </option>
                                <option value="ATM">
                                ATM
                                </option>
                                <option value="CVS">
                                CVS
                                </option>
                                <option value="Barcode">
                                Barcode
                                </option>
                                <option value="Credit">
                                Credit
                                </option>
                                <option value="ApplePay">
                                ApplePay
                                </option>
                                <option value="GooglePay">
                                GooglePay
                                </option>
                            </select>
                            <span v-if="errors[0]"  class="text-danger">{{errors[0]}}</span>
                        </validation-provider>
                    </div>
                    <div class="form-group">
                        <label for="message">留言</label>
                        <textarea id="message" v-model="form.message" class="form-control" cols="30" rows="3">
                    </textarea>
                    </div>
                    <div class="text-right">
                        <button type="submit" class="btn btn-primary" :disabled="invalid">送出</button>
                    </div>
                </form>
            </validation-observer>
        </div>
        <!--訂單頁面 表單驗證 Modal 結束-->
    </div>

</template>
<script>
import CartModal from '../components/CartModal'
export default {
  name: 'Checkout',
  components: {
    CartModal
  },
  props: {
    uuid: String,
    apiPath: String
  },
  data () {
    return {
      isCheckout: true // 結帳頁面開關
    }
  }
}
</script>
