# nuxt-egg
简易注册登录发布文章社区

cd nuxt
cd front
npm install
cd back
npm install

# nuxt.js egg.js mongo

1.注册 (register.vue)
验证码使用svg-captcha，注册成功数据保存在mongodb，egg-mongoose,adminmongo

2.登录 (login.vue)
使用到的插件egg-jwt, md5密码加密，名称和密码匹配成功会生成一个token，保存到store，localstorage

3.首页 (index.vue)
显示文章列表及浏览次数
再请求一次user信息，mongo查得到就显示用户信息

4.发布文章 (editor/new.vue)
安装了marked转换器

5.文章详情 (article/_id.vue)
文章详情
