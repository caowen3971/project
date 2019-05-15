require(['require.config'], () => {
    require(['url','template', 'header', 'footer', "zoom"], (url, template, header) => {
      class Detail {
        constructor () {
          this.init();
          // $ 构造函数
          // zoom在$原型（prototype上新增了一个elevateZoom方法）
          // $("div") 就是$的实例，所以就能访问elevateZoom方法了
          
  
        }
  
        init () {
          // 从url取到id， 携带id请求详情数据, 渲染详情页
          let id = Number(location.search.slice(4));
          this.id = id; // 将来加入购物车等逻辑还需要id
          $.get(url.rapBaseUrl + "detail", {id}, res => {
            if(res.res_code === 1) {
                console.log(res.res_body);
              let data = res.res_body;
              // data展开成  title: "abc", price:100
              // 再在后面解构赋值增加一个id字段
              // {title: "abc", price:100, id：id}
              console.log(data);
              data = {...data, id}; // 当接口变成真实接口的时候，这句代码不需要
              // data.id = id;
              this.data = data;
              this.render(data);
              
            }
          })
        }
        render (data) {
          $("#detail").html(template("detail-template", { data }));
          this.zoom();
          this.addNum ();
          this.reduceNum ();
          this.addCart ();
        }
  
        
  
        zoom () {
          // 放大镜插件
          $(".zoom-img").elevateZoom({
            gallery:'gal1',
            cursor: 'pointer',
            galleryActiveClass: 'active',
            borderSize:'1',    
            borderColor:'#888'
          });
        }
        addNum () {
            $("#detail").on('click','.plus',function () {
                let num = $('#buyNumber').val();
                num++;
                $('#buyNumber').val(num);
            })
        }
        reduceNum () {
            $("#detail").on('click','.reduce',function () {
                let num = $('#buyNumber').val();
                num--;
                if(num < 1)num = 1;
                $('#buyNumber').val(num);
            })
        }

        addCart () {
            //事件委托
            $("#detail").on('click', '.btn_addCart', e =>{
                //获取数量
                let shopNum = Number($('#buyNumber').val());
                //取出localStorage中的cart
                let cart =localStorage.getItem('cart');
                //判断是否存在cart
                if(cart) {
                    //已存过
                    cart = JSON.parse(cart);
                    let index = -1;
                    if(cart.some((shop,i) =>{
                        //some遍历过滤有一个满足就返回满足元素的下标
                        index = i;
                        //返回是否找到
                        return shop.id === this.data.id;

                    })){
                        //有数据
                        cart[index].num += shopNum;
                    }else{
                        //没有数据
                        cart.push({...this.data, num: shopNum, checked: 'ture'});
                    }

                }else{
                    //购物车为空
                    
                    cart = [{...this.data, num: shopNum, checked: 'ture'}];
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                header.calcCartNum();
            })
        }
  
      }
  
      new Detail();
    })
  })