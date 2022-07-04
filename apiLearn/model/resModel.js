/*
    数据模型
*/

class Model{
    constructor(data, apiTitle){
        this.data = data
        this.apiTitle = apiTitle
    }
}

class ModelSuccess extends Model{
    constructor(data, apiTitle){
        super(data, apiTitle)
        this.errno = 0
    }
}

class ModelError extends Model{
    constructor(data, apiTitle){
        super(data, apiTitle)
        this.errno = -1
    }
}

module.exports = {
    ModelSuccess,
    ModelError
}