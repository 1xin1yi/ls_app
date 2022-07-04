/*
    当前时间
*/

const currentTime = () => {
    let date = new Date();
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')

    let hh = date.getHours().toString().padStart(2, '0')
    let min = date.getMinutes().toString().padStart(2, '0')
    let s = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hh}:${min}:${s}`
}


module.exports = {
    currentTime
}

