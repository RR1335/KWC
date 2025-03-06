/**
 * @description TEST Demo
 */


function sum (a,b) {
    return a + b
}


test('test demo ', () => {
    const res = sum(10,20)
    expect(res).toBe(30)
})