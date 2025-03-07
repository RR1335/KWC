/**
 * @description  封装 sequelize 数据类型
 * @author       RR1335
 */

const Sequelize = require('sequelize')

module.exports = {
    STRING : Sequelize.STRING,
    DECIMAL : Sequelize.DECIMAL,
    BOOLEAN : Sequelize.BOOLEAN,
    INTEGER : Sequelize.INTEGER,
    TEXT  : Sequelize.TEXT
}