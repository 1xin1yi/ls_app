const {getSwiper} = require('../exec/execIndexSql')
const {ModelSuccess, ModelError} = require('../model/resModel')

const getswiper = (req, res) => {
    const promise = getSwiper();
    promise.then((data) => {
        if(data.length > 0) {
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '获取轮播图列表成功！',
                    data
                },'轮播图列表信息')
            )
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取轮播图列表失败！',
                },'获取失败')
            )
        }
    })
}

module.exports = {
    getswiper
}