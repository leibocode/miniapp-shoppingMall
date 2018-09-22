import { parse as urlParse } from 'url'
import { wechatConfig } from '../wechat/wechat'
import { addOrder } from '../service/order'
import Wechat from '../wechat/index'
import TemeplateMsg from '../wechat/temeplateMsg' 
import config from '../config/config'

const wechatClient =new Wechat(wechatConfig.wechat)
const tplMsg = new TemeplateMsg(wechatConfig.wechat)

function filterTemplate(list,title){
    let res =[]
    list.forEach((data)=>{
        if(data.title.indexOf(title)){
            res.push(data)
        }
    })
    return res;
}

export async function createOrder(ctx,next){
    const body  =ctx.request.body
    const { openid } =ctx.user

    let form ={
        openid:openid,
        address:body.address_id,
        product:body.product,
        total:body.total
    }

    const payment = await addOrder(form)
    let opts ={
        touser:openid,
        template_id:config.minapp.sendMessageId,
        form_id:body.formId,
        data:{
            "keyword1":{
                "value": body.total+'元',
                "color": "#1d1d1d"
            },
            "keyword2":{
                "value": (Date.now()).toString(),
                "color": "#1d1d1d"
            },
            "keyword3":{
                "value": payment.product[0].title+"等商品",
                "color": "#1d1d1d"
            },
            "keyword4":{
                "value": "请在30分钟内完成支付",
                "color": "#1d1d1d"
            }
        }
    }
    console.log(opts)

    const data  = await tplMsg.sendTemplateMessage(opts)

    if(data.errmsg==='ok'){

        ctx.body ={
            success:true,
            data:data
        }
    }else {
        ctx.body ={
            success:false
        }
    }    
}

