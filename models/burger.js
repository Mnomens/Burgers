const orm = require("../config/orm.js");

let burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(res) {
            cb(res);
        });
    },
    insertOne: function(colNames, tableValues, cb) {
        orm.insertOne("burgers", colNames, tableValues, function(res) {
            cb(res);
        });
    },
    updateOne: function(colName, condition, cb) {
        orm.updateOne("burgers", colName, condition, function(res) {
            cb(res);
        });
    }

};
module.exports = burger;