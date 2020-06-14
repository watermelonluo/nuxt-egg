<template>
    <div class="article-item">
        <nuxt-link :to="'/article/'+article._id">
            <h3>{{article.title}}</h3>
        </nuxt-link>
        <div>
            <UserMsg :user="article" style="padding: 15px 0;"></UserMsg>
            <p>
                <span style="margin-right: 20px"><i style="font-size: 18px" class="el-icon-view"></i> {{article.views}}</span>
                <span><i style="font-size: 18px" class="el-icon-thumb"></i> {{article.like}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import UserMsg from './UserMsg.vue'
export default {
    components:{
        UserMsg
    },
    props: ['article'],
    data() {
        return {
            user: {}
        }
    }
    
}
</script>

<style lang="scss">
.article-item{
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 20px;
    p{
        span: {
            
        }
    }
}
</style>
