var mysql = require('mysql');
var connection  = mysql.createConnection({
  host            : 'localhost',
  port            : 3306,
  user            : 'root',
  password        : '9355wmf123',
  database        : 'video_streaming'
});


connection.connect(function(err){
  if (err) {
  console.log('mysql error', err);
  throw err;
}else{
  console.log('mysql DB Connected');
}
});

module.exports = connection;
