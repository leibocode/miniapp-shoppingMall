import List from '../../models/listModel'
import Search from '../../models/searchModel'
import Category from '../../models/categoryModel' 
import Product from '../../models/productModel'
const list =new List()
const search =new Search()
const category =new Category()
const product =new Product() 


Page({
    data:{
        id:0,
        sortArr:[],
        page:1,
        loading:false,
        loadingCenter:false,
        q:'',
        productsArr:[],
        size:10,
        count:0,
        commodity_attr_boxs:[{
            text:'价格升序',
            status:false
        },{
            text:'价格降序',
            status:false
        }],
        isAsc:false,
        tabs:[{
            text:'排序',
            isModal:true,
            selected:true
        },{
            text:'销量',
            selected:false
        },{
            text:'时间',
            selected:false
        }]
    },
    onLoad:function(options){
        let that = this
        let sortArr =[
            {classname: 'icon_bg_1', name: '价格升序', sortType: '1'},
            {classname: 'icon_bg_2', name: '价格降序', sortType: '2'}
        ]
        let id =options.id
        let q =options.q
        let cid =options.cid
        let bid =options.bid
        let hostKey =options.hostKey
        if(id){
            this.q =id
            list.getProducts({
                _id:id,
                size:10,
                page:that.data.page
            },(data)=>{
                console.log(data)
                console.log(data.products);
                that.setData({
                    productsArr:data.products,
                    sortArr:sortArr,
                    loading:true
                })
            })
        }else if(hostKey){
            search.searchProducts({
                keyword:hostKey,
                size:10,
                page:that.data.page
            },(data)=>{
                that.setData({
                    productsArr:data,
                    q:hostKey,
                    sortArr:sortArr,
                    loading:true
                })
            })
        }
        else if(q){
            search.searchProducts({
                keyword:q,
                size:10,
                page:that.data.page
            },(data)=>{
                if(data.length>0){
                    search.addToHistory(q)
                }
                that.setData({
                    productsArr:data,
                    q:q,
                    sortArr:sortArr,
                    loading:true
                })
            })
        }
        else if(bid){
            this.q =bid
            list.getProducts({
                _id:id,
                size:10,
                page:that.data.page
            },(data)=>{

                that.setData({
                    productsArr:data[0].products,
                    sortArr:sortArr,
                    loading:true
                })
            })
        }else if(cid){
            console.log(cid)
            category.getProjectsCategory(cid,(data)=>{
                console.log(data)
                that.setData({
                    productsArr:data.products,
                    sortArr:sortArr,
                    loading:true
                })
            })
        }else {
            let that =this
            product.getProducts({
                page:that.data.page,
                size:that.data.size
            },(data)=>{
                this.setData({
                    productsArr:data,
                    loading:true
                })
            })
        }
       
    },
    _loadData:function(){
        const that = this
        let newPage = this.data.page +1

        search.searchProducts({
            keyword:that.data.q,
            size:that.data.size,
            page:newPage
        },(data)=>{
            if(data.length>0){
                let newProducts  =that.data.productsArr
                data.forEach(item => {
                    newProducts.push(item)
                });
                that.setData({
                    page:newPage,
                    loading:false,
                    productsArr:newProducts
                })
            }else {
                wx.stopPullDownRefresh()
                that.setData({
                    loading:false
                })
            }

        })
    },
    onPullDownRefresh:function(){
        console.log('下拉')
    },
    onReachBottom:function(){
        let that = this
        this.setData({
            loading:true
        })
        setTimeout(()=>{
            this._loadData()
        },1000)
    },
    onProductItemTap:function(event){
        const id = list.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    },
    showModal:function(event){
        let flag = list.getDataSet(event,'modal')
        console.log(flag+'flag')
        if(!flag){
            return 
        }
        let animation =wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(0).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
              animationData: animation.export()
            })
          }.bind(this), 200)
    },
    hideModal: function () {
        // 隐藏遮罩层
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: "linear",
          delay: 0
        })
        this.animation = animation
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
        })
        setTimeout(function () {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export(),
            showModalStatus: false
          })
        }.bind(this), 200)
      }

})