$('#userForm').on('submit', function() { //创建用户
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function() {
            // console.log(response);

            location.reload();
        },
        error: function(response) {
            // console.log(response.responseText);
            var b = response.responseText; //获取错误信息。
            b = JSON.parse(b);
            // console.log(b);
            var c = b.message;
            alert(c);
        }
    });
    return false;
});
$('#col-md').on('change', '#avatars', function() { //上传图片。
    var formData = new FormData(); //
    formData.append('avatar', this.files[0]);
    console.log(this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            $('#preview').attr('src', response[0].avatar);
            $('#picture').val(response[0].avatar);
        }
    });
})
$('#userbox').on('click', '.edit', function() { //编辑
    var id = $(this).attr('index');
    // console.log(id);//根据id对用户进行编辑。
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response) {
            // console.log(response);
            var html = template('userX', response);
            // console.log(html);
            $('#col-md').html(html);

        }
    });

})
$('#col-md').on('submit', '#multiple', function() { //用户信息提交
    var id = $('#multiple').attr('index');
    var formData = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(response) {
            // console.log(response);
            location.reload();
        },
        error: function(response) {
            console.log(response);

        }
    });
    return false;
})
$.ajax({ //用户信息显示
    type: "get",
    url: "/users",
    success: function(response) {
        // console.log(response); //获取用户信息
        var html = template('tpluser', { data: response });
        // console.log(html);
        $('#userbox').html(html)

    }
});
$('#userbox').on('click', '.delete', function() { //删除
        var id = $(this).attr('index');

        // console.log(id); //根据id对用户进行删除操作。
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function() {
                // console.log(response);
                location.reload();
            }
        });

    })
    //批量删除用户
var checkedAll = $('#checkedAll');
var deleteAll = $('#deleteAll'); //获取批量删除按钮。
$('#checkedAll').on('change', function() {

    var status = $('#checkedAll').prop('checked');
    // alert(status)
    if (status) {
        deleteAll.prop('style', 'display:block');
    } else {
        deleteAll.prop('style', 'display:none');
    }
    $('#userbox').find('input').prop('checked', status); //同步子选框同父选框的选中状态。
    //筛选出所有被选中的子选框id。
    // var arrInput = [];
    // for (i = 1; i <= $('#userbox').find('input').length; i++) {

    // }
    // $('#userbox').filter('input').prop('checked');
});
//根据子选框选中的个数判断父选框是否应被选中，和批量删除按钮是否应该显示。
$('#userbox').on('change', 'input', function() {
    var inputs = $('#userbox').find('input');
    if (inputs.filter(':checked').length == inputs.length) {
        deleteAll.show();
        $('#checkedAll').prop('checked', true);
    } else if (inputs.filter(':checked').length >= 1) {
        deleteAll.show();
        $('#checkedAll').prop('checked', false);
    } else {
        deleteAll.hide();
    }
});
//为批量删除按钮添加提交事件。
$('#deleteAll').on('click', function() {
    var arrInput = [];
    var inputsMany = $('#userbox').find('input').filter(':checked');
    console.log(inputsMany);

    // each(inputsMany).
    inputsMany.each(function(index, item) {
        arrInput.push($(item).attr('index'));

    })
    console.log(arrInput); //得到id组成的数组。
    if (confirm('确定要删除么')) {
        $.ajax({
            type: "delete",
            url: "/users/" + arrInput.join('-'), //将id之间用-隔开
            success: function() {
                location.reload();
            }
        });
    }
});