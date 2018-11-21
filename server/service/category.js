import mongoose from 'mongoose'

const Category = mongoose.model('Category')

const ChildCategory =mongoose.model('ChildCateGory')

const Product = mongoose.model('Product')

export const getCategorys =async ()=>{
    const data =await Category.find({
    }).populate({
        path:'children'
    }).exec()
    return data
}

export const getChildrens =async (_id)=>{
    const data =await ChildCategory.findOne({
        _id:_id
    }).populate({
        path:'products'
    }).exec()
    return data
}

