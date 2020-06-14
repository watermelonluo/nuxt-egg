<template>
    <div class="user-msg">
        <nuxt-link :to="url">
            <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>           
            <span style="margin-left: 15px">{{user.author.nickname}}</span>
        </nuxt-link>
        <slot></slot>
    </div>
    
</template>

<script>
export default {
    props: ['user'],
    computed: {
        url(){
            //console.log(this.user,this.user.id,this.user._id);
            
            return '/user/' + this.user.author._id
        }
    },
}
</script>

<style lang="scss" scoped>
   img{
       width: 100px;
       height: 100px;
       border-radius: 50%;
       margin-right: 15px;
   }
</style>
