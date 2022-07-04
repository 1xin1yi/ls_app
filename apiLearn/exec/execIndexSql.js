const {exec} = require('../unit/dbconfig')

// 首页轮播图
const getSwiper = () =>{
    let sql = `select * from i_swiper`
    return exec(sql)
}

module.exports = {
    getSwiper
}