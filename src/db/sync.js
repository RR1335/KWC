/**
 * @description 同步 
 */


const seq = require('./seq')

// require('./model')

seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

// force: true , 每次通过都会清空表
seq.sync({ force: true}).then(() => {
    console.log('同步 users table 成功！！！')
    process.exit()
})