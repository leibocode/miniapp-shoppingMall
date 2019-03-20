import Http from '../utils/Http.js'

export default class Theme extends Http {
    constructor(){
        super();
    }
    
    getThemeDataById(id){
        this.request({
            url:`/api/v1/special/${id}`
        })
    }
}