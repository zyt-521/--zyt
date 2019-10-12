$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // console.log(response);
        var html = template('catagoryTpl', { data: response });
        $('.nav').html(html);
        $('.topnav').html(html);
    }
});
//文章点赞
$('.new').on('click', '.like', function() {
    var id = $(this).attr('index');
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        success: function() {
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
        }
    });
})