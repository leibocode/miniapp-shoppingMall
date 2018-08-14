import mongoose from 'mongoose'

const Banner = mongoose.model('Banner')
const Product =mongoose.model('Product')

export const getBanner =async (_id)=>{
    const data =await Banner.findOne({
        _id:_id
    }).populate({
        path:'products'
    }).exec()
    return data
}

export const getBanners =async (_id)=>{
    const data = await Banner.find({}).exec()
        return data
}