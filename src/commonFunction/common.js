
export default {
	//完成将 toChineseNum， 可以将数字转换成中文大写的表示，处理到万级别，例如 toChineseNum(12345)，返回 一万二千三百四十五。
	toChinesNum(num) {
		let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
		let unit = ["", "十", "百", "千", "万"];
		num = parseInt(num);
		let getWan = (temp) => {
		let strArr = temp.toString().split("").reverse();
		let newNum = "";
		for (var i = 0; i < strArr.length; i++) {
			newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
		}
		return newNum;
		}
		let overWan = Math.floor(num / 10000);
		let noWan = num % 10000;
		if (noWan.toString().length < 4) noWan = "0" + noWan;
		return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
	},
	// 获取几天前的日期
	UnixDateFun(days, types) {
		var daydate, days;
		if (days) {
		days = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * days);
		} else {
		days = new Date();
		}
		var daydate = days.getFullYear() + "-" + ((days.getMonth() + 1) < 10 ? '0' + (days.getMonth() + 1) : (days.getMonth() + 1)) + '-' + ((days.getDate()) < 10 ? '0' + (days.getDate()) : (days.getDate()));
		if (types == 'month') {
		daydate = days.getFullYear() + "-" + ((days.getMonth() + 1) < 10 ? '0' + (days.getMonth() + 1) : (days.getMonth() + 1));
		} else if (types == 'year') {
		daydate = days.getFullYear();
		}
		return daydate;
	},
	//获取上个月日期
	getLastMonth() {
		var date = new Date;
		var year = date.getFullYear();
		var month = date.getMonth();
		if (month == 0) {
		year = year - 1;
		month = 12;
		}
		return year + "-" + month;
	},
	//时间戳转换为日期
	gettime(timestamp, bool) {
		var restime, date =timestamp?new Date(parseInt(timestamp) * 1000):new Date();
		var MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var m = date.getMinutes();
		m = m < 10 ? ('0' + m) : m;
		var s = date.getSeconds();
		s = s < 10 ? ('0' + s) : s;
		restime = date.getFullYear() + "-" + MM + '-' + d;
		if (restime.indexOf('1970') >= 0) {
		restime = '';
		}
		return restime;
	},
	//获取某个月的第一天
	getFirstDay(str) {
		var obj = new Date(str);
		var timestamp = obj.setDate(1);
		return new Date(timestamp);
	},

	//获取某个月的最后一天
	getLastDay(str) {
		var obj = new Date(str);
		var month = obj.getMonth();
		var nextMonth = ++month;
		var nextMonthFirstDay = new Date(obj.getFullYear(), nextMonth, 1);
		var oneDay = 1000 * 60 * 60 * 24;
		return new Date(nextMonthFirstDay - oneDay);
	},
	//获取某个月的天数
	getMonthDays(str) {
		var selectedDate = new Date(str);
		var selectedMonth = selectedDate.getMonth() + 1;
		selectedDate.setMonth(selectedMonth);
		selectedDate.setDate(0);
		var dayMany = selectedDate.getDate();
		return dayMany;
	},
	//计算包括汉字的字节数
	byteLength(str) {
		var byteLen = 0, len = str.length;
		if (!str) return 0;
		for (var i = 0; i < len; i++)
			byteLen += str.charCodeAt(i) > 255 ? 2 : 1;
		return byteLen;
	},
	// 获取或存储缓存的数据
	localset(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	localget(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	localremove(key) {
		localStorage.removeItem(key);
	},
	localgetClear() {
		localStorage.clear();
	},
	// 数组去重
	removeDuplicatedItem(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] == arr[j]) {
			arr.splice(j, 1);
			j--;
			}
		}
		}
		return arr;
	},
	//返回上一级
	back(that) {
		window.history.go(-1);
		// that.$router.back(-1);//返回上一层
	},
	// 点击导航或者菜单样式切换
	switchTab(that, ind) {
		that.active = ind;
	},
	//刷新页面
	refresh(that) {
		that.$router.push({ path: "/" });
	},
	// 页面所有跳转
	linkTo(that, urlname, arrs) {
		that.$router.push({ path: "/" + urlname, query: arrs });
	},
	// 数据换行处理
	dataFormatter(data,num) {
		let datas=data.replace(/\r?\n/g, "<br />");
		return num?(datas.length>200?datas.substr(0,num):data.replace(/\r?\n/g, "<br />")):(data.replace(/\r?\n/g, "<br />"));
	},
	// 找出json在数组里面的索引
	inArray(search, array) {
		for (var i in array) {
		if ((typeof search == 'object' && JSON.stringify(search) === JSON.stringify(array[i])) || array[i] == search) {
			return i;
		}
		}
		return -1;
	},
	// 计算文件字节大小
	getfilesize(size) {
		if (!size)
		return "";
		var num = 1024.00; //byte
		if (size < num)
		return size + "B";
		if (size < Math.pow(num, 2))
		return (size / num).toFixed(2) + "K"; //kb
		if (size < Math.pow(num, 3))
		return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
		if (size < Math.pow(num, 4))
		return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
		return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
	},
	// 判断是否是图片
	IsPicture(img, type) {
		//判断是否是图片 - strFilter必须是小写列举
		var strFilter1 = ".jpeg|.gif|.jpg|.png|.bmp|.pic|";
		var strFilter2 = ".avi|.wmv|.mp4|.mov|.mkv|.flv|.f4v|.m4v|.rmvb|.rm|.3gp|.dat|.ts|.mts|.vob|";
		var strFilter = type == 'img' ? strFilter1 : strFilter2;
		if (img.indexOf(".") > -1) {
			var p = img.lastIndexOf(".");
			var strPostfix = img.substring(p, img.length) + '|';
			strPostfix = strPostfix.toLowerCase();
			if (strFilter.indexOf(strPostfix) > -1) {
				return true;
			}
		}
		return false;
	},
	//表单校验提示信息
	/*
	obj: vue页面的this对象。
	ruleForm:表单验证规则，为数组类型 如： 
	must: [ {must: [], tip: []}, {must: [], tip: []}]
	data: 需要校验的数据 如：
	form: {account:"", pwd:"", test:{number: "", price:""}}
	secondKey:如果data下面的属性仍为对象，则需要二级校验，此时需要传递一个数组，
	按照must第二个开始的顺序传递data下面的二级属性名,比如上面的form，此时需要这样传参：
	ruleFormTip(this, must, form, ["test"])

	*/
	ruleFormTip (obj, ruleForm, data, secondKey) {
		var j = 0
		for (let item of ruleForm) {
			if (j == 0) {
				for (let [i, k] of item.must.entries()) {
					if (!data[k]) {
						obj.$tip({ type: 1, isTip: true, message: item.tip[i] + "！" });
						return false;
					}
				}
			} else {
				for (let [i, k] of item.must.entries()) {
					if (!data[secondKey[j-1]][k]) {
						obj.$tip({ type: 1, isTip: true, message: item.tip[i] + "！" });
						return false;
					}
				}
			}
			j ++;
		}
		return true;
	},
	testThis (obj) {
		console.log(obj);
	
	}
}



