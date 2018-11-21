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
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
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