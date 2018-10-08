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
    const count = (params.newSize) * (params.newPage -1)
    console.log(`越过${count}条数据`)
    const userinfo = await user.findOne({
        openid:params.openid
    })

    console.log(userinfo)

    const orders = await payment.find({
        user:userinfo._id
    }).limit(params.newSize)
      .skip(count)
      .exec()

    let orderList =[]
    for(let i=0;i<5;i++){
        let tempList =[]
        for(let j=0;j<orders.length;j++){
            if(orders[j].success===i){
                tempList.push(orders[j])
            }
        }
        orderList.push({
            'status':i,
            'isnull':tempList.length == 0,
            'orderList':tempList
        })
    }

    return orderList
}

export const getOrder = async (openid,id)=>{
    const userinfo = await user.findOne({
        openid:openid
    })
    
    const  data =await payment.findOne({
        user:userinfo._id
    })
    
    return data
    
}

export const delOrder =async (openid,id)=>{
    const  data =await payment.findOne({
        _id:id
    })
    console.log(`method del data的值${data}`)
    await data.remove()
}