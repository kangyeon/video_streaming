var db = require("../common/db");
var passwordHash = require('password-hash');

exports.insert = function(data, callback) {
 var query = 'INSERT INTO video (title, description, video_name, video_origin_name, user_sno, thumbnail_image)';
    query += ' VALUES ?';

    var values = [
        [data['title'], data['description'], data['video_name'], data['video_origin_name'], data['user_sno'], '']
    ];

    db.query(query, [values], function(err, result){
        if (!err) {
          callback(true, result);
        } else {
          callback(false, err);
        }
    });

}

exports.count = function(data, callback) {
  try {
    var query = 'select count(*) as count from video';
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
exports.limitPage = function(data, callback) {
  try {
    var start = (data['page']-1) * 12;
    var end = start+12;

    var query = 'select *  from video limit '+start+', '+end;
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

exports.getVideo = function(data, callback) {
  try {
    var start = (data['page']-1) * 12;
    var end = start+12;

    var query = 'select *  from video where sno = '+data['sno'];
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


exports.update_count = function(data, callback) {
  try {
    var query = 'update video set count = count+1 where sno = "' +data['sno']+'"';
    db.query(query, function(err, result){
    console.log(result);
        if (!err) {
          callback(true, result);
        } else {
          callback(false, err);
        }
    });
  } catch(err) {

  }
}