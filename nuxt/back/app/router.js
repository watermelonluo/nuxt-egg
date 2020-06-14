'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt=app.middleware.jwt({app})
  router.get('/', controller.home.index);
  router.get('/user/info', jwt, controller.user.info);
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/isfollow/:id', jwt,controller.user.isFollow);
  router.put('/user/follow/:id', jwt,controller.user.follow);
  router.delete('/user/unfollow/:id', jwt,controller.user.unfollow);
  // router.group({name:'article',prefix:'article'},router=>{
  //   let {create}=controller.article;
  //   router.post('/create', create)
  // })
  router.post('/article/create',jwt, controller.article.create);
  router.get('/article/:id', controller.article.detail);
  router.get('/article', controller.article.list);
};
