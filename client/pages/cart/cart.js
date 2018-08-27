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
        cart.execSetStorageSync(this.cart.data) 
    },
    //更新购物车商品数据
    _resetCartData:function(){
        
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
    changeCoounts:function(event){
        let id =cart.getDataSet(event,'id')
        let type =cart.getDataSet(event,'type')
        let index = this._getProductIndexById(id),
        counts=1
        if(type=='add'){
            cart.addCounts(id)
        }else{
            counts =-1
            cart.cutCounts(id)
        }

        this.data.cartData[index].counts += counts
        this._resetCartData()
    },

    _getProductIndexById:function(){

    },

    delete:function(){

    },

    toggleSelect:function(){

    },

    //全选
    toggleSelectAll:function(){

    },

    submitOrder:function(){

    }
})