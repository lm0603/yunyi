var U = function() {};
//var serverpath = "http://192.168.1.15:888/api/xapi/server.ashx ";
//var serverpath = 'http://112.124.64.193:2343/api/xapi/server.ashx';
var serverpath = 'http://47.104.181.146:80/api/xapi/server.ashx';

//获取个人信息
U.prototype.getUserinfo = function(token, callback) {
	var mdata = {
		com: "getuserinfo",
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			plus.nativeUI.closeWaiting();
			console.log(JSON.stringify(mdata));
			if(rdata != null && rdata.code == 1) {
				localStorage["userdata"] = JSON.stringify(rdata.data);
				localStorage["username"] = rdata.data.name;
				callback(rdata.data);
			} else {
				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast('获取用户信息' + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
	});
}
//APP登录方法
U.prototype.login = function(obj) {
	var mdata = {
		com: "login",
		name: obj.uName,
		idcard: obj.uId,
		phone: obj.uTel,
		code: obj.uCode
	}
	console.log(JSON.stringify(mdata));
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为100秒；
		success: function(data) {
			console.log("login请求回来的data+++" + JSON.stringify(data));
			//服务器返回响应，根据响应结果，分析是否登录成功； ------后面的还没做
			if(data != null && data.com == "login_rp" && data.code == 1) {
//				data.data.isfirst = true;    //模拟第一次登录
				console.log(data.data.token);
				localStorage["islogin"] = !data.data.isfirst;
				localStorage["token"] = data.data.token;
				var wobj1 = plus.webview.getWebviewById("../frm/lm_homepage.html");
				console.log("我是lm_homepage的那一页" + JSON.stringify(wobj1))
				if(wobj1) {
					wobj1.reload(); /*重新加载*/
				}

				var mainview = plus.webview.getWebviewById("html/win/win_home.html");
				plus.nativeUI.closeWaiting();
				if(mainview != null) {
					plus.webview.show(mainview);
					mainview.reload();
				} else {
					//data里面的是否第一次登录
						
					if(!data.data.isfirst) {
						//	第一次登录，获取用户信息,可以更改的信息
						U.prototype.getUserinfo(localStorage["token"], function(data) {
							var wobj = plus.webview.getWebviewById("../frm/mycenter/centerIndex.html");
							console.log("我是centerIndex的那一页" + JSON.stringify(wobj))
							if(wobj) {
								wobj.reload(); /*将个人中心重新加载*/
							}
						})
						mui.openWindow({
							url: "../win/win_home.html",
							id: "../win/win_home.html"
						});
					} else {
						//	第一次登录，获取用户信息,可以更改的信息
						U.prototype.getUserinfo(localStorage["token"], function() {
							var wobj = plus.webview.getWebviewById("../frm/mycenter/centerIndex.html");
							console.log("我是centerIndex的那一页" + JSON.stringify(wobj))
							if(wobj) {
								wobj.reload(); /*将个人中心重新加载*/
							}
						})
						//跳转到信息填写
						mui.openWindow({
							url: "../frm/mycenter/lm_myMsg.html",
							id: "../frm/mycenter/lm_myMsg.html"
						});
					}

				}
			} else {
				//				if(localStorage['islogin']) {
				mui.toast(data.msg);
				plus.nativeUI.closeWaiting();
				//			    }
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			mui.toast("登录失败！");
		}
	});
}
//资料填写分类
U.prototype.getMsgType = function(callback) {
	var mdata = {
		com: "getjctype"
	};
	console.log("获取分类" + JSON.stringify(mdata));
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("获取分类1" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {

				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("获取商城学习卡" + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
}
//修改保存个人信息
U.prototype.changeUserinfo = function(obj, token, callback) {
	var mdata = {
		com: "changeuserinfo",
		token: token,
		phone: obj.phone,
		gender: obj.gender,
		ks: obj.ks,
		zylb: obj.zylb,
		zc: obj.zc,
		dw: obj.dw,
		xk: obj.xk,
		cszy: obj.cszy,
		byzy: obj.byzy,
		bydx: obj.bydx,
		byxl: obj.byxl,
		zgxl: obj.zgxl,
		zczsNo: obj.zczsNo,
		zgzsNo: obj.zgzsNo
	};
	var data;

	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			plus.nativeUI.closeWaiting();
			console.log("保存数据请求m" + JSON.stringify(mdata));
			console.log("保存数据响应" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				localStorage["islogin"] = true;
				callback(rdata);
			} else {
				//如果没有获取到值返回一个空数组;

				mui.toast('保存资料' + rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log("保存资料失败!");
			//return null;
		}
	});
}
//APP短信获取验证码
U.prototype.getmsg = function(tel,callback) {
	var mdata = {
		com: "getmsg",
		phone: tel
	};
	console.log(JSON.stringify(mdata));
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'POST', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为100秒；
		success: function(data) {
			console.log("短信的data+++" + JSON.stringify(data));
			callback(data);
			//服务器返回响应，根据响应结果，分析是否登录成功； ------后面的还没做
			//			if(data != null && data.com == " " && data.code == 1) {

			
			//			} else {
			//				mui.toast(data.msg);
			//				plus.nativeUI.closeWaiting();
			//			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
			mui.toast("获取失败！");
		}
	});
}
//APP退出登录方法
U.prototype.outLogin = function() {
	localStorage["islogin"] = false;
	localStorage["token"] = null;
	localStorage["userdata"] = null;
}
//首页数据
U.prototype.getHome = function(token, callback) {
	var mdata = {
		com: "gethomepage",
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("首页数据" + JSON.stringify(rdata));
			plus.nativeUI.closeWaiting();
			//			&& localStorage['userdata']!="null"
			if(rdata.code == 1) {
				callback(rdata);
			} else {
				mui.toast("登录超时/信息获取失败，请重新登录！");
				U.prototype.outLogin();
				mui.openWindow({
					url: "../../html/frm/lm_login.html",
					id: "../../html/frm/lm_login.html"
				});
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
	});
}
//更多项目---可预约项目/待预约项目
U.prototype.getPro = function(page, index, type, token) {
	var mdata = {
		com: "projectlist",
		type: type,
		index: index,
		page: page,
		token: token
	};
	console.log("更多项目---可预约项目/待预约项目m" + JSON.stringify(mdata));
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("更多项目---可预约项目/待预约项目" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("获取商城学习卡" + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//项目详情
U.prototype.getProde = function(token, id, callback) {
	var mdata = {
		com: "projectpro",
		id: id,
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("项目详情m" + JSON.stringify(mdata));
			console.log("项目详情r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("项目详情" + rdata.msg);
					plus.nativeUI.closeWaiting();
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//项目预约1/取消2
U.prototype.projoin = function(token, id, type, callback) {
	var mdata = {
		com: "myjoinobj_list",
		id: id,
		type: type,
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("项目预约/取消m" + JSON.stringify(mdata));
			console.log("项目预约/取消r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				mui.toast("" + rdata.msg);
				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("" + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//搜索项目
U.prototype.searchPro = function(token, type, page, index, linkname,time) {
	var mdata = {
		com: "search_projectlist",
		token: token,
		type: type,
		page: page,
		index: index,
		linkname: linkname,
		time:time
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("搜索m" + JSON.stringify(mdata));
			console.log("搜索r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("搜索" + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//获取商城信息
U.prototype.getGoods = function(page, index, type, token) {
	var mdata = {
		com: "getgoods",
		type: type,
		index: index,
		page: page,
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("商品m" + JSON.stringify(mdata));
			console.log("商品r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				if(localStorage['islogin']) {
					mui.toast("获取商城学习卡" + rdata.msg);
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//获取学习卡详细信息
U.prototype.getxxkDetail = function(id, token) {
	var mdata = {
		com: "getgoods_card_de",
		id: id,
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("学习卡请求信息" + JSON.stringify(mdata));
			console.log("学习卡详细信息" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//学习卡购买
U.prototype.payxxk = function(id, token, type, city, weight) {
	var mdata = {
		com: "paygoodscard",
		id: id,
		token: token,
		type: type,
		city: city,
		weight: weight
	};
	var data;
	console.log("paygoodscard---m++" + JSON.stringify(mdata));
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			
			console.log("paygoodscard" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
				plus.nativeUI.closeWaiting();
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//已购物品-学习卡的函数
U.prototype.buyxxk = function(page, index, token) {
	var mdata = {
		com: "mypaycard",
		page: page,
		index: index,
		token: token
	};
	var data;
	console.log("已购学习卡" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("已购学习卡" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//生成用户二维码
U.prototype.newEwm = function(token) {
	var mdata = {
		com: "createewm",
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("生成二维码" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//获取用户二维码
U.prototype.getEwm = function(token, callback) {
	var mdata = {
		com: "getewm",
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("二维码" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				if(rdata.data.path.indexOf(".jpg") < 0) {
					U.prototype.newEwm(mdata.token);
				} else {
					callback(rdata);
				}
			} else {
				//				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//上传头像
U.prototype.upHeaderImg = function(token, data, callback) {
	plus.nativeUI.showWaiting("上传中");
	var mdata = {
		com: "bmobj_or_ac_team",
		token: token,
		imgbase: data
	};
	var data;
	console.log("上传头像的data" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			plus.nativeUI.closeWaiting();
			console.log("我是上传头像" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
			
				callback(rdata);
				mui.toast("上传成功")
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			mui.alert("系统错误");
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//我的考试
U.prototype.myks = function(token, type, index, page) {
	var mdata = {
		com: "mykaoshi",
		token: token,
		type: type,
		index: index,
		page: page
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("我的考试请求" + JSON.stringify(mdata));
			console.log("我的考试" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//我的消息-预约提醒/通知   
U.prototype.msgyy = function(token, index, page, type) {
	var mdata = {
		com: "mymessenger",
		token: token,
		index: index,
		page: page,
		type: type
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			console.log("我的消息m" + JSON.stringify(mdata));
			console.log("我的消息r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//我的消息-已读  
U.prototype.msgyy_isRead = function(token, id) {
	var mdata = {
		com: "mymessenger_read",
		token: token,
		id: id
	};
	var data;
	console.log("mdata+++" + JSON.stringify(mdata));
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			console.log("我的消息已读" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//我的学分
U.prototype.myxf = function(token, callback) {
	var mdata = {
		com: "mycreadit",
		token: token
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("我的学分m" + JSON.stringify(mdata));
			console.log("我的学分r" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//我的学会
U.prototype.xuehuilist = function(token, index, page, wheres) {
	var mdata = {
		com: "xuehuilist",
		token: token,
		page: page,
		index: index,
		wheres: wheres
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("我的学会" + JSON.stringify(mdata));
			console.log("我的学会" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//加入学会
U.prototype.xuehuijoin = function(token, id, callback) {
	var mdata = {
		com: "xuehuijoin",
		token: token,
		id: id
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("加入学会" + JSON.stringify(mdata));
			console.log("加入学会" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				callback(rdata)
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//我的项目
U.prototype.mypro = function(token, type, index, page) {
	var mdata = {
		com: "myproject",
		token: token,
		type: type,
		index: index,
		page: page
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("我的xiangmu请求" + JSON.stringify(mdata));
			console.log("我的项目" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//取消预约
U.prototype.qxpro = function(token, id) {
	var mdata = {
		com: "myjoinobj_list_rp",
		token: token,
		id: id
	};
	var data;
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("取消预约请求" + JSON.stringify(mdata));
			console.log("取消预约" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}
//直播列表
U.prototype.liveline = function(index, page, type) {
	var mdata = {
		com: "liveline",
		page: page,
		index: index,
		type: type
	};
	var data;
	console.log("直播列表" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("直播列表" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//考试流程执行
//1.获取试题

U.prototype.getQustions = function(token, id, type, callback) {
	var mdata = {
		com: "getQustions",
		token: token,
		id: id,
		type: type
	};
	var data;
	console.log("获取项目题目列表" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("获取项目题目列表" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//2.提交上传试题

U.prototype.piquestion = function(token, id, type, time, list, callback) {
	var mdata = {
		com: "piquestion",
		token: token,
		id: id,
		type: type,
		time: time,
		list: list
	};
	var data;
	console.log("提交上传试题" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("提交上传试题" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
				callback(rdata);
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//3.试题分析

U.prototype.questionfengxi = function(token, id, type) {
	var mdata = {
		com: "questionfengxi",
		token: token,
		id: id,
		type: type
	};
	var data;
	console.log("试题分析" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("试题分析" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

//4.评价

U.prototype.commentpjo = function(token, id, text, zh, ljqk, skls, jxjh, jcbx, xxsh, tgxx) {
	var mdata = {
		com: "commentpjo",
		token: token,
		id: id,
		text: text,
		zh: zh,
		ljqk: ljqk,
		skls: skls,
		jxjh: jxjh,
		jcbx: jcbx,
		xxsh: xxsh,
		tgxx: tgxx
	};
	var data;
	console.log("评价m" + JSON.stringify(mdata))
	mui.ajax({
		url: serverpath,
		data: JSON.stringify(mdata),
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(rdata) {
			//			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log("评价" + JSON.stringify(rdata));
			if(rdata != null && rdata.code == 1) {
				data = rdata;
			} else {
				//				//如果没有获取到值返回一个空数组;
				mui.toast(rdata.msg);
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			//console.log("获取首页数据失败!");
			//return null;
		}
		//		return data;
	});
	return data;
}

var handle = new U();