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

export const getChildrens =async (params)=>{
    const count = params.size *(params.page-1)
    let data = null
    switch(params.price){
        case 'asc':
            data =await ChildCategory.find({
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
            .exec()
          break;
          case 'desc':
            data =await ChildCategory.find({
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
            }).exec()
           case 'all':
            data =await ChildCategory.find({
                _id:params._id
            }).populate({
                path:'products',
                options:{
                    limit:params.size,
                    skip:count
                }
            }).exec()
            break;
    }
    return data
}

