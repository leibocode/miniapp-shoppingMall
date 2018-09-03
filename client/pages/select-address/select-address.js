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

    },
    _loadData:function(){
      //获取全部的地址信息  
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