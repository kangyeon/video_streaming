var db = require("../common/db");

exports.count = function(data, callback) {
  try {
    var query = 'select count(*) as count from user where '+data['row_name']+' = "'+data['value']+'"';
    db.query(query, function(err, row){
        if (!err) {
          callback(true, row);
        } else {
          callback(false, err);
        }
    });
  } catch(err) {

  }
}
