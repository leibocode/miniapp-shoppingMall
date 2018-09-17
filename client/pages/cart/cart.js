import Cart from '../../models/cartModel'
let cart =new Cart()
let x1 =0
let x2=0
Page({
    data:{
        loading:false,
        selectCounts:0,
        selectedTypeCounts:0
    },
    onLoad:function(){

    },
    onShow:function(){
        let cartData =cart.getCartDataFromLocal()
        let countsInfo =cart.getCartToTalCounts()

        this.setData({
            selectCounts:countsInfo.counts1,
            selectedTypeCounts:countsInfo.counts2,
            account:this._calcTotalAccountAndCounts(cartData).account,
            loading:true,
            cartData:cartData
        })
    },
    onHide:function(){
        cart.execSetStorageSync(this.data.cartData) 
    },
    //更新购物车商品数据
    _resetCartData:function(){
        let newData =this._calcTotalAccountAndCounts(this.data.cartData)
        console.log(newData)
        this.setData({
            account: newData.account,
            selectedCounts:newData.selectedCounts,
            selectedTypeCounts:newData.selectedTypeCounts,
            cartData:this.data.cartData
        })
    },

    //计算总金额和选择的商品总数
    _calcTotalAccountAndCounts:function(data){
        let len = data.length,
            account =0,
            selectedCounts=0,
            selectedTypeCounts =0;
        let multiple =100;
        for(let i=0;i<len;i++){
            if(data[i].selectStatus){
                account += data[i].counts * multiple *Number(data[i].price) * multiple;
                selectedCounts += data[i].counts
                selectedTypeCounts++
            }

        }
        return {
            selectCounts:selectedCounts,
            selectedTypeCounts:selectedCounts,
            account:account/(multiple* multiple)
        }
    },

    //调整商品数目
    changeCounts :function(event){
        let id =cart.getDataSet(event,'id')
        let type =cart.getDataSet(event,'type')
        let index = this._getProductIndexById(id),
            counts=1;
        console.log(id)
        console.log(index)
        
        if(type=='add'){
            cart.addCounts(id)
        }else{
            counts =-1
            cart.cutCounts(id)
        }

        this.data.cartData[index].counts += counts
        this._resetCartData()
    },

    //获取商品坐所咋的下标
    _getProductIndexById:function(id){
        let data = this.data.cartData
        let len = data.length
        for(let i =0;i<len;i++){
           if(data[i]._id===id){
               return i
           }
        }
    },

    //删除商品
    delete:function(event){
        let id =cart.getDataSet(event,'id'), 
            index =this._getProductIndexById(id);
        console.log(id)
        console.log(index)
        this.data.cartData.splice(index,1)

        this._resetCartData();
    },

    //选择商品 
    toggleSelect:function(event){
        let id =cart.getDataSet(event,'id'),
            status =cart.getDataSet(event,'status'),
            index =this._getProductIndexById(id);
        console.log(id)
        console.log(status)
        console.log(index)
        this.data.cartData[index].selectStatus != status;
        console.log()
        this._resetCartData();
    },

    //全选
    toggleSelectAll:function(event){
        let status =cart.getDataSet(event,'status')==='true'
        let data=this.data.cartData,
            len=data.length;
        for(let i=0;i<len;i++) {
            data[i].selectStatus=!status;
        }
        this._resetCartData();
    },

    //提交订单
    submitOrder:function(){
        wx.navigateTo({
            url:'../order/order'
        })
    },

    onProductSItemTap:function(event){
        let id  =cart.getDataSet(event,'id')
        wx.navigateTo({
            url:"../product/product?id="+id
        })
    },

    toListPage:function(){
        wx.navigateTo({
            url:'../list/list'
        })
    }
})