import mongoose, { mongo } from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const UserSchema =new Schema({
    openid:[String],
    avatarUrl:String,
    name:String,
    address:[{
        type:ObjectId,
        ref:'Address'
    }],
    comments:[{
        type:ObjectId,
        ref:'Comment'
    }]
})

mongoose.model('User',UserSchema)