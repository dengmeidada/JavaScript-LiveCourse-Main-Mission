const uuid = '7f7cf697-969f-4e45-83f9-01ea57ba8ea3';
const apiPath = 'https://course-ec-api.hexschool.io/api/';

new Vue({
    el:'#app',
    data() {
        return {
            user:{
                email:'',
                password:'',
            },
            token:''
        };
    },
    methods: {
        signin(){
            const api = `${apiPath}auth/login`;
            axios.post(api,this.user)
            .then((res)=>{
                console.log(res);
                const token = res.data.token;
                const expired = res.data.expired;
                document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
                window.location = 'Products.html';
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        // signin() {
        //     const api = `https://course-ec-api.hexschool.io/api/auth/login`;
        //     axios.post(api, this.user).then((response) => {
        //       const token = response.data.token;
        //       const expired = response.data.expired;
        //       // 寫入 cookie token
        //       // expires 設置有效時間
        //       document.cookie =`token=${token};expires=${new Date(expired * 1000)}; path=/`;
        //       window.location = 'Products.html';
        //     }).catch((error) => {
        //       console.log(error);
        //     });
        //   },
        
    },
}) 