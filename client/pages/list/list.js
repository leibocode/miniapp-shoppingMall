import List from '../../models/listModel'
import Search from '../../models/searchModel'
import Category from '../../models/categoryModel' 
const list =new List()
const search =new Search()
const category =new Category()

Page({
    data:{
        id:0,
        sortArr:[],
        page:1,
        loading:false,
        loadingCenter:false,
        q:'',
        productsArr:[]
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
        this.q =q
        if(id){
            list.getProducts({
                _id:id,
                size:10,
                page:that.data.page
            },(data)=>{
                console.log(data);
                that.setData({
                    productsArr:data.products,
                    sortArr:sortArr
                })
            })
        }

        if(q){
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
                    sortArr:sortArr
                })
            })
        }

        if(cid){
            console.log(cid)
            category.getProjectsCategory(cid,(data)=>{
                console.log(data)
                that.setData({
                    productsArr:data[0].products,
                    sortArr:sortArr
                })
            })
        }
       
    },
    onPullDownRefresh:function(){
        
    },
    onProductItemTap:function(event){
        const id = list.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    }
})