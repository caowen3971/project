require(['require.config'], () =>{
    require(['url', 'template', 'header', 'footer'], (url, template, header) => {
        class List {
            constructor () {
                this.getData ();
                this.addCart ();
            }
        
            getData () {
                $.ajax({
                    url: url.rapBaseUrl + "list",
                    type: 'get',
                    dataType: "json", 
                    success:  data => {
                        if(data.res_code === 1) this.render(data.res_body.list_item);
                      
                    } 
                  
                  })
            }

            render (list) {
                $("#shopItem").html(template('list-template', { list }));
            }

            addCart () {
                $("#shopItem").on('click', '.btn_addCart', function (e) {
                    //取出localStorage中的cart
                    let cart =localStorage.getItem('cart');
                    let id = Number($(this).parent().parent().attr("data-id"));

                    $.get(url.rapBaseUrl + "detail", {id}, res => {
                        if(res.res_code == 1) {
                          let data = res.res_body;
                          // data展开成  title: "abc", price:100
                          // 再在后面解构赋值增加一个id字段
                          // {title: "abc", price:100, id：id}
                          data = {...data, id}; // 当接口变成真实接口的时候，这句代码不需要
                          // data.id = id
                          console.log(data);
                          if(cart) {
                            //已存过
                            
                            cart = JSON.parse(cart);
                            let index = -1;
                            let hasCart = cart.some((shop,i) =>{
                                //some遍历过滤有一个满足就返回满足元素的下标
                                index = i;
                                //返回是否找到
                                return shop.id == id;
        
                            });
                            if(hasCart){
                                //有数据
                                cart[index].num++;
                            }else{
                                //没有数据
                                cart.push({...data, num:1, checked: true});
                            }
        
                        }else{
                            //购物车为空
                            console.log(data);
                            cart = [{...data, num:1, checked: true}];
                        }
                          
                        }
                        localStorage.setItem('cart', JSON.stringify(cart));
                        header.calcCartNum();
                      })

                    //判断是否存在cart
                    
    
                    
                })
            }              
        }


        new List();
    })
})