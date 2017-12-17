var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var __video_repository_path = __dirname+"/../../public/video_repository/";
var videoModel = require('../../models/videoModel');
var memberModel = require('../../models/memberModel');
var async = require('async');
/* GET home page. */

router.get('/', function(req, res, next) {
  if (!req.session.login) {
    res.send('<script>alert("세션 정보가 없습니다."); location.href="/"</script>');
  }
  var data = {
    'login' : req.session.login
  }
  res.render('video/inner', data);
});

var __list_size = 10;
var __total_count = 0;



router.post('/upload', function(req, res, next){
      var data = {
      };
      var form = new multiparty.Form();
      form.on('field',function(name,value){
        data[name] = value;
      });

      form.on('part',function(part){
           var filename;
           var origin_filename;
           var file_arr;
           var size;
           var date = new Date();
           var current_date = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()+''+date.getHours()+''+date.getSeconds()+''+date.getMilliseconds();
           if (part.filename) {
                 file_arr = part.filename.split('.')
                 filename = req.session.memId+file_arr[0]+current_date+"."+file_arr[1];
                 origin_filename = part.filename;
                 size = part.byteCount;

                 data['video_origin_name'] = origin_filename;
                 data['video_name'] = filename;
                 data['user_sno'] = req.session.user_sno;

           }else{
                 part.resume();
           }
           var writeStream = fs.createWriteStream(__video_repository_path+req.session.memId+"/"+filename);

           writeStream.filename = filename;

           part.pipe(writeStream);
           part.on('data',function(chunk){
           });
           part.on('end',function(){
                 writeStream.end();
           });


      });
      form.on('close',function(){
              videoModel.insert(data, function(result, doc) {
                if (result) {
                    res.status(200).send('<script>alert("업로드를 완료했습니다."); location.href="/video/video_list"</script>');
                } else {
                    res.status(200).send('<script>alert("업로드에 실패했습니다."); location.href="/video_list"</script>');
                }
              })


      });
      form.on('progress',function(byteRead,byteExpected){
      });

      form.parse(req);
});

router.get('/video_list/:page', function(req, res, next) {
  if (!req.session.login) {
    res.send('<script>alert("세션 정보가 없습니다."); location.href="/"</script>');
  }
    var page = req.params.page;
    var data = {
    };
     async.waterfall([
        function(callback) {
            videoModel.count(data, function(result, doc1) {
                    callback(null, doc1);
            });
        },
        function(arg, callback) {
            videoModel.limitPage ({'page' : req.params.page}, function(result, doc2) {
                    callback(null, arg, doc2);
            });
        },
        function(arg1, arg2, callback) {
            for (let i = 0; i<arg2.length; i++) {
                var date = new Date(arg2[i]['reg_date']);
                arg2[i]['reg_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+" ";
            }
            callback(null,arg1, arg2);

        },
        function(arg1, arg2, callback) {
            arg2.map(function(item, index){
                memberModel.getName({'sno' : item['user_sno']},function(result, doc2) {
                      arg2[index]['id'] =doc2[0]['id'];
                      if (arg2.length-1 == index) {
                           data['count'] = arg1[0]['count'];
                           data['row1'] = arg2.slice(0, 4);
                           data['row2'] = arg2.slice(4, 8);
                           data['row3'] = arg2.slice(8);
                           data['page'] = req.params.page;

                          res.render('video/video_list', data);

                      }
                });
            });

       }
     ])

});

router.get('/player/:sno/:user_sno', function(req, res, next) {
  if (!req.session.login) {
    res.send('<script>alert("세션 정보가 없습니다."); location.href="/"</script>');
  }
    var data = {
    };
     async.waterfall([
        function(callback) {
            videoModel.getVideo({'sno' : req.params.sno}, function(result, doc1) {
                    callback(null, doc1);
            });
        },
        function(arg, callback) {
            memberModel.getName({'sno' : req.params.user_sno }, function(result, doc1) {
                callback(null, arg, doc1);
            });
        },
        function(arg, arg2, callback) {
            data['data'] = arg[0];
            var date = new Date(arg[0]['reg_date']);
            data['data']['reg_date'] = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
            data['data']['id'] = arg2[0]['id'];
            data['path'] = "/video_repository/"+arg2[0]['id']+'/';
            res.render('video/player', data);

        }
     ])

});
router.post('/update_count', function(req, res, next){

     videoModel.update_count({'sno' : req.body['sno']} , function(result, doc){
            res.json({'result' : result});
     });
});


module.exports = router;