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
console.log(id);

$.ajax({
    type: "get",
    url: " /posts/" + id,
    success: function(response) {
        // console.log(response);
        var html = template('detailTpl', response)
            // console.log(html);
        $('#detailBox').html(html);

    }
});