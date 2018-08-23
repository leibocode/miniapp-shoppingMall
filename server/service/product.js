import mongoose from 'mongoose'

const product = mongoose.model('Product')
export const getProducts = async (params)=>{
    const count =params.size * (params.page-1)
    const data =await product.find({
        
                 })
                 .limit(params.size)
                 .skip(count)
                 .exec()
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



