var express = require('express');
var router = express.Router();
var memberModel = require('../../models/memberModel');
var passwordHash = require('password-hash');
var fs =require('fs')
var path =  require('path');
var __video_repository_path = __dirname+"/../../video_repository/";

__create_folder = function(id) {
    var directory_name = id;
    var directory_path = __video_repository_path+directory_name;
    if (!fs.existsSync(directory_path)) {
        fs.mkdir(directory_path, 0777, function(err){
            if(err){
                return false;
            }else{
                console.log('create newDir');
                return true;
            }
	    });
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.session.login) {
    res.send('<script>alert("세션 정보가 있습니다."); location.href="/"</script>');
  }
  res.render('member/sign_up');

});

router.post('/confirm_repetition', function(req, res, next){
  memberModel.count({"row_name" : req.body['row_name'], "value" : req.body['value']}, function(result, doc) {
    res.json({'count':doc[0]['count']});
  });

});

router.post('/join', function(req, res, next){
  var data = req.body;
  data['password'] = passwordHash.generate(data['password']);
  if (!data['id']) {
     res.json(
            {
                'result' : true,
                'affectedRow' : result.affectedRow,
                'message' : '아이디를 입력해 주세요'
            }
     );

  }
  if (!data['password']) {
     res.json(
            {
                'result' : true,
                'affectedRow' : result.affectedRow,
                'message' : '패스워드를 입력해 주세요'
            }
     );

  }
  if (!data['nickname']) {
     res.json(
            {
                'result' : true,
                'affectedRow' : result.affectedRow,
                'message' : '닉네임을 입력해 주세요'
            }
     );

  }
  memberModel.join(data, function(result, doc){
     if (result) {
        __create_folder(data['id']);
        res.json(
            {
                'result' : true,
                'affectedRow' : result.affectedRow,
                'message' : '회원가입에 성공하셨습니다'
            }
        );
     } else {
        res.json(
            {
                'result' : false,
                'affectedRow' : result.affectedRow,
                'message' : '회원가입에 실패하셨습니다'
            }
        );
     }
  });
});
module.exports = router;
