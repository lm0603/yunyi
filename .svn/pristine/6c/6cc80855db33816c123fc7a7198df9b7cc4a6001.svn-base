var U = function() {};

//验证是否登录
U.prototype.vLogin = function() {
	console.log(localStorage["islogin"]);
	if(localStorage["islogin"] != "true") {
		mui.openWindow({
			url: 'html/lm_login.html',
			id: 'lm_login.html'
		});
		console.log("vlogin: false");
		return false;
	} else {
		console.log("vlogin: true");
		return true;
	}
}

//验证是否登录
U.prototype.FrmLogin = function() {
	if(localStorage["islogin"] != "true") {
		mui.openWindow({
			url: 'html/frm/lm_login.html',
			id: 'lm_login.html'
		});
		return false;
	} else {
		return true;
	}
}
U.prototype.FrmAgingLogin = function() {
	localStorage["islogin"] = false;
	localStorage["token"] = null;
	localStorage["userdata"] = null;
	mui.openWindow({
		url: '../win/win_header.html',
		id: 'win_header.html',
		extras: {
			title: '登录', //扩展参数
			showurl: '../frm/lm_frm_login.html' //扩展参数
		}
	});
}

U.prototype.vAgingLogin = function() {
	localStorage["islogin"] = false;
	localStorage["token"] = null;
	localStorage["userdata"] = null;
	mui.openWindow({
		url: 'win_header.html',
		id: 'win_header.html',
		extras: {
			title: '登录', //扩展参数
			showurl: '../frm/lm_login.html' //扩展参数
		}
	});
}
var dataBase = new U();