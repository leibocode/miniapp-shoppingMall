
import mongoose from 'mongoose'

const Banner = mongoose.model('Banner')
const Product =mongoose.model('Product')

export const getBanner =async (params)=>{
    console.log(params)
    const count = params.size * (params.page-1)
    console.log(count+'count')
    let data = null
    switch(params.price){
        case 'asc':
            data = await Banner.find({
                _id:params._id
            }).populate({
                path:'products',
                options:{
                    limit:params.size,
                    skip:count,
                    sort:{
                        'price':1
                    }
                }
            })
            .exec();
        break;
        case 'desc':
            data = await Banner.find({
                _id:params._id
            }).populate({
                path:'products',
                options:{
                    limit:params.size,
                    skip:count,
                    sort:{
                        'price':-1
                    }
                }
            })
            .exec()
        break;
        case 'all':
            data = await Banner.find({
                _id:params._id
            }).populate({
                path:'products',
                options:{
                    limit:params.size,
                    skip:count
                }
            })
            .exec();
        break;
    }
    const data =await Banner.find({
        _id:params._id
    }).populate({
        path:'products',
        options:{
            limit:params.size,
            skip:count,
            sort:{
                'price':-1
            }
        }
    })
    .exec();

    return data 
    
}


export const getBanners =async (_id)=>{
    const data = await Banner.find({}).exec()
        return data
}