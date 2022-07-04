var express = require('express');
var router = express.Router();
const cate = require('../controllers/cateController')

router.get('/all', cate.getCate);

router.get('/cateid/:cate_id', cate.getCateId);

router.get('/goodsid/:goods_id', cate.getGoodsId);

router.get('/hotgoods', cate.getCatehot);

router.get('/allgoods', cate.getAllgoods);

router.get('/swiper/:goods_id', cate.getSwipergoods);

router.get('/categoods/:goods_id', cate.getGood);

router.get('/search', cate.getgoodsSearch)

module.exports = router;
