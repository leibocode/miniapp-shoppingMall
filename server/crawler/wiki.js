const rp = require('request-promise')
const cheerio =require('cheerio')
const { resolve } =require('path')
const { writeFileSync } =require('fs')

;(async()=>{
    const options ={
        url:'http://www.4399dmw.com/huoying/renwu/',
        transform:body=>cheerio.load(body)
    }
    
    let $ =await rp(options)

    $('')
})