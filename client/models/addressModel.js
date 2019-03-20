import Http from '../utils/http.js'

export default class address extends Http {
    constructor(){
        super();
    }

    getaddressList(){
        return this.request({
            url:'/api/v1/address'
        })
    }

    postaddress(data){
        return this.request({
            url:'/api/v1/address',
            method:'POST',
            data:data
        })
    }

    setState(id,callback){
        return this.request({
            url:`/api/v1/address/${id}`,
            method:'put'
        })
    }

    editAddress(data,callback){
        return this.request({
            url:`/api/v1/address/${data.id}`,
            data:data,
            method:'PUT'
        })
    }

    getAddressById(id,callback){
        return this.request({
            url:`/api/v1/address/${id}`
        })
    }

    delAddressById(id,callback){
        return this.request({
            url:`/api/v1/address/${id}`,
            method:'delete'
        })
    }
}