import mongoose from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =mongoose.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const SearchSchema =new Schema({
    text:String,
    num:{
        type:Number,
        default:0
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

SearchSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt =Date.now()
    }else {
        this.meta.updateAt =Date.now()
    }

    next()
})

mongoose.model('Search',SearchSchema) 
