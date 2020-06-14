'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    const { ctx } = this;
    ctx.body = {
        code: 0,
        data
    };
  }
  message(msg){
    this.ctx.body={
        code: 0,
        message: msg
    }
  }
  error(code=-1,msg){
    this.ctx.body={
        code,
        message: msg
    }
  }
}

module.exports = BaseController;