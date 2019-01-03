const tip ='亲,请问有什么问题,请反馈给我们的客服小姐姐哦!'

export default async (ctx,next) =>{
    const message = ctx.weixin

    if(message.MsgType==='event'){
        if(message.Event=='user_enter_tempsession'){
            ctx.body =tip
        }

    }else if(message.MsgType==='text'){
        if(message.Content==='人工'){
            ctx.body ='正在为您转到人工服务,当前等到人数3人，请等待...'
        }else if(message.Content==='开发者'){
            ctx.body ={
                type:'link',
                title:"gayhub",
                description:"我叫雷博,码畜一枚",
                url:"https://www.github.com/leibocode",
                thumb_url:"THUMB_URL"
            }
        }else if(message.Content.indexOf('官网')>0){
            ctx.body ={
                type:"miniprogrampage",
                title:"零食1号",
                pagepath:"pages/home/home",
                thumb_url:"THUMB_URL"
            }
        }else if(message.Content==='1'){
            ctx.body ='小程序'
        }
    }else if(message.MsgType==='image'){

    }else if(message.MsgType==='miniprogrampage'){

    }
}