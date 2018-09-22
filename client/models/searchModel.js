import Base from '../utils/base'
export default class search extends Base {
    key ='q'
    max=10
    constructor(){
        super()
    }

    getHot(callback){
        let param ={
            url:'/api/v1/search/hot',
            sCallback:function(data){
                data =data.data
                callback && callback(data)
            }
        }

        this.request(param)
    }

    searchProducts(data,callback){
        let params ={
            url:'/api/v1/search',
            method:'POST',
            data:data,
            sCallback:function(res){
                res =res.data
                callback(res)
            }
        }
        this.request(params)
    }

    deleteHot(){
        wx.removeStorageSync(this.key)
    }

    gitHistory(){
        let keywords =wx.getStorageSync(this.key)
        console.log(keywords)
        return keywords
    }

    addToHistory(word){
        let keywords = this.gitHistory()
        if(keywords){
            let index =keywords.indexOf(word)
            if(index==-1){
                let length =keywords.length
                if(length>= this.max){
                    keywords.pop(word)
                }
                keywords.unshift(word)
            }
            wx.setStorageSync(this.key,keywords)
        }else {
            keywords = [word]
            wx.setStorageSync(this.key, keywords)
        }
    }
}