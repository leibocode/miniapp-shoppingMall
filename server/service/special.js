import mongoose from 'mongoose'

const Special  =mongoose.model('Special')


export const getSpecials =async()=>{
    const data =await Special.find({}).skip(1).exec()
    return data
}

export const getSpecial =async(_id)=>{
    const data =await Special.find({
        _id:_id
    }).populate({
        path:'products'
    }).exec()

    return data
}

