require(['require.config'], () => {
  require(['url', 'jquery','cookie'], (url, $) => {
    class Login {
      constructor () {
        this.usernameInput = $("#inputUserName");
        this.passwordInput = $("#inputPassword");
        this.btn = $("#btn");
        this.bindEvents();
        this.remember = $("#chackbox");
      }

      bindEvents () {
        this.btn.on("click" ,() => {
          let username = this.usernameInput.val(),
              password = this.passwordInput.val();
          
          $.ajax({
            url: url.phpBaseUrl + "login.php",
            type: "post",
            data: {username, password},
            success: data => {
              alert(data.res_message);
              if(data.res_code === 1) {
                this.loginSucc(username);
              }
            },
            dataType: 'json'
          })

          return false;
          
        })
      }

      loginSucc (username) {
        // 存cookie
        let expires = this.remember.prop('checked') ? {expires:7} : {};
        expires = Object.assign({path: "/"}, expires);
        console.log(expires);
        $.cookie('username', username, expires);
        location.href = "/";


      }
    }
    new Login();
  })
})