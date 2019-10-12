$.ajax({
    type: "get",
    url: "/comments",
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response)
            // console.log(html);
        $('#commentsBox').html(html);
        $('.pagination').twbsPagination({
            totalPages: response.pages, //总页数
            visiblePages: 5, //显示按钮个数
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function(event, page) {
                // console.log(response.page);

                changePage(page)
            }
        })
    }

});
//分页设置。
function changePage(page) {
    // 向服务器端发送请求 获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
            var html = template('commentsTpl', response);
            // console.log(htmls);
            $('#commentsBox').html(html);
        }
    });
}
//点击操作改变评论状态。
$('#commentsBox').on('click', '#status', function() {
    var id = $(this).attr('index');
    var state = $(this).attr('state') - 0;
    console.log(state);

    console.log(id);
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: { state: state == 0 ? 1 : 0 },
        success: function() {
            location.reload();
        }
    });

})
$('#commentsBox').on('click', '#delete', function() {
    var id = $(this).attr('i-d'); //获取绑定的指定id
    console.log(id);
    if (confirm('请确定是否删除')) {
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function() {
                location.reload();
            }
        });
    }
})