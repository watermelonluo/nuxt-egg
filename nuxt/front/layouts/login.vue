<template>
    <div class="login">
        <nuxt/>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .login-icon{
        margin-left: 80px;
    }
    .login, .register{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;      
        .ruleForm {
           width: fit-content;
           margin: 0 auto;
           .el-form-item__content{
               width: auto;
           }
           .input {
                width: 300px;
            }
            .captcha {
                width: 150px;
            }   
            
            .btn-item{
                padding-top: 25px;
                .btn{
                    width: 150px;
                    padding-top: 15px;
                    padding-bottom: 15px;
                    border-radius: 30px;
                    font-size: 18px;
                    margin-left: 30px;
                    margin-right: 20px;
                } 
            }
        }
        
        
    }
</style>
