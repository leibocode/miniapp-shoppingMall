import mongoose from 'mongoose'

const address =mongoose.model('Address')
const user =mongoose.model('User')

export const getAll = async()=>{
    let addressList = await address.find({
        user:_id
    }).exec();

    return getAll
}

export const del = async(_id)=>{
    const entity =await address.findOne({
        _id:_id
    })

    await entity.remove()
}

export const add =async(params)=>{
    const u =await user.findOne({
        openid:params.openid
    })

    const entity =new address({
        content:params.content,
        mobile:params.mobile,
        addressText:params.addressText,
        name:params.name,
        sex:params.sex,
        user:u._id
    })

    await entity.save()
}

export const getOne =async(_id)=>{
    const entity =await address.findOne({
        _id:_id
    })

    return entity
}

