const cheerio =require('cheerio')
const rp =require('request-promise')
const { writeFileSync } =require('fs')
const { resolve } =require('path')

const sleep =time=>new Promise(resolve=>setTimeout(resolve,time))

async function fetchDetail(item) {
    const options ={
        url:item.url,
        transform:body=>cheerio.load(body)
    }
    let $ =await rp(options)

    let category =$('.nav_path .cate1 a').text()
    let category_child =[]
    let cate =$('.nav_path .cate1').next().find('li').eq(3).find('a').text()
    let imgs =[]
    let summary =$('.pinpai div').eq(1).text() 
    $('.tiny_box_content .tiny_box_content_lable').each(function(){
        const title =$(this).find('a').text()
        category_child.push({
            title
        })
    })

    $('.small_img_list .small_img').each(function(){
        const url =$(this).find('img').attr('src')
        imgs.push(url)
    })
    try{
       
    }catch(e){

    }

    return {
        category,
        cate,
        category_child,
        imgs,
        summary
    }
}

;(async()=>{
    const options = {
        url:'https://detail.tmall.com/item.htm?id=526513532519&ali_trackid=2:mm_35674402_9486228_31776601:1533892170_280_1144737937&pvid=50_106.37.107.43_23088_1462433723009',
        transform:body=>cheerio.load(body)
    }
    let product =[]
    console.log('开始爬去');
    const $ =await rp(options)
    console.log($);
    $('.tb-serPromise').each(function(){
        
    })
    console.log($('.newp').text());
   // console.log(product);


    //writeFileSync(resolve(__dirname,'../crawler/product.json'),JSON.stringify(product,null,2),'utf8')
})()