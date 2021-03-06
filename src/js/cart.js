require(['require.config'], () => {
    require(['template', 'header', 'footer'], (template, header) => {
        class Cart {
            constructor () {
              this.count = 0;
              this.init ();  
            }

            init () {
              let cart = localStorage.getItem('cart');
              if(cart) {
                // 渲染列表
                cart = JSON.parse(cart);
                this.render(cart);
                this.addNum();
                this.reduceNum();
                this.delShop ();
                this.shopNumChange ();
                this.calcAllPrice ();
                this.clickCheck ();
                this.delChecked ();
                this.allCheckClick (); 
                this.allCheck ();
              }else{
                // 提示购物车为空
                alert('购物车为空');
              }
            }
            render (cart) {
              // template('cart-template', {list: cart})
              $("#list-container").html(template('cart-template', {cart}));
              let allInput = $("input[type=checkbox]");
              allInput.each(function(){ 
                let str = $(this).attr('check-id');
                if(str ==='false'){
                  str = false;
                  $(this).next().removeClass('curr');
                }else{
                  $(this).next().addClass('curr');
                } 
                $(this).prop('checked' ,str);       
              })
            }
            addNum () {
                let _this = this;
                $("#list-container").on('click','.plus',function () {
                    let num = $(this).prev().val();
                    let shopPrice = $(this).parents('tr').find('.rmbPrice');
                    num++;
                    $(this).prev().val(num);
                    let id = $(this).parents("tr").attr("data-id");
                    let cart =localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let index = -1;
                    cart.some((shop,i) =>{
                      index = i;
                      return shop.id == id;
                    })
                    cart[index].num = num;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    header.calcCartNum();
                    shopPrice.html((num*cart[index].price).toFixed(2));
                    _this.calcAllPrice ();  
                })
            }
            reduceNum () {
                let _this = this;
                $("#list-container").on('click','.reduce',function () {
                    let shopPrice = $(this).parents('tr').find('.rmbPrice');
                    let num = $(this).next().val();
                    num--;
                    if(num < 1)num = 1;
                    $(this).next().val(num);
                    let id = $(this).parents("tr").attr("data-id");
                    let cart =localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let index = -1;
                    cart.some((shop,i) =>{
                      index = i;
                      return shop.id == id;
                    })
                    cart[index].num = num;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    header.calcCartNum();
                    shopPrice.html((num*cart[index].price).toFixed(2));
                    _this.calcAllPrice ();
                })
            }
            delShop () {
                let _this = this;
                $("#list-container").on('click','.del',function () {
                    $(this).parent().parent().remove();
                    let cart =localStorage.getItem('cart');
                    if(cart){
                        cart = JSON.parse(cart);
                        let index = -1;
                        let id = $(this).attr("data-id");
                        let hasShop = cart.some((shop,i) =>{
                            index = i;
                            return shop.id == id;
                        })
                        if(hasShop){
                            cart.splice(index,1);
                            localStorage.setItem('cart', JSON.stringify(cart));
                            header.calcCartNum();
                        }
                    }
                    _this.allCheck ();
                    _this.calcAllPrice ();
                })
            }   
            clickCheck () {
              let _this = this;
              $("#list-container").on('click','.shopCheck',function () {
                let shopInput = $(this).prev("input");
                if($(this).hasClass('curr')){
                  $(this).removeClass('curr');
                  shopInput.prop('checked', false);
                  let id = $(this).parents("tr").attr("data-id");
                  let cart =localStorage.getItem('cart');
                  cart = JSON.parse(cart);
                  let index = -1;
                  cart.some((shop,i) =>{
                    index = i;
                    return shop.id == id;
                  })
                  cart[index].checked = false;
                  localStorage.setItem('cart', JSON.stringify(cart));  
                }else{
                  $(this).addClass('curr');
                  shopInput.prop('checked', true);
                  let id = $(this).parents("tr").attr("data-id");
                  let cart =localStorage.getItem('cart');
                  cart = JSON.parse(cart);
                  let index = -1;
                  cart.some((shop,i) =>{
                    index = i;
                    return shop.id == id;
                  })
                  cart[index].checked = true;
                  localStorage.setItem('cart', JSON.stringify(cart));
                }
                _this.allCheck ();
                _this.calcAllPrice ();
              })
            }
            shopNumChange () {
              let _this = this;
              $("#list-container").on('keyup','.shopNum',function () {
                let shopPrice = $(this).parents('tr').find('.rmbPrice');
                let num = Number($(this).val());
                let id = $(this).parents("tr").attr("data-id");
                let cart =localStorage.getItem('cart');
                cart = JSON.parse(cart);
                let index = -1;
                cart.some((shop,i) =>{
                  index = i;
                  return shop.id == id;
                })
                cart[index].num = num;
                localStorage.setItem('cart', JSON.stringify(cart));
                header.calcCartNum();
                shopPrice.html((num*cart[index].price).toFixed(2));
                _this.calcAllPrice ();
              })
            }
            calcAllPrice () {
              let allNum = 0;
              let allPrice = 0;
              let allInput = $("input[type=checkbox]");
              allInput.each(function(){
                if($(this).prop('checked')){
                  let num = Number($(this).parents("tr").find(".shopNum").val());
                  allNum += num;
                  let price = Number($(this).parents("tr").find(".rmbPrice").html());
                  allPrice += price;
                }
              })
              $("#num").html(allNum);
              $("#allPrice").html("¥" + allPrice.toFixed(2));
            }
            delChecked () {
              $('.batch-delete').on('click',function () {
                let allInput = $("input[type=checkbox]");
                allInput.each(function(){
                  if($(this).prop('checked')){
                  let delbtn = $(this).parents("tr").find(".del");
                  delbtn.trigger('click');               
                  }
                })             
              })  
            }
            allCheckClick () {
              let cart =localStorage.getItem('cart');
              cart = JSON.parse(cart);
              let _this = this;
              let allInput = $("input[type=checkbox]");
              $('.allcheck').on('click',function () {
                if($('.allcheck').hasClass('curr')){
                  $('.allcheck').removeClass('curr');
                  allInput.each(function(){
                    $(this).next().removeClass('curr');
                    $(this).prop('checked',false);
                    $(this).next().prop('check-id', false);
                    cart.forEach(function (itme) {
                      itme.checked = false;
                    });
                  })
                }else{
                  $('.allcheck').addClass('curr');
                  allInput.each(function(){
                    $(this).next().addClass('curr');
                    $(this).prop('checked',true);
                    $(this).next().prop('check-id', true);
                    cart.forEach(function (itme) {
                      itme.checked = true;
                    });
                  })
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                _this.allCheck ();
                _this.calcAllPrice ();
              })
            }
            allCheck () {
              let allInput = $("input[type=checkbox]");
              this.count = 0;
              allInput.each((i,item) => {
                if($(item).prop('checked')){
                  this.count++;
                }
              })
              allInput.length == this.count ? $('.allcheck').addClass('curr') : $('.allcheck').removeClass('curr');
            }
          }
          new Cart();
    });
})