import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
    openid: String,
    unionid: String,
    avatarUrl: String,
    name: String,
    sex: String,
    country: String,
    city: String,
    phoneNumber: Number,
    address: [{
        type: ObjectId,
        ref: 'Address'
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    payments: [{
        type: ObjectId,
        ref: 'Payment'
    }],
    collections: [{
        type: ObjectId,
        ref: 'Collection'
    }]
})

mongoose.model('User', UserSchema)