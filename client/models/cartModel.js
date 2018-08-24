import Base  from '../utils/base.js'

export default class Cart extends Base {
    constructor(){
        super();
        this._storageKeyName ='cart'
    }

    /**
     * 
     * @param {*} flag 
     */
    getCartDataFromLocal(flag){
        let res =wx.getStorageSync(this._storageKeyName)
        if(!res){
            res =[]
        }

        //过滤掉不下单的商品
        if(flag){
            var newRes=[]
            for(let i=0;i<res.length;i++){
                if(res[i].selectStatus){
                    newRes.push(res[i])
                }
            }

            res = newRes
        }
        return res 
    }

    /**
     * 
     * @param {*} flag 
     */
    getCartToTalCounts(flag){
        let data = this.getCartDataFromLocal()
        let counts1 =0
        let counts2 =0
        for(let i =0;i<data.length;i++){
            if (flag){
                if(data[i].selectStatus) {
                    counts1 += data[i].counts;
                    counts2++;
                }
            }else{
                counts1 += data[i].counts;
                counts2++;
            }
        }

        return {
            counts1:counts1,
            counts2:counts2
        }
    }

    /**
     *
     *
     * @param {*} data
     * @memberof Cart
     */
    execSetStorageSync(data){
        wx.setStorageSync(this._storageKeyName,data)
    }

    /**
     *加入购物车 
     *
     * @param {*} item 商品对象
     * @param {*} counts 商品数目
     * @memberof Cart
     */
    add(item,counts){
        let cartData = this.getCartDataFromLocal()
        console.log('购物车的值')
        console.log(cartData) 
        if(!cartData){
            cartData =[]
        }
        let isHeadInfo = this._isHasThatOne(item._id,cartData)
        //新商品
        if(isHeadInfo.index === -1){
            item.counts =counts
            item.selectStatus =true
            cartData.push(item)
        }else {
            cartData[isHeadInfo.index].counts+=counts;
        }
        this.execSetStorageSync(cartData)
        return cartData
    }
    /**
     *修改商品数目
     *
     * @param {*} _id 商品_id
     * @param {*} counts 数目
     * @memberof Cart
     */
    _changeCounts(_id,counts){
        let cartData = this.getCartDataFromLocal()
        let hasInfo = this._isHasThatOne(_id,cartData)
        
        if(hasInfo.index !=-1){
            if(hasInfo.data.counts>1){
                cartData[hasInfo.index].counts+=counts;
            }
        }
        this.execSetStorageSync(cartData);
    }

    addCounts(_id){
        this._changeCounts(_id,1)
    }

    cutCounts(_id){
        this._changeCounts(_id,-1)
    }
    /**
     *判断是否存在当前商品
     *
     * @param {*} _id 商品 _id 
     * @param {*} arr 商品列表
     * @memberof Cart
     */
    _isHasThatOne(_id,arr){ 
        let item
        let result ={index:-1}
        console.log('空值')
        console.log(arr)
        for(let i=0;i<arr.length;i++){
            item =arr[i]
            if(item._id ==_id){
                result ={
                    index:i,
                    data:item
                }
            }
        }
        return result
    }

    /**
     *删除一些商
     *
     * @param {*} _ids
     * @memberof Cart
     */
    delete(_ids){

    } 
}