const seq = require('./seq')

require('./model')

seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('err')
})

seq.sync({ force: true}).then(() => {
    console.log('同步 users table 成功！！！')
    process.exit()
})