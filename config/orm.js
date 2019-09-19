const connection = require("../config/connection.js");

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
        let queryString = "INSERT INTO" + tableName;

        queryString += " (";
		queryString += colNames.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(tableValues.length);
		queryString += ") ";
        console.log(queryString);
        connection.query(queryString, tableValues, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    updateOne: function(tableName, colName, condition, cb) {
        let queryString = "UPDATE " + tableName;

        queryString += " SET ";
        queryString += objToSql(colName);
        queryString += " WHERE ";
        queryString += condition;
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