import mongoose from 'mongoose'

const product = mongoose.model('Product')
export const getProducts = async (params)=>{
    const count =params.size * (params.page-1)
    let data = null;
    switch(params.price){
        case 'asc':
          data = await product.find({})
                              .limit(params.size)
                              .skip(count)
                              .sort({'price':1});
        break;
        case 'desc':
          data = await product.find({})
                              .limit(params.size)
                              .skip(count)
                              .sort({'price':-1});
        break;
        case 'all':
          data = await product.find({})
                              .limit(params.size)
                              .skip(count);
    }
    return data
}

export const getProductsByOrder  =async(_id)=>{
    
} 

export const getProduct =async(_id)=>{
    const data = await product.findOne({
        _id:_id
    })

    return data
}

export const getSearch = async(params)=>{
    const count = params.size * (params.page-1)
    console.log('keyword的值为'+params.keyword)
    console.log(params.keyword)
    const data =await product.find({
        title:new RegExp(params.keyword,'i')
    }).limit(params.size)
      .skip(count)
      .exec()
    return data
}




