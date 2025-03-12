const { Blog, User } = require('./model')

!(async function () {
    const san = await User.create({
        userName: 'san',
        password: '123',
        nickName: '三儿'
    })
    const sanId = san.dataValues.id 

    const blog1 = await Blog.create({
        title: '标题1',
        content: '内容 11111111111',
        userId:sanId
    })

})()