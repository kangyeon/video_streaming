var video = (function() {


  var bind = function(){
    $('.vedio-title').keyup(function(e){
        var self = $(e.currentTarget);
        var length = self.val().length;
        var word_count = $('.word-count').eq(0);
        if (length > 50) {
            alert('50자 이상 입력하실 수 없습니다');
            self.val(self.val().substring(0, 49));
            return;
        }
        word_count.text(length);
    });

    $('#comment').keyup(function(e) {
        var self = $(e.currentTarget);
        var length = self.val().length;
        var word_count = $('.word-count').eq(1);
        if (length > 300) {
            alert('300자 이상 입력하실 수 없습니다');
            self.val(self.val().substring(0, 299));
            return;
        }
        word_count.text(length);
    });

    $('.video-upload-btn').click(function(e) {
         var video_file = $('.video-file').eq(0);
         var video_title = $('.vedio-title').eq(0);
         var video_description = $('#comment');

         if (!video_file.val()) {
            alert('비디오 파일을 선택해 주세요');
            video_file.focus();
            return false;
         }

         if (!video_title.val()) {
            alert('비디오 제목을 입력해 주세요');
            video_title.focus();
            return false;
         }

         if (!video_description.val()) {
            alert('비디오 설명을 입력해 주세요');
            video_description.focus();
            return false;
         }
//         console.log(video_file.val()); video 확장자가 아닌거 막아야 함
         return true;
    });
  }

  return {
    'bind' : bind
  }
})();
