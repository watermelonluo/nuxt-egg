<template>
    <div>
        <el-row>
            <el-col :span="12">
                <textarea :value="content" class="md-editor" @input="textUpdate" name="" id="" cols="30" rows="10"></textarea>
            </el-col>
            <el-col :span="12">
                <div class="md-body" v-html="compiledHTML"></div>
            </el-col>
        </el-row>
        <el-row style="padding-top: 50px;text-align: center">
            <el-button type="primary" @click="submitArticle">发布</el-button>
        </el-row>
    </div>
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'
console.log(marked);

export default {
    layout: 'default',
    data() {
        return {
            content: 'this is a nuxt'
        }
    },
    methods: {
        textUpdate: debounce(function(e){
            this.content=e.target.value
        },150),
        async submitArticle(){
            let ret= await this.$http.post('/article/create',{content:this.content});
            if(ret.code==0){
                this.$notify({
                    type: 'success',
                    message: '创建成功'
                })
                setTimeout(() => {
                    this.$router.push({path: '/article/'+ret.data.id})
                }, 1000);
            }else{
                this.$notify({
                    type: 'warning',
                    message: '创建失败'
                })
            }
        }
    },
    computed: {
        compiledHTML(){
            return marked(this.content)
        }
    },
    
}
</script>

<style>
.md-editor{
    outline: none;
    width: 100%;
    height: 50vh;
}
.md-body{
    width: 100%;
    height: 50vh;
    border-bottom: 1px solid #eee;
}
</style>
