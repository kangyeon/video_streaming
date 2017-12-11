var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');
var __video_repository_path = __dirname+"/../../video_repository/";
var memberModel = require('../../models/memberModel');

/* GET home page. */
router.get('/', function(req, res, next) {
//  if (!req.session.login) {
//    res.send('<script>alert("세션 정보가 없습니다."); location.href="/"</script>');
//  }
  res.render('video/inner');
});


router.post('/upload', function(req, res, next){
      var form = new multiparty.Form();
      form.on('field',function(name,value){
           console.log('normal field / name = '+name+' , value = '+value);
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
           }else{
                 part.resume();
           }
           console.log("Write Streaming file :"+filename);
           console.log(__video_repository_path+req.session.memId+"/"+filename);
           var writeStream = fs.createWriteStream(__video_repository_path+req.session.memId+"/"+filename);

           writeStream.filename = filename;

           part.pipe(writeStream);
           part.on('data',function(chunk){
                 console.log(filename+' read '+chunk.length + 'bytes');
           });
           part.on('end',function(){
                 console.log(filename+' Part read complete');
                 writeStream.end();
           });


      });
      form.on('close',function(){
           res.status(200).send('Upload complete');
      });
      form.on('progress',function(byteRead,byteExpected){

           console.log(' Reading total  '+byteRead+'/'+byteExpected);
      });
      form.parse(req);
});

module.exports = router;