const { Blog, User } = require('./model')

!(async function () {
    const san = await User.findOne({
        where: {
            userName: 'san'
        }
    })

    const blogListWithUser = await Blog.findAndCountAll({
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName','nickName'],
                where: {
                    userName: 'san'
                }
            }
        ]
    })
    console.log(
        'blogListWithUser: ',
        blogListWithUser.count,
        blogListWithUser.rows.map( blog => {
            const blogVal = blog.dataValues
            // const user = blogVal.user.dataValues 
            // user 来自 seq.define('user',) 而非 User
            blogVal.user = blogVal.user.dataValues

            return blogVal
        })
    )

})() 