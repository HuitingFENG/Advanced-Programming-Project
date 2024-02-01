const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
class User extends Model {}


User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  
    primaryKey: true,
    allowNull: false,
  },
  firstName: { 
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  // new columns:
  telephone: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  oldPassword: { 
    type: DataTypes.STRING,
    allowNull: true 
  },
  promotion: { 
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // year: { 
  //   type: DataTypes.STRING,
  //   allowNull: true
  // },
  company: { 
    type: DataTypes.JSON,
    allowNull: true
  },
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user',
});

module.exports = User;