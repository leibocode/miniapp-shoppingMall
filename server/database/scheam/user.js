import mongoose, { mongo } from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const UserSchema =new Schema({
    name:String
})

mongoose.model('User',UserSchema)