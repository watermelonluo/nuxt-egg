
module.exports=app=>{
    let mongoose=app.mongoose;
    let Schema=mongoose.Schema;
    
    const ArticleSchema= new Schema({
        title:{type:String,required: true},
        content:{type:String,required: true},
        content_html:{type:String,required: true},
        // like:{type:String,required: true},
        // unlike:{type:String,required: false},
        // follow:{type:String,required: false},
        author:{type:Schema.Types.ObjectId,ref: 'User',required: true}, 
                       
        views:{type:Number,required: false,default:1},
        __v:{type:Number,select: false}
    })

    return mongoose.model('Article',ArticleSchema)
}