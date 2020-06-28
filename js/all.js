var obj = {
    data:{
        uuid:'7f7cf697-969f-4e45-83f9-01ea57ba8ea3',
        product:[]
    },
    getData:function(){
      
        var vm = this;
        const url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;

        axios({
          method: 'get',
          url:url
        })
        .then((res)=>{
          vm.data.products = res.data.data;
          console.log(vm.data.products);
          vm.render()
        })
        .catch((error)=>{
          console.log(error);
        })
        
    },
    render:function(){
      const app = document.querySelector('#app');
      const products = this.data.products;
      let str = '';
      products.forEach((item) => {
        str +=`
                <div class="card">
                  <div class="figure figure-img">
                     <img src="${ item.imageUrl[0] }" class="card-img-top">
                  </div>
                  <div class="card-body">
                    
                    <h5 class="card-title">${ item.title }</h5>
                    <span>
                      <span class="priceItem">
                        <span class="currencyIdentifier">${item.unit}</span>
                        <span class="price">${ item.price }&nbsp;</span>
                      </span>
                      <span class="completed">
                        <span class="currencyIdentifier">${item.unit}</span>
                        <span class="originPrice">${ item.origin_price }</span>
                      </span>
                    </span>
                    <a href="#" class="btn btn-primary" style="display: block;margin:10px auto;">加入購物車</a>
                  </div>
                </div>
        `
      });
      app.innerHTML = str;
    }
    
}
obj.getData();
/*
//取得 新增 修改 刪除 區
document.querySelector('#get').addEventListener('click', getData);
document.querySelector('#post').addEventListener('click', postData);
document.querySelector('#patch').addEventListener('click', patchData);
document.querySelector('#delete').addEventListener('click', deleteData);


const uuid = '7f7cf697-969f-4e45-83f9-01ea57ba8ea3';
const token = 'spfCqxMKPFmkWGK7ZAbjn7ySOPtyKSwqzUc0666eMmcde2i5UeuyYFf8NZAv';
const apiPath = 'https://course-ec-api.hexschool.io/';

axios.defaults.headers['Authorization'] = `Bearer ${token}`
// // axios 設定說明：https://github.com/axios/axios#config-defaults

function getData() {
  console.log('getData');
  const api = `${apiPath}api/${uuid}/admin/ec/products`
  console.log(api)

  axios.get(api)
  .then((res)=>{
    console.log(res);
  })
  .catch((error)=>{
    console.log(error);
  })
  
}

function postData() {
  console.log('postData');
  const api = `${apiPath}api/${uuid}/admin/ec/product`
  console.log(api);
  const data = {
    title: '米家掃拖機器人 1C',
    category: '智慧家庭',
    content: '看得見，才能掃得更乾淨',
    description:'視覺動態 地圖構建 智慧電控水箱 2500Pa超大吸力',
    imageUrl: [
      'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1575628226.04811673.png?width=300&height=300'
    ],
    enabled: true,
    origin_price: 6595,
    price: 6195,
    unit: 'NT$',
  }
  axios.post(api,data)
  .then((res)=>{
    console.log(res);
  })
  .catch((error)=>{
    console.log(error);
  })
  
}

function patchData() {
  console.log('patchData');
  let id = 'QDyFbKjkernSxW67LQpcD21EUr5jInSaEEnpiB2fDjUolGtA2TBnVa79QwrFbiXJ';
  const api = `${apiPath}api/${uuid}/admin/ec/product/${id}`
  console.log(api);
  const data = {
    title: '米家掃拖機器人 1C',
    category: '智慧家庭',
    content: '看得見，才能掃得更乾淨',
    description:'視覺動態 地圖構建 智慧電控水箱 2500Pa超大吸力',
    imageUrl: [
      'https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1575628226.04811673.png?width=300&height=300'
    ],
    enabled: true,
    origin_price: 6595,
    price: 6195,
    unit: 'NT$',
  }
  axios.patch(api,data)
  .then((res)=>{
    console.log(res);
  })
  .catch((error)=>{
    console.log(error);
  })
  
}

function deleteData() {
  console.log('deleteData');
  let id = 'EZ0INj2FWXoelyAev8Jgky33y9llVOgBOXx4A94aQtWXCgw5Ld8duZLqSVN53kcI';
  const api = `${apiPath}api/${uuid}/admin/ec/product/${id}`
  console.log(api);
  axios.delete(api)
  .then((res)=>{
    console.log(res);
  })
  .catch((error)=>{
    console.log(error);
  })
  
}
*/