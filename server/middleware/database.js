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

    mongoose.connect(config.db,{useNewUrlParser:true})

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
      const User =mongoose.model('User')
      const Search =mongoose.model('Search')

      let existBanners  = await Banner.find({}).exec()
      let existProduct =await Product.find({}).exec() 
      let existCatelgory =await Cate.find().exec()
      let existChildCategory =await ChildCategory.find({}).exec()
      let existSpecial =await Special.find({}).exec()
      let existSearch =await Search.find({}).exec()

      let user =await User.findOne({
        name:'icode'
      })

      let search = await Search.findOne({
         text:'三只松鼠'
      })

      if(!search){
         search =new Search({
            text:'三只松鼠'
         })
         await search.save()
      }

      if(!user){
         user =new User({
           name:'icode'
         })
         await user.save()
      }
      //初始化大类型数据
      if(!existCatelgory.length){
        //初始化一子类型和类型
        for(let i=0;i<products.length;i++){
          const p = products[i]
          let _p =new Product({

          })
          let cate_entity =await Cate.find({
            name:p.category
          })
          if(!cate_entity.length){
            cate_entity =new Cate({
              name:p.category
            })

            await cate_entity.save()
          }
        }
      }

      //import 
      if(!existChildCategory.length){
        for(let i=0;i<products.length;i++){
           const p = products[i]
           let _product =await Product.findOne({
             name:p.title
           })
           if(!_product){
            _product =new Product({
               title:p.title,
               img:p.img,
               price:parseInt(p.price.substring(1)),
               summary:p.summary,
               rate:0,
               categoryText:p.cate
            })
            if(p.imgs){
              _product.detailImgs =p.imgs
            }

            _product.save()

            //category的关系
           let _category = await Cate.findOne({
            name:p.category
           })

            //创建子类
            for(let i=0;i<p.category_child.length;i++){
              let child = p.category_child[i]
              let _child = await ChildCategory.findOne({
                name:child.title
              })

              if(!_child){
                _child =new ChildCategory({
                   name:child.title
                })

                

                await _child.save()

                _category.children.push(_child._id)
              }
            }

            //添加映射
            if(p.cate===null && p.cate===""){
              continue;
            }
            let child_category = await ChildCategory.findOne({
               name:p.cate
            })

            console.log(child_category)
     
            if(!_product.category && !child_category){
              _product.category =child_category._id
            }

            await _product.save()

            if(!child_category.products){
                child_category.products.push(_product._id)
            }else {
              if(child_category.products.indexOf(_product._id)===-1){
                child_category.products.push(_product._id)
              }
            }

            await child_category.save()

            await _category.save()

           }

        }
      }

      //导入banner 
      if(!existBanners.length){
         for(let i =0;i<banners.length;i++){
           let b = banners[i]
           let _banner = await Banner.findOne({
            img:b.img
           })

           if(!_banner){
             _banner =new Banner({
               title:'三只松鼠大礼包',
               img:b.img 
             })

             await _banner.save()

             for(let i=0;i<b.product_list.length;i++){
               let p =b.product_list[i]
               let _product =await Product.find({
                title:p.name
               })

               if(!_product.img){
                 _product =new Product({
                  title:p.name,
                  img:p.img,
                  price:parseInt(p.price.substring(1)),
                  summary:p.summary,
                  rate:0,
                  categoryText:p.cate
                 })

                 let category = await ChildCategory.findOne({
                   name:p.cate 
                 })
                 _product.category = category._id

                 await _product.save()

                 _banner.products.push(_product._id)

                 await _banner.save()
               }
             }
           }

         }
      }

      //导入主题
      if(!existSpecial.length){
        for(let i =0;i<specials.length;i++){
          let s = specials[i]
          let _special = await Special.findOne({
            title:s.title
          })

          if(!_special){
            _special =new Special({
              title:s.title,
              poster:s.img,
              summary:s.summary
            })

            await _special.save()

            for(let i=0;i<s.produts.length;i++){
              let p =s.produts[i]
              let _product =await Product.find({
               title:p.name
              })

              if(!_product.img){
                _product =new Product({
                 title:p.name,
                 img:p.img,
                 price:parseInt(p.price.substring(1)),
                 summary:p.summary,
                 rate:0,
                 categoryText:p.cate
                })

                let category = await ChildCategory.findOne({
                  name:p.cate 
                })

                if(category){

                }
                _product.category = category._id

                await _product.save()

                _special.products.push(_product._id)

                await _special.save()
              }
            }
          }

        }
     }

      console.log('导入数据库成功');
    })

}