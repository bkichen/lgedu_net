//点击网站纠错
function LinkZ(site_code){
	//获取该站点需要纠错页面的url地址
	var url = getCurrUrl();
	//跳转至纠错系统填写页面 
	window.open("http://www.pds.gov.cn/ErrorCorrection/ErrorCorrection.html?" + "url=" + encodeURIComponent(url));
}
//点击图标
function Link(site_code) {
	//获取该站点需要纠错页面的url地址
	var url = getCurrUrl();
	//跳转至纠错系统填写页面 
	window.open("http://pucha.kaipuyun.cn/exposure/jiucuo.html?site_code=" + site_code + "&url=" + encodeURIComponent(url));
}
//获取该站点需要纠错页面的url地址
function getCurrUrl() {
	var url = "";
	if (parent !== window) {
		try {
			url = window.top.location.href;
		} catch (e) {
			url = window.top.document.referrer;
		}
	}
	if (url.length == 0)
		url = document.location.href;

	return url;
}
