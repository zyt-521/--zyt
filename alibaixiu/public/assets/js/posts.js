$.ajax({ //显示文章列表。
    type: "get",
    url: "/posts ",
    success: function(response) {
        // console.log(response.records);
        // console.log(response);
        var html = template('postview', { data: response.records })
            // console.log(html);
        $('#postBox').html(html)
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
        });

    }
});

//获取文章数量。
function changePage(page) {
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
            var htmls = template('postview', { data: response.records });
            // console.log(htmls);
            $('#postBox').html(htmls);
        }
    });
}
//安分类信息查询
$.ajax({ //获取分类信息。
    type: "get",
    url: "/categories",
    success: function(response) {
        // console.log(response);
        var html = template('categoryTpl', { date: response });
        // console.log(html);
        $('#category').html(html);
    }
});
//为筛选按钮添加点击事件
$('#choice').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response) {
            console.log(response);
            var htmls = template('postview', { data: response.records });
            console.log(htmls);
            $('#postBox').html(htmls);
        },
        error: function(params) {
            console.log(params);

        }
    })
    return false;
});
//删除文章
$('#postBox').on('click', 'delete', function() {
    var id = $(this).attr('i_d');
    if (confirm('确定删除？')) {
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function() {
                location.reload();
            }
        });
    }
})