const {exec} = require('../unit/dbconfig')

const getcateAll = () => {
    let sql = `select * from cate`
    return exec(sql)
}

// 根据分类id查询
const getcateId = (cate_id) => {
    let sql = `select * from cate_goods where cate_id = ${cate_id}`
    return exec(sql)
}

// 根据商品id查询商品详情
const getgoodsId = (goods_id) => {
    let sql = `select * from cate_detail where goods_id = ${goods_id}`
    return exec(sql)
}

// 热门商品
const gethotgoods = () => {
    let sql = `select * from cate_hot`
    return exec(sql)
}

// 所有商品
const getallgoods = () => {
    let sql = `select * from cate_goods`
    return exec(sql)
}

// 商品详情轮播图
const getswiper = (goods_id) => {
    let sql = `select * from goods_swiper where goods_id = ${goods_id}`;
    return exec(sql)
}

// 根据商品id查询商品xinxi
const getgoods = (goods_id) => {
    let sql = `select * from cate_goods where goods_id = ${goods_id}`
    return exec(sql)
}

// 关键词搜索
const getSearch = (keywords) => {
    let sql = `select * from cate_goods where goods_name like '%${keywords}%'`
    return exec(sql)
}

module.exports = {
    getcateAll,
    getcateId,
    getgoodsId,
    gethotgoods,
    getallgoods,
    getswiper,
    getgoods,
    getSearch
}