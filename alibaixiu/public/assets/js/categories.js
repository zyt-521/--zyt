$('#categories').on('submit', function() { //创建分类
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
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
});
//渲染分类列表。
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        // console.log(response);
        var html = template('tplCategories', { date: response })
            // console.log(html);

        $('#cateBox').html(html);
    }
});
//编辑利用事件委托
$('#cateBox').on('click', '.edit', function() {
        var id = $(this).attr('i_d');
        // console.log(id);
        $.ajax({
            type: "get",
            url: "/categories/" + id,
            success: function(response) {
                var html = template('editTpl', response);
                // console.log(html);
                $('#categoriesBox').html(html)
            }
        });

    })
    //为修改的表单添加提交事件，利用事件委托
$('#categoriesBox').on('submit', '#categories', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('i_d');
        console.log(id);
        $.ajax({
            type: "put",
            url: "/categories/" + id,
            data: formData,
            success: function() {
                location.reload();
            },
            error: function(response) {
                console.log(response);
            }
        });
        return false;
    })
    //进行删除操作时。
$('#cateBox').on('click', '.delete', function() {
    var id = $(this).attr('i_d');
    // console.log(id);
    if (confirm('确定要删除么？')) {
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function() { location.reload(); }
        });
    }
});
//进行批量删除时。
var deleteAll = $('#deleteAll');
var checkedAll = $('#checkedAll');
// var inputs = $('#cateBox').find('input');

checkedAll.on('change', function() {
    var status = checkedAll.prop('checked');
    var inputs = $('#cateBox').find('input');
    // alert(status);
    // inputs.prop('checked', status); //父选框与子选框状态同步。
    inputs.prop('checked', status);
    if (status) {
        deleteAll.show();

    } else {
        deleteAll.hide();

    }
})
$('#cateBox').on('change', 'input', function() {
        var inputs = $('#cateBox').find('input');
        var l = inputs.filter(':checked').length;
        if (l == inputs.length) {
            deleteAll.show();
            checkedAll.prop('checked', true);
        } else if (l >= 1) {
            deleteAll.show();
            checkedAll.prop('checked', false);
        } else {
            deleteAll.hide();
        }
    })
    //给批量删除添加事件。
deleteAll.on('click', function() {
    var arrId = [];
    var inputsId = $('cateBox').find('input').filter(':checked');
    // console.log(inputsId);
    inputsId.each(function(index, item) {

        arrId.push($(item).attr('index'));
        // console.log($(item).attr('index'));

    })

    console.log(arrId);

    if (confirm('确定删除')) {
        $.ajax({
            type: "delete",
            url: "/categories/" + arrId.join('-'),
            success: function() {
                location.reload();
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
})