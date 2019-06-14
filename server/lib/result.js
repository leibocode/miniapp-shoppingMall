export default class Result {
    constructor(error,data){
        this.code = this.status,
        this.message = error.message,
        this.data = data
    }   
}

