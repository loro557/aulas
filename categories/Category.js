const Sequelize = require('sequelize');
// ../ para voltar diretorio abaixo
const connection = require('../database/database') 

const Category = connection.define('categories',{
    title:{
    	type: Sequelize.STRING,
    	allowNull: false
    },slug: {
    	type: Sequelize.STRING,
    	allowNull: false
    }
});



module.exports = Category;