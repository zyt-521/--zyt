$('#file').on('change', function() {

    var file = this.files[0];
    // alert('ok')
    var formData = new FormData();

    // console.log(file);
    formData.append('image', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            // console.log(response);
            console.log(response[0].image)
            $('#picture').val(response[0].image);
            $('.thumbnail').attr('src', (response[0].image)).show()
        }

    })
});
//设置提交按钮。
$('#lunBo').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function() {
            location.reload();
        }
    });
    return false;
});
//获取轮播列表。
$.ajax({
    type: "get",
    url: "/slides",
    success: function(response) {
        console.log(response);
        var html = template('lunboTpl', { data: response })
            // console.log(html);
        $('#lunBox').html(html);

    }
});
//删除轮播图
$('#lunBox').on('click', '#delete', function() {
    var id = $(this).attr('index');
    console.log(id);

    if (confirm('确定删除吗？')) {
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function() {
                location.reload();
            }
        });
    }


})