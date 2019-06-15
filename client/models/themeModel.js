import HTTP from '../utils/http.js'

export default class Theme extends HTTP {
    constructor(){
        super();
    }
    
    getThemeDataById(id){
        return this.request({
            url:`/api/v1/special/${id}`
        })
    }
}