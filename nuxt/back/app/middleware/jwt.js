
module.exports=({app})=>{
    return async function verify(ctx,next){
        const token=ctx.request.header.authorization.replace('Bearer ', '');
        try {
            let ret=await app.jwt.verify(token,app.config.jwt.secret);
            console.log('中间件token', ret);
            ctx.state.email=ret.email;
            ctx.state.userid=ret._id; 
            ctx.state.nickname=ret.nickname;        
            await next()
        } catch (error) {
            console.log(error)
            if (error.name=='TokenExpiredError') {
                return ctx.body={
                    code: -666,
                    message: '登录过期'
                }
            }
        }
    }
}