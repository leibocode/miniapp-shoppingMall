import mongoose from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

/**
 *
 */
const ChildCateGorySchema =new Schema({
    name:String,
    products:[{
        type:ObjectId,
        ref:'Product'
    }],
    img:String,
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

ChildCateGorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('ChildCateGory',ChildCateGorySchema)