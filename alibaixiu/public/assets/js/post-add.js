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
//增加文章。
$('#parentBox').on('change', '#feature', function() {
    // 获取到管理员选择到的文件
    // alert('ok');
    var file = this.files[0];
    // 创建formData对象 实现二进制文件上传
    var formData = new FormData();
    // 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);

    // 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function(response) {
            console.log(response)
            $('#picView').attr('src', response[0].cover).show();
            $('#thumbnail').val(response[0].cover);
            console.log(response[0].cover); //图片路径
        }
    })
});
$('#addForm').on('submit', function() {
    //获取表单信息。
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: "post",
        url: '/posts',
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html'
        },
        error: function(params) {
            console.log(params);
        }
    })
    return false;
})

function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
var id = getUrlParams('id');
// console.log(id);

if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(response) {
            // var html = template('modifyTpl', response)
            // console.log(response);
            // $('#parentBox').html(html);
            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories) {
                    response.categories = categories;
                    // console.log(response)
                    var html = template('modifyTpl', response)
                    $('#parentBox').html(html);

                }
            });
        }
    });
    $('#parentBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        var form = formData.substring(0, formData.length - 1)
        console.log(form);

        // console.log(formData);
        $.ajax({
            type: "put",
            url: "/posts/" + id,
            data: form,
            success: function() {
                location.href = '/admin/posts.html'
            },
            error: function(params) {
                console.log(params);

            }
        })
        return false;
    })
}