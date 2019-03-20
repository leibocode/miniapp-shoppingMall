import mongoose, { mongo } from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId
/**
 * 订单集合
 */
const PaymentSchema =new Schema({
    user:{
        type:ObjectId,
        ref:'User'
    },
    product:[{
        _id:ObjectId,
        name:String,
        count:Number,
        img:String,
    }],
    address:{
        type:ObjectId,
        ref:'User'
    },
    totalMenty:Number,
    success:{
        type:Number,
        default:0
    },
    meta:{
     createdAt: {
        type: Date,
        default: Date.now()
     },
     updatedAt: {
        type: Date,
        default: Date.now()
      }
    }
})

PaymentSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt =this.meta.updatedAt =Date.now()
    }else {
        this.meta.updatedAt =Date.now()
    }

    next()
})

mongoose.model('Payment',PaymentSchema)