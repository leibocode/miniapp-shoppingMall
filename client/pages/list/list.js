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
            text:'综合排序',
            status:true,
            price:'all'
        },{
            text:'价格升序',
            status:false,
            price:'asc'
        },{
            text:'价格降序',
            status:false,
            price:'desc'
        }],
        toggleStatus:'all',
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
        }],
        list_load_type:{
           key:'all',
           value:''
        }
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
                let list_type = {
                    key:'',
                    value:''
                }
                list_type.key = 'hostKey'
                list_type.value = hostKey
                that.setData({
                    productsArr:data,
                    list_load_type:list_type,
                    loading:true
                })
            })
        }
        else if(q){//q
            search.searchProducts({
                keyword:q,
                size:10,
                page:that.data.page
            },(data)=>{
                if(data.length>0){
                    search.addToHistory(q)
                }
                let list_type = {
                    key:'',
                    value:''
                }
                list_type.key = 'q'
                list_type.value =q
                that.setData({
                    productsArr:data,
                    list_load_type:list_type,
                    loading:true
                })
            })
        }
        else if(bid){//banner
            this.q =bid
            list.getProducts({
                _id:id,
                size:10,
                page:that.data.page
            },(data)=>{
                let list_type = {
                    key:'',
                    value:''
                }
                list_type.key = 'bid'
                list_type.value =bid
                that.setData({
                    productsArr:data[0].products,
                    list_load_type:list_type,
                    loading:true
                })
            })
        }else if(cid){//类型cid
            category.getProjectsCategory(cid,(data)=>{
                let list_type = {
                    key:'',
                    value:''
                }
                list_type.key = 'cid'
                list_type.value =cid
                that.setData({
                    productsArr:data.products,
                    loading:true,
                    list_load_type:list_type,
                })
            })
        }else {//没有什么条件
            let that =this
            product.getProducts({
                page:that.data.page,
                size:that.data.size,
                price:'all'
            },(data)=>{
                let list_type = {
                    key:'',
                    value:''
                }
                list_type.key = 'all'
                this.setData({
                    productsArr:data,
                    loading:true,
                    list_load_type:list_type
                })
            })
        }
       
    },
    _loadData:function(params,callback){
        var that = this
        switch(params.key){
            case 'all':
              product.getProducts({
                  page:params.page,
                  size:params.size,
                  price:params.price
              },(data)=>{
                 if(data.length>0){
                    let newProducts  =that.data.productsArr
                    let products = that.filterList(newProducts,data)
                    that.setData({
                        page:params.page,
                        loading:true,
                        productsArr:products,
                        isHideLoadMore:false
                    })
                 }else {
                    that.setData({
                        isHideLoadMore:true,
                        isShowFooter:false,
                        loading:true
                    })
                 }
              })
            break;
            case 'bid':
            break;
            case 'cid':
            break;
            case 'q':
            break;
            case 'hostKey':
            break;
        }
    },
    filterList:function(products,newData){
        let newProducts  =products
        data.forEach(item => {
            newProducts.push(item)
        });
        return newProducts
    },
    onPullDownRefresh:function(){
        console.log('下拉')
    },
     
    //上拉
    onReachBottom:function(){
        var that = this
        this.data.isHideLoadMore =true
        setTimeout(()=>{
            var params ={}
            params.page = this.data.page+1
            params.key = this.data.list_load_type.key
            params.value = this.data.list_load_type.value
            params.size = this.data.size
            params.price = this.data.toggleStatus
            this._loadData(params,(data)=>{
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
            text:'综合排序',
            status:false,
            price:'all'
        },{
            text:'价格升序',
            status:false,
            price:'asc'
        },{
            text:'价格降序',
            status:false,
            price:'desc'
        }]
        let status = search.getDataSet(event,'toggle')
        let status_z = this.data.commodity_attr_boxs[status].status
        let price = this.data.commodity_attr_boxs[status].price
        console.log(status_z)
        if(status_z){
        }else {
            commodity_attr_boxs[status].status = true
            //
            this.setData({
                commodity_attr_boxs:commodity_attr_boxs
            })
            product.getProducts({
                page:this.data.page,
                size:this.data.size,
                price:price
            },(data)=>{
                this.setData({
                    productsArr:data,
                    loading:true,
                    toggleState:price
                })
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