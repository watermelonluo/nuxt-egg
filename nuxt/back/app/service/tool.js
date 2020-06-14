const Service=require('egg').Service;
const cap=require('svg-captcha');

class ToolService extends Service {
    captcha(){
        let c=cap.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            noise: 3
        })
        return c
    }
}
module.exports=ToolService;