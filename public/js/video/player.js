var player = (function() {
  var __run_flag= true;
  var bind = function(){
    $('.each_video').click(function(e){
          var sno = $(e.currentTarget).attr('content');
          sno = Number(sno);

          var post = function() {
               $.post('/video/update_count', {'sno' : sno}, function(data){
                    var count = $('#run-count').text();
                    count = Number(count);
                    $('#run-count').text(count+1);
               })
          }

          var post_process = function(callback) {
            callback();
          }
        if(__run_flag) {
            post_process(post);
            player.__run_flag = false;
        } else {
            player.__run_flag = true;
        }
    });


  }

  return {
    'bind' : bind
  }
})();
