var express = require('express');
var router = express.Router();
var memberModel = require('../../models/memberModel');
var passwordHash = require('password-hash');
var session = require('express-session')
/* GET home page. */
router.get('/', function(req, res, next) {
console.log(req.session);
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
