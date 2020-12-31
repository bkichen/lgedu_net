$(function () {
    //回车模拟发送
    document.onkeydown = function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            send();
        }
    }
});

//删除左右两端的空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//选择发送函数
function selectSend(str,channel) {
    var channelID = channel?10326:1;
    console.log(channelID);
    
    var userStr = str;

    if (userStr != "") {
        var a = $(".chat_case").children().length;
        $("#write").val("");
        $("#count").text(30);
        //拼接用户输入
        var userSend = '<div class="message_line">\n' +
            '                                <div class="avatarB"></div>\n' +
            '                                <div class="msgB">' + userStr + '</div>\n' +
            '                        </div>';
        $(".chat_case").children(':last-child').after(userSend);
        var scrollHeight = $('.chat_case').prop("scrollHeight");
        $('.chat_case').scrollTop(scrollHeight, 570);
        //发送请求
        $.ajax({
            "url": "/api/stl/actions/smart?word=" + userStr+"&siteId=1&channelId="+channelID,
            "type": "post",
            "dataType": "json",
            "success": function (json) {
                json = JSON.parse(json);
                if (json.length > 1) {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">您的问题是：<span style="color:#E90506;">' + userStr + '</span><br><p>我为您推荐以下内容：</p></div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                    // //questionList的不为空时拼接链接
                    $.each(json, function (index, j) {
                        var question_list_title = '<div class="question_title">' + j.Title + '</div>';
                        $(".msgA").eq(($(".msgA").length) - 1).append(question_list_title);
                    });
                } else if (json.length == 1) {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">您的问题是：<span style="color:#E90506;">' + userStr + '</span><br><p>我为您推荐以下内容：</p></div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                    $.each(json, function (index, j) {
                        var question_list_Content = '<div class="question_Content">' + j.Content + '</div>';
                        $(".msgA").eq(($(".msgA").length) - 1).append(question_list_Content);
                    });

                    // console.log($("#question_Content").height());
                    //评价框
                    var evaluation_case = '<div class="evaluation_case"> ' +
                        '                   <span class="ask">是否已解决您的问题？</span> ' +
                        '                   <span class="yes" onclick="toThanks(this)"></span><span class="no" onclick="toThanks(this)"></span>' +
                        '               </div>';
                    $(".msgA").eq(($(".msgA").length) - 1).after(evaluation_case);
                } else {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">十分抱歉！没能帮到您找到对应的解答。但我已记下您的问题啦，稍后我会尽快学习补充！ 或者您还可以通过点击<a>“政务服务”</a>进行咨询，获得更多帮助哦！</div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                }
                //滚动条在下方
                var scrollHeight = $('.chat_case').prop("scrollHeight");
                $('.chat_case').scrollTop(scrollHeight, 570);
            }
        });
    }

}

//发送函数
function send() {
   
    var userStr = trim($("#write").val());

    if (userStr != "") {
        var a = $(".chat_case").children().length;
        $("#write").val("");
        $("#count").text(30);
        //拼接用户输入
        var userSend = '<div class="message_line">\n' +
            '                                <div class="avatarB"></div>\n' +
            '                                <div class="msgB">' + userStr + '</div>\n' +
            '                        </div>';
        $(".chat_case").children(':last-child').after(userSend);
         var scrollHeight = $('.chat_case').prop("scrollHeight");
    $('.chat_case').scrollTop(scrollHeight, 570);
        //发送请求
        $.ajax({
            "url": "/api/stl/actions/smart?word=" + userStr+"&siteId=1&channelId=1",
            "type": "post",
            "dataType": "json",
            "success": function (json) {
                json = JSON.parse(json);
                console.log(json);
                if (json.length > 1) {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">您的问题是：<span style="color:#E90506;">' + userStr + '</span><br><p>我为您推荐以下内容：</p></div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                    // //questionList的不为空时拼接链接
                    $.each(json, function (index, j) {
                        var question_list_title = '<div class="question_title">' + j.Title + '</div>';
                        $(".msgA").eq(($(".msgA").length) - 1).append(question_list_title);
                    });
                } else if (json.length == 1) {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">您的问题是：<span style="color:#E90506;">' + userStr + '</span><br><p>我为您推荐以下内容：</p></div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                    $.each(json, function (index, j) {
                        var question_list_Content = '<div class="question_Content">' + j.Content + '</div>';
                        $(".msgA").eq(($(".msgA").length) - 1).append(question_list_Content);
                    });

                    // console.log($("#question_Content").height());
                    //评价框
                    var evaluation_case = '<div class="evaluation_case"> ' +
                        '                   <span class="ask">是否已解决您的问题？</span> ' +
                        '                   <span class="yes" onclick="toThanks(this)"></span><span class="no" onclick="toThanks(this)"></span>' +
                        '               </div>';
                    $(".msgA").eq(($(".msgA").length) - 1).after(evaluation_case);
                } else {
                    var robotReplyA = '<div class="message_line">\n' +
                        '                 <div class="avatarA"></div>\n' +
                        '                 <div class="msgA">抱歉！没有能够帮到您。但我您的问题已经记下啦，稍后我会尽快学习补充！ 或者您还可以通过点击<a href="http://pds.hnzwfw.gov.cn/">“政务服务”</a>进行咨询，获得帮助哦！</div>\n' +
                        '            </div>';
                    $(".chat_case").children(':last-child').after(robotReplyA);
                }
                //滚动条在下方
                var scrollHeight = $('.chat_case').prop("scrollHeight");
                $('.chat_case').scrollTop(scrollHeight, 570);
            }
        });
    }

}


var maxLength = 30;

//剩余字数函数
function countChange() {
    var L = ($("#write").val().length);
    $("#count").text(maxLength - L);
    if (parseInt($("#count").text()) < 0) {
        $("#count").text(0)
    }
}

function toThanks(obj) {
    $(obj).parent().css("display", "none");
    var thank_case = '<div class="thanks">感谢您的评价!</div>';
    ($(obj).parent().parent().children(".msgA")).after(thank_case);
}

function openHelp() {
    $(".help_frame").css("display", "block");
}

function closeHelp() {
    $(".help_frame").css("display", "none");
}