import mongoose from 'mongoose'

const Banner = mongoose.model('Banner')
const Product =mongoose.model('Product')

export default class BannerService{
    
    async getBanners(){
        const data = await Banner.find({}).exec()
        return data
    }

    async getBanner(_id){
        const dtaa =await Banner.find({
            path:'products'
        }).exec()
        return data
    }
}