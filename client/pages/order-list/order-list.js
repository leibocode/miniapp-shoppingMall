
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
    },

    handlerTabTap(e) {
        console.log('handlerTapTap', e.currentTarget.dataset.index)
        this._updateSelectedPage(e.currentTarget.dataset.index);
    }
})