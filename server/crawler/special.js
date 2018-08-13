const rp =require('request-promise')
const cheerio = require('cheerio')
const { writeFileSync } =require('fs')
const { resolve } =require('path')

async function fetchDaat(item){
    //http://www.hehe168.com/note/3g/466731
    const options ={
        url:item.url,
        transform:body=>cheerio.load(body)
    }
    
    let $ =await rp(options)

    let productList =[]
    const summary =$('.article-l p').eq(0).text()

    for(let i=0;i<5;i++) {
        const name =$('.article-l h4').eq(i).text()
        const p_summary =$('.article-l h4').eq(i).next().text()
        const img =$('.fea-subsec').eq(0).find('img').attr('src')
        const price =$('.fea-subsec').eq(0).find('.urelative').text()

        productList.push({
            name,
            p_summary,
            img,
            price
        })
    }

    return { summary,productList }
}


;(async()=>{
    const options ={
        url:'http://www.hehe168.com/m/zhuanti',
        transform:body=>cheerio.load(body)
    }
    console.log('开始爬取数据')
    let $ =await rp(options)

    let list =[]

    $('#mSpecial dl').each(function(){
        const img = $(this).find('dt img').attr('src')
        const title =$(this).find('dd p').text()
        const url ='http://www.hehe168.com'+$(this).find('dt a').attr('href')
        list.push({
            img,
            title,
            url
        })

    })


    for (let i = 0; i <list.length; i++) {
      let spceial = list[i]
      let data =await fetchDaat(spceial)
      spceial.summary =data.summary
      spceial.produts = data.productList

    }

    //console.log(list);
    writeFileSync(resolve(__dirname,'../crawler/special.json'),JSON.stringify(list,null,2),'utf8')
})()