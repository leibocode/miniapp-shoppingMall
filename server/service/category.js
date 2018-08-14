import mongoose from 'mongoose'

const Category = mongoose.model('Category')

const ChildCategory =mongoose.model('ChildCateGory')

export const getCategorys =async ()=>{
    const data =await Category.find({
    }).populate({
        path:'children'
    }).exec()
    return data
}

export const getChildrens =async (_id)=>{
    const data =await ChildCategory.find({
        _id:_id
    }).populate({
        path:'products'
    }).exec()
    return data
}