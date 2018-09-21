const app = getApp()

Page({
  data: {
    aboutUsTitle: '',
    aboutUsContent: '',
    servicePhoneNumber: '',
    balance: 0,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0,
    iconSize: 45,
    iconColor: '#999999',
    userInfo:null
  },
  onLoad:function(){
    console.log('onload')
  },
  onShow:function(){
    let that =this
    let userInfo =wx.getStorageSync('user')
    if(!userInfo){
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    }else {
      this.setData({
        userInfo:userInfo
      })
    }
  }
})