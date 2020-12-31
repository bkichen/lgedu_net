/*
*获取URL参数
*/
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

window.onload = function(){
var chanli=document.querySelectorAll('.top_tb ul li');
for(var i = 0; i<chanli.length; i++){
   if(chanli[i].getAttribute('channelid') == GetQueryString('channelID')){
     chanli[i].classList.add('nav_d');
  };
}
};


//全文检索-栏目属性
function qchannel(channelID,channelIDwidth) {
    var qsince=GetQueryString("channelID");
    var oUrl = this.location.href.toString();
   if(qsince==null){
        var nUrl = oUrl+"&"+ channelID+ "=" + channelIDwidth;
    }
     else{
           var re=eval('/('+ channelID+'=)([^&]*)/gi');
           var nUrl = oUrl.replace(re,channelID+'='+channelIDwidth);
           this.location = nUrl;
         }
　      window.location.href=nUrl
};

//全文检索-一天内
function qday(since,sincewidth) {
    var qsince=GetQueryString("since");
    var oUrl = this.location.href.toString();
   if(qsince==null){
        var nUrl = oUrl+"&"+ since + "=" + sincewidth;
    }
     else{
           var re=eval('/('+ since+'=)([^&]*)/gi');
           var nUrl = oUrl.replace(re,since+'='+sincewidth);
           this.location = nUrl;
         }
　      window.location.href=nUrl
};