import sha1 from 'sha1'
import getRawBody from 'raw-body'
import * as util from '../lib/util'
import Wechat from '../wechat'


export default function (opts,reply){
    return async function wechatMiddle(ctx,next){
        const token = opts.token
        const wechat =new Wechat(opts)
        let { signature,nonce,timestamp,echostr } = ctx.query

        let str =[token,timestamp,nonce].sort().join('')
        let sha = sha1(str)

        if(ctx.method==='GET'){
            if(sha===signature){
                ctx.body =echostr +''
            }else {
                ctx.body ='wang:'+'不是微信的请求'
            }
        }else if(ctx.method==='POST'){
            if (sha !== signature) {
                ctx.body = 'Failed'
                return false
            }
            console.log(ctx.request.body) 
            const data = ctx.request.body
            
            // const data =await getRawBody(ctx.body,{
            //     length:ctx.length,
            //     limit:'1mb',
            //     encoding:ctx.charset
            // })
           // console.log(data)
            // const content =await util.parseXML(data)
            // const message =util.formatMessage(content.xml)

            ctx.weixin =data
            
            await reply.apply(ctx,[ctx,next])

            const replyBody = ctx.body
            const msg =ctx.weixin
            const json =util.tpl(replyBody,msg)
            // console.log(xml)
            // ctx.status = 200
            // ctx.type ='application/xml'
            // ctx.body =xml

            //发送到接口
            wechat.sendMessage(json)
        }
    }
}