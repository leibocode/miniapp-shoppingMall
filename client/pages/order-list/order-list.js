import regeneratorRuntime from '../../utils/runtime.js'
import Order from '../../models/orderModle'

const order =new Order()

Page({
    data:{
        tabs: ["待付款", "待发货", "待收货", "待评价", "已完成"],
        tabClass: ["", "", "", "", ""],
        stv: {
            windowWidth: 0,
            lineWidth: 0,
            offset: 0,
            tStart: false
        },
        activeTab: 0,
        loadingStatus: false,
        size:5,
        page:1,
        orderList:[]
    },

    onLoad:function(options){
        try{
            let { tabs } = this.data
            let res = wx.getSystemInfoSync()
            this.windowWidth =res.windowWidth
            this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length
            this.data.stv.windowWidth = res.windowWidth
            this.setData({
                stv:this.data.stv
            })
            this.tabsCount =tabs.length

        }catch(e){

        }
    },

    onShow:function(){
        //获取订单
        this.setData({
            loadingStatus:true
        })
        let that = this
        this.getOrderList()
    },

    getOrderList:function(){
        let that = this
        order.getOrders({
            page:that.data.page,
            size:that.data.size
        }).then((data)=>{
            console.log(data.length)
            if(data.length>0){
                // for(let i =0;i<data.length;i++){
                //     console.log(i)
                //     that.data.orderList.push(data[i])
                // }
                that.setData({
                    orderList:data
                })

                //这部分业务放到后端进行完成
                // //订单分类
                // let orderList =[]
                // console.log(that.data.tabs.length)
                // for(let i=0;i<that.data.tabs.length;i++){
                //     console.log(i+'索引')
                //     let tempList =[]
                //     for(let j= 0;j<data.length;i++){
                //         if(data[j].success== i){
                //             console.log(data[j])
                //             tempList.push(data[j])
                //         }
                //     }
                //     console.log('data值')
                //     console.log(tempList)
                //     orderList.push({
                //         'status':i,
                //         'isnull':tempList.length ===0,
                //         'orderList':tempList
                //     })
                // }
                // console.log(orderList)
                // that.setData({
                //     orderList:orderList
                // })
            }else {
                if(that.data.orderList.length>0){
                }else {
                    that.setData({
                        orderList:'null'
                    })
                }
            }
        })
    },

    statusTap:function(){

    },
    handlerTabTap(e) {
        console.log('handlerTapTap', e.currentTarget.dataset.index)
        this._updateSelectedPage(e.currentTarget.dataset.index);
    },

    orderDetail:function(event){
        let id = order.getDataSet(event,'id')
        console.log('订单id'+id)
        wx.navigateTo({
            url:'../orderDetail/orderDetail?id='+id
        })
    },

    cancelOrderTap:function(event){
        let that = this
        let id = order.getDataSet(event,'id')
        wx.showModal({
            title:'确认要取消该订单?',
            content:'',
            success:function(res){
                if(res.confirm){
                    wx.showLoading()
                    order.deleteOrder(id).then((data)=>{
                        that.onShow()
                        wx.hideLoading()
                    })
                }else {
                    wx.showLoading()
                }
            }
        })
    },
    //支付
    toPayTap:function(){
        wx.showModal({
            title:'支付错误',
            content:'由于个人号拿不到支付权限,支付功能暂时未开放',
            success:function(res){
                if(res.confirm){
                    search.deleteHot();
                    wx.navigateBack({})
                }
            }
        })
    },

    handlerStart(e) {
        console.log('handlerStart')
        let { clientX, clientY } = e.touches[0];
        this.startX = clientX;
        this.tapStartX = clientX;
        this.tapStartY = clientY;
        this.data.stv.tStart = true;
        this.tapStartTime = e.timeStamp;
        this.setData({ stv: this.data.stv })
    },

    handlerMove:function(event){
        console.log('handlerMove')
        let { clientX, clientY } = e.touches[0];
        let { stv } = this.data;
        let offsetX = this.startX - clientX;
        this.startX = clientX;
        stv.offset += offsetX;
        if (stv.offset <= 0) {
          stv.offset = 0;
        } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
          stv.offset = stv.windowWidth * (this.tabsCount - 1);
        }
        this.setData({ stv: stv });
    },

    handlerCancel:function(){

    },

    handlerEnd:function(event){
        console.log('handlerEnd')
        let { clientX, clientY } = e.changedTouches[0];
        let endTime = e.timeStamp;
        let { tabs, stv, activeTab } = this.data;
        let { offset, windowWidth } = stv;
        //快速滑动
        if (endTime - this.tapStartTime <= 300) {
          console.log('快速滑动')
          //判断是否左右滑动(竖直方向滑动小于50)
          if (Math.abs(this.tapStartY - clientY) < 50) {
            //Y距离小于50 所以用户是左右滑动
            console.log('竖直滑动距离小于50')
            if (this.tapStartX - clientX > 5) {
              //向左滑动超过5个单位，activeTab增加
              console.log('向左滑动')
              if (activeTab < this.tabsCount - 1) {
                this.setData({ activeTab: ++activeTab })
              }
            } else if (clientX - this.tapStartX > 5) {
              //向右滑动超过5个单位，activeTab减少
              console.log('向右滑动')
              if (activeTab > 0) {
                this.setData({ activeTab: --activeTab })
              }
            }
            stv.offset = stv.windowWidth * activeTab;
          } else {
            //Y距离大于50 所以用户是上下滑动
            console.log('竖直滑动距离大于50')
            let page = Math.round(offset / windowWidth);
            if (activeTab != page) {
              this.setData({ activeTab: page })
            }
            stv.offset = stv.windowWidth * page;
          }
        } else {
          let page = Math.round(offset / windowWidth);
          if (activeTab != page) {
            this.setData({ activeTab: page })
          }
          stv.offset = stv.windowWidth * page;
        }
        stv.tStart = false;
        this.setData({ stv: this.data.stv })
    },

    _updateSelectedPage(page){
        let { tabs, stv, activeTab } = this.data;
        activeTab = page;
        this.setData({ activeTab: activeTab })
        stv.offset = stv.windowWidth * activeTab;
        this.setData({ stv: this.data.stv })
    },
    handlerTabTap(e) {
        console.log('handlerTapTap', e.currentTarget.dataset.index)
        this._updateSelectedPage(e.currentTarget.dataset.index);
    },
    //事件处理
    swiperchange:function(event){
        let { tabs,stv,activeTab } = this.data
        activeTab = event.detail.current
        this.setData({
            activeTab:activeTab
        })
        stv.offset = stv.windowWidth * activeTab;
        this.setData({ stv: this.data.stv })
    }
})