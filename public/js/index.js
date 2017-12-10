var index = (function() {
    var __login = function(data) {
        var idObj = $('.input-form-id').eq(0);
        var pwObj = $('.input-form-pw').eq(0);
        var post = function() {
            $.post("/login", data, function(data) {
                alert(data['message']);
                location.reload();
            });
        }

        var post_process = function(callback) {
            callback();
        }

        post_process(post);
    }

    var bind = function() {
       $('.login-btn').click(function() {
            var idObj = $('.input-form-id').eq(0);
            var pwObj = $('.input-form-pw').eq(0);

            if (!idObj.val()) {
                alert("id를 입력해주세요");
                idObj.focus();
                return false;
            }

            if (!pwObj.val()) {
                alert("id를 입력해주세요");
                pwObj.focus();
                return false;
            }
            var data = {
                'id' : idObj.val(),
                'password' : pwObj.val()
            };
            __login(data);
       });
    }

    return {
        'bind' : bind
    }
})();