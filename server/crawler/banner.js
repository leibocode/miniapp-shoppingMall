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

    $('.proItem').each(function(){
        const name = $(this).find('.txt').text()
        const price =$(this).find('.price').text()
        const img =$(this).find('.proImg img').attr('src')
        const url ='http://www.hehe168.com'+$(this).find('.proItem a').attr('href')

        productList.push({
            name,
            price,
            img,
            url
        })
    })

    for (let i = 0; i < productList.length; i++) {
        var product =productList[i]
        const summary =await fetchDetail(product.url)
        product.summary =summary
    }

    return productList
}

const fetchDetail =async(url)=>{
    const options ={
        url:url,
        transform:body=>cheerio.load(body)
    }
    
    let $ =await rp(options)
    
    let info = $('.info-intro').text()

    return info
}



;(async()=>{
    const options ={
        url:'http://www.hehe168.com/m/index',
        transform:body=>cheerio.load(body)
    }
    console.log('开始爬取数据')
    let $ =await rp(options)

    let banner_list =[]

    $('.pro-view li').each(function(){
        const img = $(this).find('img').attr('src')
        const url ='http://www.hehe168.com'+$(this).find('a').attr('href')
        banner_list.push({
            img,
            url
        })

    })


    for (let i = 0; i <banner_list.length; i++) {
      let banner = banner_list[i]
      let data =await fetchDaat(banner)
      banner.product_list =data

    }

    //console.log(banner_list);
    writeFileSync(resolve(__dirname,'../crawler/banner.json'),JSON.stringify(banner_list,null,2),'utf8')
})()