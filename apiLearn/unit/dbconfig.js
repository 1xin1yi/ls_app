const mysql = require('mysql');
 const option = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'exapp'
};

// 连接数据库，使用连接池连接数据库
sqlConnect = (sql,sqlArr,backcall) => {
    let pool = mysql.createPool(option);
    pool.getConnection((err,conn) => {
        console.log('123456')
        if(err){
            console.log('连接失败')
            return;
        }
        // 事件驱动回调
        conn.query(sql,sqlArr,backcall);
        // 释放连接
        conn.release();
    })
},     
exec = (sql) => {
    const promise = new Promise((resolve,reject) => {
        let pool = mysql.createPool(option);
        pool.getConnection((err,conn) => {
            console.log('123456')
            if(err){
                console.log('连接失败')
                return;
            }
            // 事件驱动回调
            conn.query(sql,(err, data) => {
                if(err){
                    reject(err)
                    return
                }
                else{
                    console.log('data',data)
                    resolve(data)
                }
            });
            // 释放连接
            conn.release();
        })
   
    })
    return promise
}
module.exports = {
   sqlConnect,
    exec
}