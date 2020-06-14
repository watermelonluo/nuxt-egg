import Vue from 'vue'
import axios from 'axios'
import {MessageBox} from 'element-ui'

let http=axios.create({
    timeout: 5000,
    baseURL: '/api'
})

export default ({store,redirect})=>{
    http.interceptors.request.use(
        config=>{
            const token=localStorage.getItem('token');
            if (token) {
                console.log(token);
                
                config.headers.common['Authorization']='Bearer '+token
            }
            return config
        },
        err=>{
            return Promise.reject(err)
        }
    )
    http.interceptors.response.use(
        async res=>{
            let { data } = res;
            if(data.code==0){
                
            }else if(data.code==-666){
                MessageBox.confirm('登录过期','提示',{
                    confirmButtonText: '登陆',
                    showCancelButton: false,
                    type: 'warning'
                }).then(()=>{
                    localStorage.removeItem('token');
                    redirect({path: '/login'})
                })
            }
            return data
        }
    )
}

Vue.prototype.$http=http;
export const $$http = http 