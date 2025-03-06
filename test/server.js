/**
 * @description jest , supertest 测试
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)