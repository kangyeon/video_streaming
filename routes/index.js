var express = require('express');
var router = express.Router();
var memberModel = require('../models/memberModel');
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    'id' : req.session.memId,
    'nickname' : req.session.memNm
  }

  res.render('index', data);

});

router.post('/login', function(req, res, next) {
    var data = req.body;
    memberModel.login(data, function(result, doc) {
 console.log(result);
        if (result) {
            req.session.login = true;
            req.session.memId = doc['id'];
            req.session.memNm = doc['nickname'];
        }
        res.json(doc);
    });
});

module.exports = router;
