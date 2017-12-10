var signUp = (function() {
  var __confirm_repetition_id = false;
  var __confirm_repetition_nickname = false;

  var __confirmRepetition = function(obj, index) {
    var confirm_repetition = $('.confirm-repetition').eq(index);
    var row_name = '';
    var alert_content = '';
    if (index == 0) {
        row_name = 'id';
        alert_content = "아이디";
    } else if (index == 1) {
      row_name = 'nickname';
      alert_content = "닉네임";
    }
    var post = function() {
      $.post("/member/confirm_repetition",{"row_name" : row_name ,"value" : obj.val()}, function(data) {
          if (data['count']) {
            if (index == 0) {
              signUp.__confirm_repetition_id = false;
            } else if (index == 1) {
              signUp.__confirm_repetition_nickname = false;
            }
            confirm_repetition.text('중복된 '+alert_content+' 값이 있습니다.');
            confirm_repetition.css('color', 'red');
          } else {
            if (index == 0) {
              signUp.__confirm_repetition_id = true;
            } else if (index == 1) {
              signUp.__confirm_repetition_nickname = true;
            }
            confirm_repetition.text('중복된 '+alert_content+' 값이 없습니다.');
            confirm_repetition.css('color', 'blue');
          }
      }, "json");
    }
    var post_process = function(callback) {
      callback();
    }
    post_process(post);
  }

  var __join = function(data) {

      var post = function() {
        $.post("/member/join", data , function(data) {
            if (data['result']) {
                alert(data['message']);
                location.href = "/";
            } else {
                alert(data['message']);
                location.reload();
            }
        });
      }

      var post_process = function(callback){
            callback();
      }
      post_process(post);
  }

  var bind = function(){
    $('.input-form-id').keyup(function(e){
      var idObj = $(e.target);
      __confirmRepetition(idObj, 0);
    });
    $('.input-form-nickname').keyup(function(e){
      var idObj = $(e.target);
      __confirmRepetition(idObj, 1);
    });
    $('.sign-up-btn').click(function(e){
      var idObj = $('.input-form-id').eq(0);
      var nicknameObj = $('.input-form-nickname').eq(0);
      var password = $('.input-form-password').eq(0);
      var rePassword = $('.input-form-password').eq(1);
      if (!idObj.val()) {
        alert('아이디를 입력해 주세요');
        idObj.focus();
        return false;
      }
      if (!nicknameObj.val()) {
        alert('닉네임을 입력해 주세요');
        nicknameObj.focus();
        return false;
      }
      if (!password.val()) {
        alert('패스워드를 입력해 주세요');
        password.focus();
        return false;
      }
      if (!rePassword.val()) {
        alert('패스워드를 재 입력해 주세요');
        rePassword.focus();
        return false;
      }
      if (rePassword.val() != password.val()) {
        alert('패스워드와 재입력값이 일치하지 않습니다.');
        rePassword.focus();
        return false;
      }
      if (!signUp.__confirm_repetition_id) {
        alert('아이디가 중복되어 있습니다.');
        idObj.val('');
        idObj.focus();
        return false;
      }
      if (!signUp.__confirm_repetition_nickname) {
        alert('닉네임이 중복되어 있습니다.');
        nicknameObj.val('');
        nicknameObj.focus();
        return false;
      }
       var data = {
        'id' : idObj.val(),
        'password' : password.val(),
        'nickname' : nicknameObj.val()
       };
      __join(data);
    });
  }

  return {
    'bind' : bind
  }
})();
