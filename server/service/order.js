import mongoose from 'mongoose'

const user = mongoose.model('User')
const payment =mongoose.model('Payment')

export const  addOrder =async(params)=>{
    const userinfo = await user.findOne({
        openid:params.openid
    })

    const order = await payment({
        user:userinfo._id,
        product:params.product,
        address:params.address_id,
        totalMenty:params.total
    })

    await order.save()

    return order 
}