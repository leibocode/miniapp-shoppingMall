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
    if(u==null){
        //容错
    }
    console.log(u)
    const entity =new address({
        provinceId:params.provinceId,
        cityId:params.cityId,
        districtId:params.districtId,
        mobile:params.mobile,
        addressText:params.addressText,
        code:params.mobile,
        name:params.name,
        user:u._id
    })

    if((await getAll(params.openid)).length>0){
        entity.defaultCode =0
    }else {
        entity.defaultCode =1
    }

    await entity.save()

    
}

export const getOne =async(_id)=>{
    const entity =await address.findOne({
        _id:_id
    })

    return entity
}

export const setState =async(openid,_id)=>{
    const userinfo = await user.findOne({
        openid:openid
    })
    const adressList =await address.find({
        user:userinfo._id
    }).exec()
    adressList.forEach(async(item) => {
        item.defaultCode =0
        await item.save()
    });
    const entity = await address.findOne({
        _id:_id
    })
    entity.defaultCode = 1
    
    await entity.save()
}

