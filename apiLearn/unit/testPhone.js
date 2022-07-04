
/*
    检测手机号是否合法
*/

const testPhone = (phone) => {
    let reg = /^1[2-9]{1}[1-9]{9}$/
    if(reg.test(phone)){
        return true;
    }
    return false;
}

/*
    自动生成4位验证码
*/
const Phonecode = (min,max) => {
    return Math.ceil(Math.random() * (max-min)) + min
}

module.exports = {
    testPhone,
    Phonecode
}