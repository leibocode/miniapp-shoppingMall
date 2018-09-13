
import mongoose from 'mongoose'

const Banner = mongoose.model('Banner')
const Product =mongoose.model('Product')

export const getBanner =async (params)=>{
    // const data =await Banner.findOne({
    //     _id:_id
    // }).populate({
    //     path:'products'
    // }).exec()
    // return data
    // const count =params.size * (params.page-1)
    // const data =await Banner.find({
    //     products:params._id
    // }).limit(params.size)
    //   .skip(count)
    //   .exec()
    // return data
    
    const count = params.size * (params.page-1)
    const data =await Banner.find({
        _id:params._id
    }).populate({
        path:'products'
    }).limit(params.size)
    .skip(count)
    .exec();

    return data 
    
}


export const getBanners =async (_id)=>{
    const data = await Banner.find({}).exec()
        return data
}