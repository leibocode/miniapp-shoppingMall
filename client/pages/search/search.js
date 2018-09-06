import Search  from '../../models/searchModel'

const search =new Search()
Page({
    data:{
        historyKeys:[],
        hotKeys:[],
        finished:false,
        history:false,
        q:'',
        loading:false,
        loadingCenter:false, 
        productsArr:[],
        page:1
    },
    Load:function(){
        this.setData({
            historyKeys:search.gitHistory()
        })

        search.getHot((data)=>{
            this.setData({
                hotKeys:data
            })
        })
    }, 
    onCancel:function(){
        wx.navigateTo({
            url:'../page/home/home'
        })
    },
    ondeleteHis:function(){
        wx.showModal({
            title:'提示',
            content:'清空搜索历史',
            success:function(res){
                if(res.confirm){
                    search.deleteHot();
                    this
                }
            }
        })
    },
    //清空搜索词
    onDelete:function(event){
        this.setData({
            finished:false,
            empty:false,
            q:''
        })
    }, 
    onCancelSearch:function(){
        let that =this
        wx.showModal({
            title:'提示',
            content:'清空搜索历史',
            success:function(res){
                if(res.confirm){
                    search.deleteHot();
                    
                }
            }
        })
    },
    onConfirm:function(event){
        console.log('11')
        let that =this
        this.setData({
            finished:true, 
            loadingCenter:true
        })

        let q =event.detail.value || event.detail.text
        console.log(q)
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
                loadingCenter:false
            })
        })
    },
    onPullDownRefresh:function(){

        setTimeout(()=>{
            this._loadMore()
            
            //系统的方式x
            wx.stopPullDownRefresh()
        },1500)
    },
    _loadMore:function(){
        let that =this
        if(!this.data.q){
            return
        }

        this.setData({
            loading:true
        })
        let newPage = that.data.page 
        search.searchProducts({
            keyword:that.data.q,
            page:newPage,
            size:10
        },(data)=>{

        })
    }, 
    onProductItemTap:function(event){
        var id =model.getDataSet(event,'id')
        wx.navigateTo({
            url:'../product/product?id='+id
        })
    }
})