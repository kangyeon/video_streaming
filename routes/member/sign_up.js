var express = require('express');
var router = express.Router();
var memberModel = require('../../models/memberModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/sign_up');
});

router.post('/confirm_repetition', function(req, res, next){
  memberModel.count({"row_name" : req.body['row_name'], "value" : req.body['value']}, function(result, doc) {
    res.json({'count':doc[0]['count']});
  });

})
module.exports = router;
