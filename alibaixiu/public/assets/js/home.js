 $.ajax({
     type: "get",
     url: "/slides",
     success: function(response) {
         //  console.log(response);

         var in_html = template('lunboTpl', {
                 data: response
             })
             //  console.log(in_html);

         $('#lunBox').html(in_html);
         var swiper = Swipe(document.querySelector('.swipe'), {
             auto: 3000,
             transitionEnd: function(index) {
                 // index++;

                 $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
             }
         });
         // 上/下一张
         $('.swipe .arrow').on('click', function() {
             var _this = $(this);
             if (_this.is('.prev')) {
                 swiper.prev();
             } else if (_this.is('.next')) {
                 swiper.next();
             }
         })
     }
 });
 //获取最新文章发布
 $.ajax({
     type: "get",
     url: "/posts/lasted",
     success: function(response) {
         //  console.log(response);
         var html = template('newsTpl', { data: response });
         //  console.log(html);

         $('.new').html(html);
     }
 });
 //获取热门推荐
 $.ajax({
     type: "get",
     url: "/posts/recommend",
     success: function(response) {
         //  console.log(response);
         var html = template('hotTpl', { data: response })

         $('#hotBox').html(html);
     }
 });
 //随机推荐
 $.ajax({
     type: "get",
     url: "/posts/random",
     success: function(response) {
         //  console.log(response);
         var html = template('suiTpl', { data: response })

         $('#suiJI').html(html);
     }
 });
 //获取最新评论
 $.ajax({
     type: "get",
     url: "/comments/lasted",
     success: function(response) {
         //  console.log(response);
         var html = template('commentTpl', { data: response })
         $('#commentBox').html(html);
     }
 });