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
        url:'http://www.enanji.com/',
        transform:body=>cheerio.load(body)
    }
    let product =[]
    
    const $ =await rp(options)

    $('.body_h2 ').each(function(){
        const officeList =$(this).find('.office-p');
        if(officeList.length>0){
            $(officeList).each(function(){
                const img = $(this).find('.office-p-img img').attr('src')
                const title =$(this).find('.office-p-name a').text()
                const url  = $(this).find('.office-p-name a').attr('href')
                const price =$(this).find('.yuanjia').text()
                product.push({
                    img,
                    title,
                    url,
                    price
                }) 
            })
        }
    })

   // console.log(product);

    for(let i=0;i<product.length;i++){
        let prod = product[i]
        let prodDetailData =await fetchDetail(prod)
        prod.category =prodDetailData.category
        prod.cate =prodDetailData.cate
        prod.category_child =prodDetailData.category_child
        prod.imgs =prodDetailData.imgs
        prod.summary =prodDetailData.summary
        
    }
    console.log(product.length);
    //writeFileSync(resolve(__dirname,'../crawler/product.json'),JSON.stringify(product,null,2),'utf8')
})()