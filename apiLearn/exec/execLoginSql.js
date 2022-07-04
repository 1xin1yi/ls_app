const {exec} = require('../unit/dbconfig')

// 查询所有数据
const getAlllogin = () => {
    let sql = `select * from login`;
    return exec(sql);
}

// 查询ID语句
const getLoginId = (id) => {
    let sql = `select * from login where id=${id}`;
    return exec(sql);
}

// 删除sql语句
const getDeletelogin = (id) => {
    let sql=`delete from login where id = ${id}`
    return exec(sql)
}

// 检查phone是否存在语句
const getPhone = (phone) => {
    let sql = `select * from login where phone = ${phone}`
    return exec(sql)
}

// 注册手机号
const getPhoneRegister = (phone,email,username,password,create_time,user_img) => {
    let sql = `insert into login(phone,email,username,password,create_time,user_img) values('${phone}','${email}','${username}','${password}','${create_time}','${user_img}')`;
    return exec(sql)
}

// 用户名和密码 登录
const getloginOne = (username,password) => {
    let sql = `select * from login where username = '${username}' and password = '${password}'`
    return exec(sql)
}

// 手机号和密码 登录
const getloginTwo = (phone,password) => {
    let sql = `select * from login where phone = '${phone}' and password = '${password}'`;
    return exec(sql);
}

// 邮箱和密码 登录
const getloginThree = (email,password) => {
    let sql = `select * from login where email = '${email}' and password = '${password}'`
    return exec(sql)
}

// 手机号和验证码登录
const getloginCode = (phone,code) => {
    let sql = `select * from login where phone = '${phone}' and code = '${code}'`
    return exec(sql)
}

// 将发送的验证码插入到数据库中
const getinsertCode = (phone,code) => {
    let sql = `update login set code = '${code}' where phone = '${phone}'`
    return exec(sql)
}

// 根据手机号 用户名 邮箱 查询
const getDetail = (username, phone, email) => {
    let sql = `select * from login where username = '${username}' or phone = '${phone}' or email = '${email}'`
    return exec(sql)
}

module.exports = {
    getAlllogin,
    getLoginId,
    getDeletelogin,
    getPhone,
    getPhoneRegister,
    getloginOne,
    getloginTwo,
    getloginThree,
    getloginCode,
    getinsertCode,
    getDetail
}