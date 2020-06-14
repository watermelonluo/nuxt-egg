<template>
    <div class="article-main">
        <UserMsg :user="article">
            <el-button class="followBtn" size="small" v-if="!isFollow" @click="follow">关注</el-button>
            <el-button class="followBtn" size="small" v-else type="success" @click="cancelFollow">已关注</el-button>
        </UserMsg>
        <el-divider></el-divider>
        <div class="article-con">
            <p v-html="article.content_html" class="text"></p>
            <h6><i style="font-size: 18px" class="el-icon-view"></i> {{article.views}}</h6>
        </div>
    </div>
</template>

<script>

import UserMsg from '~/components/UserMsg.vue'
export default {
    components:{
        UserMsg
    },
    data() {
        return {
            article:{
                title:'',
                content_html:'',
                views:1,
                author: {}
            },
            isFollow: false
        }
    },
    async mounted() {
        let {id}=this.$route.params;     
        this.id=id;
        this.getArticle()     
    },
    methods: {
        async follow(){
            let ret=await this.$http.put('/user/follow/'+this.article.author._id);
            this.checkFollowStatus()
        },
        async cancelFollow(){
            let ret=await this.$http.delete('/user/unfollow/'+this.article.author._id);
            this.checkFollowStatus()
        },
        async getArticle(){
            let ret=await this.$http.get('/article');         
            console.log(ret);
            if(ret.code==0){
                const retFilter=ret.data.filter(v=>v._id===this.id);
                console.log(retFilter);
                this.article=retFilter[0];
            }
            this.checkFollowStatus()
        },
        async checkFollowStatus(){
            let ret=await this.$http.get('/user/isfollow/'+this.article.author._id);
            console.log(ret);
            this.isFollow=ret.data.isFollow
        }
    },
    
}
</script>

<style lang="scss">
.article-con{
    
    .text{
        margin-bottom: 10px;
    }
    h6{
        font-size: 16px;

    }
}
.followBtn{
    float: right;
}
.article-main{
    margin: auto 80px;
background-color: #ffffff;
padding: 20px;
}
</style>
