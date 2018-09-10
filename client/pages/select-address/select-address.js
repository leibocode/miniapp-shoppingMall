import Address from '../../models/addressModel'

const address =new Address()

Page({
    data:{
        addressList:[]
    },
    
    onLoad:function(){
        console.log('onLoad')
    },

    onShow:function(){
        this._loadData()
    },
    //获取的地址信息
    _loadData:function(){
        let that = this
        address.getaddressList((data)=>{
            this.setData({
                addressList:data
            })
        })
    },

    selectTap:function(event){
        let id =address.getDataSet(event,'id')
    },

    addAddress:function(){
        wx.navigateTo({
            url:'/pages/address-add/address-add'
        })
    },
    editAddress:function(event){
        let id =address.getDataSet(event,'id')
        wx.navigateTo({
            url:'/pages/address-add/address-add?id='+id
        })
    },


})