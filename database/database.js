const Sequelize = require('sequelize');

const connection = new Sequelize('guiapresslite','loroboy','98817789loiro',{
    host: 'mysql669.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;