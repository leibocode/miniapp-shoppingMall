import mongoose, { mongo } from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const AddressSchema =new Schema({
    content:String,
    mobile:Number,
    addressText:String,
    sex:{
        type:Number,
        default:0
    },
    name:String,
    user:{
        type:ObjectId,
        ref:'User'
    },
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})


AddressSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt =this.meta.updateAt =Date.now()
    }else{
        this.meta.updateAt =Date.now()
    }
    
    next()
})

mongoose.model('Address',AddressSchema)
