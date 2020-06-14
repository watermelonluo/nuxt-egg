<template>
  <div class="container">
      <ArticleItem v-for="article in articles" 
        :key="article._id" :article="article">      
      </ArticleItem>
  </div>
</template>

<script>

import ArticleItem from '~/components/ArticleItem.vue'
export default {
  layout: 'default',
  components: {
      ArticleItem
  },
  data() {
      return {
          articles:[]
      }
  },
  async mounted() {
    const token= localStorage.getItem('token');
    if (token) {
      let ret= await this.$store.dispatch('user/detail');
    }
    let ret=await this.$http.get('/article');
    console.log(ret);
    if(ret.code==0){
      this.articles=ret.data
    }           
  },
  
}
</script>

<style lang="scss" scoped>

.container{
  width: 100%;
  height: 100%;
  padding: 0 80px;
}
</style>
