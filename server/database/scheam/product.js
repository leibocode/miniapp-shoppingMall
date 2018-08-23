import mongoose from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const ProductSchema =new Schema({
    title:String,
    img:String,
    price:Number,
    rate:Number,
    detailImgs:[String],
    summary:String,
    categoryText:String,
    //1 最近新品
    state:{
        type:Number,
        default:0
    },
    category:{
        type:ObjectId,
        ref:'ChildCateGory'
    },
    comments:{
        type:ObjectId,
        ref:'Comment'
    },
    meta:{
        updateAt:{
            
        }
    }
})

mongoose.model('Product',ProductSchema)



