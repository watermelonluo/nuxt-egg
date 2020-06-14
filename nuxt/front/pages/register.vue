<template>
    <div class="register">
        <div style="text-align: center;">
            <svg t="1591030660676" class="login-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3888" width="200" height="200">
             <path d="M345.571263 833.671188H58.436267L431.36782 190.3104l372.969349 643.360788h-285.283" fill="#41B883" p-id="3889"></path><path d="M767.675204 833.671188H965.536427L642.004036 277.580995 321.306334 833.671188h197.861222" fill="#328170" p-id="3890"></path><path d="M650.167938 833.671188h145.740759L557.56813 424.07767 321.306334 833.671188h145.740759" fill="#35495E" p-id="3891"></path></svg>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="邮箱" prop="email">               
                <el-input v-model="ruleForm.email" class="input"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="nickname">               
                <el-input v-model="ruleForm.nickname" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">               
                <el-input type="password" v-model="ruleForm.password" class="input"></el-input>
            </el-form-item>
             <el-form-item label="确认密码" prop="repassword">
                <el-input type="password" class="input" v-model="ruleForm.repassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
                
                <el-input v-model="ruleForm.captcha" class="captcha">                  
                </el-input>
                <div class="sendcode">
                    <img @click="resetCaptcha" :src="captchaUrl" alt="" srcset="">
                </div>
            </el-form-item>
            <el-form-item  class="btn-item">
                <el-button round class="btn"
                 type="success" @click.native.prevent="submitRegister('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import md5 from 'md5'
export default {
    layout: 'login',

    data() {
        return {
            ruleForm: {
                nickname: '',
                captcha: '',  
                password: '',
                repassword: '',
                email:''       
            },
            rules: {
                email: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                repassword: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                               
            },
            captchaUrl: '/api/user/captcha'     
        }
    },
    methods: {
        resetCaptcha(){
            this.captchaUrl='/api/user/captcha?_t='+new Date().getTime();
        },
        submitRegister(){
            this.$refs.ruleForm.validate(async valid=>{
                if(valid){
                    let obj={
                        email:this.ruleForm.email,
                        nickname: this.ruleForm.nickname,
                        captcha: this.ruleForm.captcha,
                        password: md5(this.ruleForm.password)
                    }
                    let ret=await this.$http.post('/user/register', obj)
                    console.log(ret);
                    if(ret.code==0){
                        this.$alert('注册成功', '提示', {
                            confirmButtonText: '去登录',
                            callback: action => {
                                this.$router.push({path: '/login'})
                            }
                        });                      
                    }
                    if(ret.code==-6){
                        this.$notify({
                            title: '注册失败'+ret.message,
                            type: 'warning'
                        })                  
                    }
                }
            })
            
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .sendcode {
        display: inline-block;
        margin-left: 30px;  
        vertical-align: -webkit-baseline-middle;  
        img:hover{
            cursor: pointer;
        }  
    }
    
    
</style>


