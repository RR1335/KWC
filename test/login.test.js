/**
 * @description  User API test
 * @author       RR1335
 */

const server = require('./server')

// 用户信息
const  userName = `U_${Date.now()}`
const  password = `P_${Date.now()}`

const  testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储 Cookie 
let COOKIE = ''

// 注册
test('注册一个用户：' , async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    
    expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户，应该失败：', async () => {
    const res = await server
    .post('/api/user/register')
    .send(testUser)

    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册用户名是否存在，存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName})

    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('json schema 检测，非法的格式，注册应该失败', async () => {
    const res = await server 
        .post('/api/user/register')
        .send({
            userName: '12901',
            password: 'a1',
            gender: 'good'
        })

    expect(res.body.errno).not.toBe(0)
})

//登录
test('登录，成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)

    // 获取COOKIE
    COOKIE = res.headers['set-cookie'].join(';')
})


//删除 
test('删除，成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)

        expect(res.body.errno).toBe(0)
})

// 查询用户  删除后不存在
test('查询注册用户名是否存在，存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName})

    expect(res.body.errno).not.toBe(0)
})