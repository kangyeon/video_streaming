var db = require("../common/db");
var passwordHash = require('password-hash');

exports.insert = function(data, callback) {
 var query = 'INSERT INTO user (id, password, nickname)';
    query += ' VALUES ?';

    var values = [
        [data['id'], data['password'], data['nickname']]
    ];

    db.query(query, [values], function(err, result){
        if (!err) {
          callback(true, result);
        } else {
          callback(false, err);
        }
    });

}