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

export const getOrders =async(params)=>{
    console.log(params)
    const userinfo = await user.findOne({
        openid:params.openid
    })

    console.log(userinfo)

    const orders = await payment.find({
        user:userinfo._id
    }).exec()


    let orderList =[]
    for(let i=0;i<5;i++){
        let tempList =[]
        for(let j=0;j<orders.length;j++){
            if(orders[j].success===i){
                tempList.push(orders[j])
            }
        }
        tempList.push({
            'status':i,
            'isnull':tempList.length == 0,
            'orderList':tempList
        })
    }

    return orderList

}