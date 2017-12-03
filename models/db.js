// models/db_board.js
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : 'localhost',
  user            : 'root',
  password        : '9355wmf123',
  database        : 'test'
});

// exports.함수명 = function(너어온 값, 콜백함수)
// data = 배열형식이다.
exports.write = function(data, callback){
	pool.getConnection(function(err, conn){
		if(err) return callback(err); // 오류가 발생시
		conn.query('insert into board(writer, title, content, pwd, hit, regdate) values(?,?,?,?,0,now())', data, function(err, row){
			var success = false;
			if(row.affectedRows == 1){
				// query 성공
				success = true;
			}
			conn.release();
			callback(success); // routes/index.js에서 db_board.write의 익명함수로 값이 넘어간다.
		});
	});
};

exports.list = function(page, callback){

  var size = 10; //글의 개수
  var begin = (page - 1) * size; //시작 글
  pool.getConnection(function(err, conn){

    if(err) {callback(err); return;}
    conn.query('select count(*) cnt from board', [], function(err, rows){

      if(err) {conn.release(); callback(err); return; }
      console.log('rows=', rows);

      var cnt = rows[0].cnt; //총 개수를 얻을 수 있음
      var totalPage = Math.ceil(cnt / size);
      var pageSize = 10;
      var startPage = (Math.ceil(page/pageSize) -1) * pageSize +1;
      // 17 / 10 = 1.7 -> 2 -> 1 ->       1 * 10 + 1 -> 11   11~20 보여주겠
      var endPage =  startPage + (pageSize -1);
      if(endPage > totalPage){ // 20 > 15
        endPage = totalPage; // 15
      }

      var max = cnt -((page - 1) * size);
      conn.query("select num, title, writer, content, pwd, hit, DATE_FORMAT(regdate, '%Y-%m-%d %H:%i:%s') regdate from board order by num desc limit ?,?",
          [begin, size], function(err,rows){
            if(err) {callback(err); conn.release(); return;}
            console.log('rows=', rows);
//					res.json(rows);
            var obj = {
              title : "게시판 리스트",
              rows : rows,
              page : page,
              pageSize : pageSize,
              startPage : startPage,
              endPage : endPage,
              totalPage : totalPage,
              max : max
            };
            conn.release();
            callback(obj);
          });
    	});
  	});
};
