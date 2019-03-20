import Http from '../utils/http.js'
export default class search extends Base {
    key ='q'
    max=10
    constructor(){
        super()
    }

    getHot(){
        return this.request({
            url:'/api/v1/search/hot'
        })
    }

    searchProducts(data){
        return this.request({
            url:'/api/v1/search',
            method:'POST',
            data:data
        })
    }

    deleteHot(){
        wx.removeStorageSync(this.key)
    }

    gitHistory(){
        let keywords =wx.getStorageSync(this.key)
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