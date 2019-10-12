$('#logout').on('click', function() {
    $.ajax({
        type: "get",
        url: "/logout ",
        success: function(response) {
            location.href = 'login.html'
        }
    });
});

function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};
//索要用户登录信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        $('#avatar').attr('src', response.avatar)
        $('.profile .name').html(response.nickName)
    }
});

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