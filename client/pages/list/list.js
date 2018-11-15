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
        isHideLoadMore:true,
        isShowFooter:true,
        commodity_attr_boxs:[{
            text:'价格升序',
            status:true
        },{
            text:'价格降序',
            status:false
        }],
        isAsc:false,
        tabs:[{
            text:'排序',
            isModal:true,
            selected:false,
            showIcon:false
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
        let id =options.id
        let q =options.q
        let cid =options.cid
        let bid =options.bid
        let hostKey =options.hostKey
        if(id){
            console.log('进入id')
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
                    loading:true
                })
            })
        }else if(cid){
            console.log(cid)
            category.getProjectsCategory(cid,(data)=>{
                console.log(data)
                that.setData({
                    productsArr:data.products,
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
    _loadData:function(q,page,size,callback){
        const that = this
        search.searchProducts({
            keyword:q,
            size:size,
            page:page
        },(data)=>{
            console.log(data)
            if(data.length>0){
                let newProducts  =that.data.productsArr
                data.forEach(item => {
                    newProducts.push(item)
                });
                that.setData({
                    page:page,
                    loading:true,
                    productsArr:newProducts,
                    isHideLoadMore:false
                })
            }else {
                console.log('没有数据了')
                this.setData({
                    isHideLoadMore:true,
                    isShowFooter:false,
                    loading:true
                })
            }
            

        })
    },
    onPullDownRefresh:function(){
        console.log('下拉')
    },
     
    //上拉
    onReachBottom:function(){
        var that = this
        this.data.isHideLoadMore =true
        setTimeout(()=>{
            var newPage = this.data.page+1
            var q = this.data.q
            var size = this.data.size
            this._loadData(q,newPage,size,(data)=>{
                console.log('下拉加载结束..')
            })
        },1500)
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
    //切换状态
    toggleState:function(event){
        let commodity_attr_boxs=[{
            text:'价格升序',
            status:false
        },{
            text:'价格降序',
            status:false
        }]
        let status = search.getDataSet(event,'toggle')
        let status_z = this.data.commodity_attr_boxs[status].status
        console.log(status_z)
        if(status_z){
        }else {
            commodity_attr_boxs[status].status = true
            //
            this.setData({
                commodity_attr_boxs:commodity_attr_boxs
            })
        }
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