'use strict';

const BaseController = require('./base');

const marked= require('marked');
class ArticleController extends BaseController {
   async create(){
       let {ctx}=this;
       let {userid, nickname}=ctx.state;
       const {content}=ctx.request.body;

       let title=content.split('\n').find(v=>{
           return v.indexOf('#')==0
       })
       console.log('create art',userid, );
       
       let obj={
           title: title.replace('#', ''),
           content,
           content_html: marked(content),
           author: userid   
       }
       let ret= await ctx.model.Article.create(obj);
       if(ret._id){
           this.success({
               id: ret._id,
               title: ret.title
           })
       }else{
           this.error(-1,'创建失败')
       }
   }
   async detail(){
        const {ctx}=this;
        const {id}=ctx.params;
        console.log('detail id', id);
        
        //let ret= await ctx.model.Article.findByIdAndUpdate({_id:id},{$inc:{'views': 1}});
        let info= await ctx.model.Article.find().populate('author');
        //console.log('作者',ret);
        //console.log('5ee327b6e0f1f246e46ba97b'==='5ee327b6e0f1f246e46ba97b')
        // let info=ret.filter(v=>{
        //     console.log('作者',v._id===id)
        //     return v._id===id
        // })
        //info['author']=author;
        if(info){
            this.success(info)
        }
   }
   async list(){
        const {ctx}=this;
        let ret=await ctx.model.Article.find().populate('author');
        this.success(ret)
   }
}


module.exports = ArticleController