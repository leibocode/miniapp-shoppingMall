const Koa =require('koa')
const { resolve } =require('path')

const r =path=>resolve(__dirname,path)
const host =process.env.HOST || '127.0.0.1'
const port =process.env.PORT || 3001



class Server {
    constructor(){
        this.app =new Koa()
        this.useMiddleWares(this.app)
    }
    useMiddleWares(app){

    }

    async start(){
        this.app.use(async(ctx,next)=>{
            ctx.body ='xxx'
        })

        this.app.listen(port,host)
        console.log('Server listening on ' + host + ':' + port)
    }
}

const app =new Server()

app.start()