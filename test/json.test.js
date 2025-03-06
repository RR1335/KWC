/**
 * @description 测试
 */

const server = require('../test/server')

// test('JSON 返回正确测试： ' , async () => {
//     const res = await server.get('/json')
//     expect(res.body).toEqual({
//         title: 'koa2 json'
//     })
//     expect(res.body.title).toBe('koa2 json')
// })

test('JSON 返回正确测试： ' , async () => {
    const res = await (await server.post('/login')).setEncoding({
        userName:'san',
        password:'123123'
    })
    // expect(res.body).toEqual({
    //     title: 'koa2 json'
    // })
    // expect(res.body.title).toBe('koa2 json')
})