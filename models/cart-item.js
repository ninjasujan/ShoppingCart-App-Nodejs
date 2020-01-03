
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const cartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = cartItem;