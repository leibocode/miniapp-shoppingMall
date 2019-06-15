import config from './config'

const tips = {
    500:'抱歉,出现以后错误',
    401:'未授权,非内部人员,请联系管理人员为你开通账号',
}

export default class Http {
    constructor(){

    }
    request({url,data={},method='GET'}){
        return new Promise((resolve,reject)=>{
            this._request(url,resolve,reject,data,method)
        })
    }
    _request(url,resolve,reject,data,method){
        wx.request({
            url:config.dev +url,
            method:method,
            data:data,
            headers:{
                'content-type':'application/json'
            },
            success:(res)=>{
                let code = res.statusCode.toString()
                console.log(res)
                if (code.startsWith('2') && res.data.code ===0){
                    resolve(res.data.data)
                }else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail:(err)=>{
                this._show_error(500)
            }
        })
    }

    _show_error(error_code=500){
        if (!error_code) {
            error_code = 500
      
          }
          const tip = tips[error_code]
          wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
          })
    }

    getDataSet(event, key) {
        return event.currentTarget.dataset[key]
    }
}