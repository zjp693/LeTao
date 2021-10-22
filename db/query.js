var mysql = require("mysql");
var { dbConfig } = require("./dbconfig");

var pool = mysql.createPool(dbConfig);

// 封装sql查询函数
module.exports.query = (sql, value) => {
  return new Promise((resolve, reject) => {
    // 开始连接数据
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(sql, value, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        // Don't use the connection here, it has been returned to the pool.
        resolve(results);
      });
    });
  });
};
