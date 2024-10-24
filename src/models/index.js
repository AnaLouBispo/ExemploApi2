const fs = require('fs');

const path = require('path');

const db = []

const sequelize=require('../config/database');
fs.readdirSync(__dirname)
.filter(file => file !== 'index.js')
.forEach(file => {
    const model = require(path.join(__dirname,file));
    // db[user] = model user
    db[model.name] = model;
});

sequelize.sync();

module.exports = {sequelize, ...db};        