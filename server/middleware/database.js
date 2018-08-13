import fs from 'fs'
import { resolve } from 'path'
import mongoose, { mongo } from 'mongoose'
import config from '../config/config'


const models =resolve(__dirname,'../database/scheam')

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file=>require(resolve(models,file)))

let banners =require(resolve(__dirname,'../crawler/banner.json'))
let products =require(resolve(__dirname,'../crawler/product.json'))
let specials =require(resolve(__dirname,'../crawler/special.json'))


export const database =app=>{
    mongoose.set('debug',true)

    mongoose.connect(config.db)

    mongoose.connection.on('disconnected',()=>{
      mongoose.connect(config.db)
    })

    mongoose.connection.on('error',err=>{
      console.log(err);
    })

    mongoose.connection.on('open',async()=>{
      console.log('Connected to MongoDb',config.db)

      const Banner = mongoose.model('Banner')
      const Product =mongoose.model('Product')
      const Cate =mongoose.model('Category')
      const ChildCategory =mongoose.model('ChildCateGory')
      const Special =mongoose.model('Special')

      let existBanners  = await Banner.find({}).exec()
      let existProduct =await Product.find({}).exec() 
      let existCatelgory =await Cate.find().exec()
      let existChildCategory =await ChildCategory.find({}).exec()
      let existSpecial =await Special.find({}).exec()

      if(!existBanners.length){
        for(let i =0;i<banners.length;i++){
          const banData =banners[i]
        }
      }

      if(!existProduct){
        //初始化一子类型和类型
        for(let i=0;i<products.length;i++){
          const p = products[i]
          let _p =new Product({

          })
          let cate_entity =await Cate.find({
            name:p.category
          })
          if(!cate_entity){
            cate_entity =new Cate({
              name:p.category
            })

            await cate_entity.save()
          }
          let childList =[]
          for(let i=0;i<p.category_child;i++){
            let child =  p.category_child[i]
            let child_entity =await ChildCategory.findOne({
              name:child.title
            })
            if(!child_entity){
              child_entity =new ChildCategory({
                name:child.title
              })

              await child_entity.save()
            }else {
              if(cate_entity.children.indexOf(child_entity._id)===-1){
                cate_entity.children.push(child_entity._id)
              }
            }
          }
          await cate_entity.save() 
        }
        for(let i=0;i<products.length;i++){
          const product = products[i]
          const _product =await Product.findOne({
            title:product.title
          })
          
          if(!_product){
            _product =new Product({
              title:product.title, 
              img:product.img,
              price:product.price,
              detailImgs:product.imgs,
              categoryText:product.cate,
              summary:product.summary
            })
          }
        }
      }
    })

}