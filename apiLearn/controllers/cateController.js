const { query } = require('express');
const {
    getcateAll,
    getcateId,
    getgoodsId,
    gethotgoods,
    getallgoods,
    getswiper,
    getgoods,
    getSearch
}= require('../exec/execCateSql')

const {ModelSuccess, ModelError} = require('../model/resModel')

// 分类列表
const getCate = (req, res) => {
    const promise = getcateAll();
    promise.then((data) => { 
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '获取商品列表成功！',
                    data
                },'商品列表信息')
            ) 
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取商品列表失败！',
                },'商品列表信息')
            ) 
        }
    })
}

// 根据分类商品Id查询
const getCateId = (req, res) =>{
    const cate_id = req.params.cate_id
    const promise = getcateId(cate_id)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
             new ModelSuccess({
                 'code': '200',
                 'msg': '获取分类列表成功！',
                 data
             },'分类列表信息')
            ) 
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取分类列表失败！',
                },'分类列表信息')
            ) 
        }
    })
}

// 根据商品id查询
const getGoodsId = (req, res) => {
    const goods_id = req.params.goods_id
    const promise = getgoodsId(goods_id)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
             new ModelSuccess({
                 'code': '200',
                 'msg': '获取商品详情列表成功！',
                 data
             },'商品详情列表信息')
            ) 
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取商品详情列表失败！',
                },'商品详情列表信息')
            ) 
        }
    })
}

// 热门商品
const getCatehot = (req, res) => {
    const promise = gethotgoods()
    promise.then((data) => {
        if(data.length > 0){
             res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '获取热门商品成功！',
                    data
                },'热门商品信息')
            )
        }
       else{
           res.json(
               new ModelError({
                   'code': '400',
                   'msg': '获取热门商品失败！',
                   data
               },'热门商品信息')
           )
       }
    })
}

// 所有商品信息
const getAllgoods = (req, res) => {
    const promise = getallgoods();
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '查询所有商品成功！',
                    data
                },'商品信息')
            )
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '查询所有商品失败！' 
                },'商品信息')
            )
        }
    })
}

// 商品详情轮播图
const getSwipergoods = (req, res) => {
    const goods_id = req.params.goods_id;
    const promise = getswiper(goods_id);
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '获取商品详情轮播图',
                    data
                },'商品详情轮播图信息')
            )
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取信息失败'
                },'商品详情轮播图信息')
            )
        }
    })
}

// 根据商品id查询商品信息
const getGood = (req, res) => {
    const {goods_id} = req.params
    const promise = getgoods(goods_id)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '获取商品信息成功！',
                    data
                },'商品信息')
            )
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '获取商品信息失败！'
                },'商品信息')
            )
        }
    })
}

// 搜索关键词信息
const getgoodsSearch = (req, res) => {
    const {keywords} = req.query
    const promise = getSearch(keywords)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '搜索成功！',
                    data
                },'搜索关键词信息')
            )
        }
        else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '搜索失败！'
                },'搜索关键词信息')
            )
        }
    })

}

module.exports = {
    getCate,
    getCateId,
    getGoodsId,
    getCatehot,
    getAllgoods,
    getSwipergoods,
    getGood,
    getgoodsSearch
}