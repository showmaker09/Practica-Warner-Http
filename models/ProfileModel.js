const { DataTypes } = require('sequelize');
const sequelize = require("../basedatos");


const Profile = sequelize.define('profile', 
 {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
})

module.exports = { Profile };