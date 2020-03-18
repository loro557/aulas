const Sequelize = require('sequelize');
// ../ para voltar diretorio abaixo
const connection = require('../database/database') 

const User = connection.define('users',{
    email:{
    	type: Sequelize.STRING,
    	allowNull: false
    },password: {
    	type: Sequelize.STRING,
    	allowNull: false
    }
});

//User.sync({force: true});

module.exports = User;