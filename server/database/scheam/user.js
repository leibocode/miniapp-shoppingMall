import mongoose, { mongo } from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const UserSchema =new Schema({
    openid:String,
    unionid:String,
    avatarUrl:String,
    name:String,
    phoneNumber:Number,
    address:[{
        type:ObjectId,
        ref:'Address'
    }],
    comments:[{
        type:ObjectId,
        ref:'Comment'
    }],
    payments:[{
        type:ObjectId,
        ref:'Payment'
    }]
})

mongoose.model('User',UserSchema)