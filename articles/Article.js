const Sequelize = require('sequelize');
// ../ para voltar diretorio abaixo
const connection = require('../database/database');
// relacionar tabelas importe a outra tabela
// use ../ para voltar diretorio abaixo
const Category = require('../categories/Category');

const Article = connection.define('articles',{
    title:{
    	type: Sequelize.STRING,
    	allowNull: false
    },
    slug: {
    	type: Sequelize.STRING,
    	allowNull: false
    },
    body: {
    	type: Sequelize.TEXT,
    	allowNull: false
    }
});

// aqui se relaciona as tabelas

Category.hasMany(Article);// uma categoria pertence a varios artigos
Article.belongsTo(Category);// uma artigo pertence a uma categoria



module.exports = Article;