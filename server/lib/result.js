export default class Result {
    constructor(error,data){
        this.code = error.status,
        this.message = error.message,
        this.data = data
    }   
}

