
module.exports=app=>{
    let mongoose=app.mongoose;
    let Schema=mongoose.Schema;
    
    const UserSchema= new Schema({
        email:{type:String,required: true},
        password:{type:String,required: true,select:false},
        nickname:{type:String,required: true},
        avatar:{type:String,required: false},
        following:{type:[{type: Schema.Types.ObjectId,ref:'User'}]},
        __v:{type:Number,select: false}
    },{timestamps:true})

    return mongoose.model('User',UserSchema)
}