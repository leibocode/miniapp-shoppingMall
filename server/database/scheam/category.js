import mongoose from 'mongoose'
const Schema  =mongoose.Schema
const Mixed =Schema.Types.Mixed
const ObjectId =Schema.Types.ObjectId

const CategorySchema = new Schema({
  name:String,
  children:[{
      type:ObjectId,
      ref:'ChildCateGory'
  }],
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

CategorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    }else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

mongoose.model('Category',CategorySchema)