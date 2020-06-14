<template>
  
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item>
              <svg t="1591030660676" class="logo-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3888"><path d="M345.571263 833.671188H58.436267L431.36782 190.3104l372.969349 643.360788h-285.283" fill="#41B883" p-id="3889"></path><path d="M767.675204 833.671188H965.536427L642.004036 277.580995 321.306334 833.671188h197.861222" fill="#328170" p-id="3890"></path><path d="M650.167938 833.671188h145.740759L557.56813 424.07767 321.306334 833.671188h145.740759" fill="#35495E" p-id="3891"></path></svg>

          </el-menu-item>
          <el-menu-item index="1">
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="!userinfo._id" index="2" style="float:right">
            <nuxt-link to="/register">注册</nuxt-link>
          </el-menu-item>
          
          <el-menu-item v-if="!userinfo._id" index="3" style="float:right">
            <nuxt-link to="/login">登录</nuxt-link>
          </el-menu-item>
          
          <el-menu-item v-if="userinfo._id"  index="4" style="float:right">
            <nuxt-link to="/register">{{userinfo.nickname}}</nuxt-link>
          </el-menu-item>
          <el-menu-item v-if="userinfo._id"  index="5" style="float:right">
            <nuxt-link to="/editor/new">
              <el-button type="success">写文章</el-button>
            </nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <nuxt />
      </el-main>
      
    </el-container>
</template>

<script>
export default {
  computed: {
    userinfo(){
      return this.$store.state.user
    }
  },
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}
body{
    height: 100%;
    background-color: #f4f4f4;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.logo-icon{
  width: 100px;
  height: 60px;
}
.el-menu--horizontal>.el-menu-item{
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  
}
.el-header{
  height: auto !important;
  padding-bottom: 20px;
}

</style>
