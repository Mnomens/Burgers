const connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
}

let orm = {
    selectAll: function(tableName, cb) {
        let queryString = "SELECT * FROM" + tableName + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    insertOne: function(tableName, colNames, tableValues, cb) {
        let queryString = "INSERT INTO" + tableName + "("+ colNames.toString() + ") VALUES ("+ printQuestionMarks(tableValues.length) + ");";

        console.log(queryString);
        connection.query(queryString, tableValues, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne: function(tableName, colName, condition, cb) {
        let queryString = "UPDATE " + tableName + " SET "+ objToSql(colName) + " WHERE "+ condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    }
}

module.exports = orm;