require(['require.config'], () => {
  require(['url', 'jquery'], (url,$) => {
    class Register {
      constructor () {
        this.usernameInput = $("#inputUserName");
        this.passwordInput = $("#inputPassword");
        this.btn = $("#btn");
        this.bindEvents();
      }

      bindEvents () {
        this.btn.on("click", () => {
          // 取用户名和密码提交后台
          let username = this.usernameInput.val(),
              password = this.passwordInput.val();
          $.ajax({
            url: url.phpBaseUrl + "register.php",
            type: "post",
            data: {username, password},
            success: data => {
              alert(data.res_message);
              if(data.res_code === 1) {
                location.href='login.html';
              }
            },
            dataType: 'json'
          })

          return false;
          
        })
      }
    }
    new Register();
  })
})