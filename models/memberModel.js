var db = require("../common/db");
var passwordHash = require('password-hash');

exports.count = function(data, callback) {
  try {
    var query = 'select count(*) as count from user where '+data['row_name']+' = "'+data['value']+'"';
    db.query(query, function(err, result){
        if (!err) {
          callback(true, result);
        } else {
          callback(false, err);
        }
    });
  } catch(err) {

  }
}

exports.join = function(data, callback) {
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

exports.login = function(data, callback) {
    var query = 'select * from user where id = "'+data['id']+'"';

    db.query(query, function(err, result){

        if (result.length) {
            if (!err) {
               if(passwordHash.verify(data['password'], result[0]['password'])) {
                  callback(true,
                      {
                        'message' : '로그인 되셨습니다.',
                        'id' : result[0]['id'],
                        'nickname' : result[0]['nickname'],
                        'sno' : result[0]['sno']
                      }
                  );
               } else {
                  callback(false, {'message' : '패스워드가 일치하지 않습니다.'});
               }
            } else {
               callback(false, err);
            }
        } else {
               callback(false, {'message' : "조회된 아이디가 업습니다"});
        }
    });
}

exports.getName = function(data, callback) {
    var query = 'select id from user where sno = "'+data['sno']+'"';
    db.query(query, function(err, result){
        if (result.length) {
            if (!err) {
                callback( true,result);
            } else {
               callback(false, err);
            }
        }
    });
}