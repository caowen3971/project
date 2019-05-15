require(['require.config'], () => {
    require(['url', 'template', "swiper", 'header', 'footer'], (url, template, Swiper) => {
      // 首页逻辑
      // class Index {
      //   constructor () {
      //     this.init();
      //   }
      //   init () {
      //     // header功能
      //     header.load().then(() => {
      //       header.search();
      //       // 等到异步返回之后才能访问header的DOM结构
      //       this.cart();
      //     })
      //   }
      //   cart () {
      //     console.log($("#car-num"));
      //   }
      // }
      class Index {
        constructor () {
          this.banner();
  
        }
  
        banner () {
          // 首页轮播图
          var mySwiper = new Swiper ('.swiper-container', {
            autoplay: true,
            
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
              
            }
  
          }) 
        }  
  
      }
  
  new Index()
      
    })
  })