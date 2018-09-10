import { parse as urlParse } from 'url'
import { wechatConfig } from '../wechat/wechat'
import { addOrder } from '../service/order'
import Wechat from '../wechat/index'
import TemeplateMsg from '../wechat/temeplateMsg' 

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

function filterProductTitle(list){
    
}

export async function createOrder(ctx,next){
    const body  =ctx.request.body
    const { openid } =ctx.user
    const tlist = tplMsg.getTemplate() 
    console.log(tlist)
    const template =filterTemplate(tlist,msgType)
    let form ={
        openid:openid,
        address:body.address_id,
        product:body.product,
        total:body.total
    }

    const payment = await addOrder(form)

    console.log(template);
    let opts ={
        touser:openid,
        template_id:template.template_id,
        form_id:body.formId,
        data:{
            "keyword1":{
                "value": payment.total,
                "color": "#1d1d1d"
            },
            "keyword2":{
                "value": param.meta.createdAt,
                "color": "#1d1d1d"
            },
            "keyword3":{
                "value":param.product[0].title
            }
        }
    }

    const data  = await tplMsg.sendTemplateMessage(opts)
    console.log(data);

    ctx.body ={
        success:true,
        data:data
    }
}