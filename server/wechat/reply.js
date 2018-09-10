const tip ='亲,请问有什么问题,请反馈给我们的客服小姐姐哦!'

export default async (ctx,next) =>{
    const message = ctx.weixin

    if(message.MsgType==='event'){
        if(message.Event=='user_enter_tempsession'){
            ctx.body =tip
        }

    }else if(message.MsgType==='text'){
        if(message.Content==='人工'){
            ctx.tip ='正在为您转到人工服务,当前等到人数3人，请等待...'
        }else if(message.Content==='开发者'){
            const msg ='我叫了雷博,是上海浦东的一名程序员,爱好Node和C#,下面是程序代码,点击<a href="www.github.com/leibocode">gayhub</a>喜欢给个star哈'
            ctx.body =msg
        }
    }else if(message.MsgType==='image'){
        
    }
}