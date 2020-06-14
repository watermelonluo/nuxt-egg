'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  async info() {
    let {email, userid}=this.ctx.state;
    const user=await this.checkEmail(email)
    this.success(user)
  }
  async captcha(){
    const {ctx}=this;
    const cap=this.service.tool.captcha();
    ctx.session.captcha=cap.text;
    console.log(cap.text);
    
    ctx.response.type='image/svg+xml';
    ctx.body=cap.data;
  }
  async register(){
    const {ctx}=this;
    const { captcha, nickname, email, password }=ctx.request.body;
    console.log('后台', captcha);
    
    if(captcha.toUpperCase()===ctx.session.captcha.toUpperCase()){
      //邮箱，名称不能相同
      if(await this.checkEmail(email)){
        return this.error(-6,'邮箱已有')
      }
      let ret=await ctx.model.User.create({
        email,nickname,password,
      })
      if(ret._id){
        this.success('注册成功')
      }
      this.success('add')
    }else{
      this.error('验证码错误')
    }
  }
  async checkEmail(email){
    const user=await this.ctx.model.User.findOne({email})
    return user
  }
  async login(){
    const {ctx,app}=this;
    const { email, password }=ctx.request.body;
    let ret=await ctx.model.User.findOne({
      email,password
    })
    console.log('登录',ret);
    
    if(ret){
      let {nickname}=ret
      const token=app.jwt.sign({
        nickname,email,
        _id: ret._id
      },app.config.jwt.secret,{
        expiresIn: '1h'
      })
      this.success({token,nickname,email})
    }else{
      this.error(-1,'失败')
    }
  }
  async isFollow(){
    const {ctx}=this;
    const me=await ctx.model.User.findById(ctx.state.userid)
    const isFollow=!!me.following.find(v=>v.toString()==ctx.params.id);
    this.success({isFollow})
  }
  async follow(){
    const {ctx}=this;
    const me=await ctx.model.User.findById(ctx.state.userid);
    const isFollow=!!me.following.find(v=>v.toString()==ctx.params.id);
    console.log('follow', isFollow)
    if(!isFollow){
      me.following.push(ctx.params.id);
      me.save();
      this.message('关注成功')
    }
  }
  async unfollow(){
    const {ctx}=this;
    const me=await ctx.model.User.findById(ctx.state.userid);
    const index=me.following.map(id=>id.toString()).indexOf(ctx.params.id);
    if(index>-1){
      me.following.splice(index, 1);
      me.save();
      this.message('取消关注成功')
    }
  }
}


module.exports = UserController