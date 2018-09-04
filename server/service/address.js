import mongoose from 'mongoose'

const address =mongoose.model('Address')
const user =mongoose.model('User')

export const getAll = async(openid)=>{
    let userinfo =await user.findOne({
        openid:openid
    })
    let addressList = await address.find({
        user:userinfo._id
    }).exec();

    return addressList
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
        provinceId:params.provinceId,
        cityId:params.cityId,
        districtId:params.districtId,
        mobile:params.mobile,
        addressText:params.address,
        code:mobile,
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

