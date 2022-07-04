const{ 
getAlllogin, getLoginId, getDeletelogin, getPhone, getPhoneRegister,
getloginOne, getloginThree, getloginTwo, getloginCode, getinsertCode,
getDetail
} = require('../exec/execLoginSql')

const {currentTime} = require('../unit/currentTime')
const {testPhone, Phonecode} = require('../unit/testPhone')

const {ModelSuccess, ModelError} = require('../model/resModel')

const getloginAll = (req, res) => {
    const promise = getAlllogin()
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '查询成功',
                    data  
                },'查询所有用户信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '查询失败'
                },'查询所有用户信息')
            )
        }
    })
}

const getloginId = (req, res) => {
    const id = req.params.id
    const promise = getLoginId(id)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '查询用户成功',
                    data  
                },'根据用户id查询用户信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '没有找到该用户id'
                },'根据用户id查询用户信息')
            )
        }
    })
}

const getloginDelete = (req, res) => {
    const id = req.query.id
    const promise = getDeletelogin(id)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '删除用户成功',
                    data  
                },'根据用户id删除用户信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '没有找到该用户id，删除失败'
                },'根据用户id删除用户信息')
            )
        }
    })
}

// 注册手机号
const getRegisterPhone = (req, res) => {
    const user_img = 'https://i.loli.net/2021/11/24/D7SF1dlfzO2AcIL.jpg'
    const {phone,email,username,password} = req.body
    // 检测手机号是否合法
    //const flag = testPhone(phone)
    if(testPhone(phone)){
        const promise = getPhoneRegister(phone,email,username,password,currentTime(),user_img)
        promise.then((data) => {
            if(data.affectedRows === 1){
                const promise1 = getPhone(phone)
                promise1.then((data) => {
                    if(data.length > 0){
                        res.json(
                            new ModelSuccess({
                                'code': '200',
                                'msg': '注册成功',
                                data 
                            },'注册用户信息')
                        )
                    }
                   else{
                        res.json(
                            new ModelError({
                                'code': '400',
                                'msg': '注册失败'
                            },'注册用户信息')
                        )
                   } 
                })
            }
                
        })
    }else{
        res.json({
            'msg': '手机号不合法！'
        })
    }

}

// 验证手机号、用户名、邮箱是否注册
const getisPhone = (req, res) => {
    const {phone,username,email} = req.body
    const promise = getDetail(username,phone,email)
    promise.then((data) => {
        if(data.length === 0){
            res.json({
                'code': '200',
                'msg': '用户还未注册！'
            })
        }
        else{
            res.json(
                {
                    'code': '400',
                    'msg': '用户已被注册'
                })
        }
    })
}

// 发送验证码
const getCode = (req,res) => {
    const {phone} = req.body
    const promise = getPhone(phone)
    promise.then((data) => {
        if(data.length > 0){
            const phonecode = Phonecode(1000,9999)
            res.json({
                'code': '200',
                'msg': '手机号已注册过了',
                phonecode
            })
        }
        else{
            res.json(
                {
                    'msg': '该手机号还未注册！',
                    'code': '400'
                })
        }
    })
}

// 将验证码插入数据库中
const getInsertCode = (req, res) => {
    const {phone, code} = req.body
    const promise = getinsertCode(phone, code)
    promise.then((data) => {
        res.json({
            'code': '200',
            'msg': '更新成功！'
        })
    })
}

// 手机号验证码登录
const getCodelogin = (req, res) => {
    const {phone, code} = req.body
    const promise = getloginCode(phone,code)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '登录成功',
                    data  
                },'登录信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '登录失败'
                },'登录信息')
            )
        }
    })
}

// 用户名和密码 登录
const getOnelogin = (req, res) => {
    const {username,password} = req.body
    const promise = getloginOne(username,password)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '登录成功',
                    data  
                },'登录信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '登录失败'
                },'登录信息')
            )
        }
    })
}

// 手机号和密码 登录
const getTwologin = (req, res) => {
    const {phone,password} = req.body
    const promise = getloginTwo(phone,password)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '登录成功',
                    data  
                },'登录信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '登录失败'
                },'登录信息')
            )
        }
    })
}

// 邮箱和密码 登录
const getThreelogin = (req, res) => {
    const {email,password} = req.body
    const promise = getloginThree(email,password)
    promise.then((data) => {
        if(data.length > 0){
            res.json(
                new ModelSuccess({
                    'code': '200',
                    'msg': '登录成功',
                    data  
                },'登录信息')
            )
        }else{
            res.json(
                new ModelError({
                    'code': '400',
                    'msg': '登录失败'
                },'登录信息')
            )
        }
    })
}


module.exports = {
    getloginAll,
    getloginId,
    getloginDelete,
    getRegisterPhone,
    getThreelogin,
    getTwologin,
    getOnelogin,
    getCodelogin,
    getCode,
    getInsertCode,
    getisPhone
}