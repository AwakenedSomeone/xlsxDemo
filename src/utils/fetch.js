var canReq = true
import axios from 'axios'
// // 全局的 axios 默认值
axios.defaults.timeout = 20000;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : '';
// 加载动画
let loading;
// http请求拦截器
axios.interceptors.request.use(config => {
	config.data = JSON.stringify(config.data);
	return config;
}, error => {
	return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(res => {// 响应成功关闭loading
	return res.data;
}, error => {
	return Promise.reject(error)
})

// fetch 请求
export const fetch = (url, datas, method) => {
	url = 'https://hkrct.cninct.com/HKRC?op=' + url + (url == 'Login' ? '' : '&userid=' + this.common.localget('userinf').mbrId);
	fetch(url, {
		method: method || "post",
		body: datas
	}).then(response => { console.error('success:', response); response.json() })
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));
}

/**
 * 
 * @param {*} obj vue实例对象this
 * @param {*} url 请求接口路径
 * @param {*} datas 请求参数
 * @param {*} config 请求配置
 * @param {*} fileBool 是否是上传文件
 */


export const post = (obj, url, datas, config, fileBool) => {
	// 数据请求（自己的）
	url = 'http://192.168.1.141:10007/UserSys?op=' + url + (url == 'LOGIN' || url == "GetMsgCode" ? '' : '&userid=' + obj.common.localget('userinf').userid);

	return new Promise((resolve, reject) => {
		let isShow = typeof config === 'undefined' ? true : (config.showLoading == undefined ? true : false);
		var dc = datas.canReq;
		if (dc || canReq) {
			dc && (canReq = false);
			!isShow && (loading = obj.$loading({
				lock: true,
				text: '玩命加载中',
				background: 'rgba(0, 0, 0, 0.7)'
			}));
			
			//判断是否是文件传输
			let instance = axios;
			if (fileBool) {
				//解决axios传输文件为空的问题，可以设置为true，但是会出现跨域问题，
				//所以设置为false，也能传输文件，不会有跨域问题，虽然默认值就是为false，但是如果没有加上这一句，就不可以。
				instance = axios.create({
					withCredentials: false
				});
			}
			instance.post(url, datas, config).then((res) => {
				if (url.indexOf('Login') != -1 || url.indexOf('ModifyPW') != -1) {
					resolve(res);
				} else {
					(!isShow) && loading.close();
					if (res.state == 0) {
						dc && (canReq = true);
						resolve(res);
					} else if (res.state == 5) {
						dc && (canReq = true);
						obj.$tip({
							type: 0,
							isTip: true,
							message: "请重新登录！",
							func: function () {
								setTimeout(() => {
									sessionStorage.clear();
									obj.$router.replace({
										path: '/login'
									})
								}, 1000);
							}
						});
					} else {
						dc && (canReq = true);
						obj.$tip({ type: 1, isTip: true, message: res.message });
					}
				}
			}).catch((error) => {
				(!isShow) && loading.close();
				canReq = true;
				obj.$tip({ type: 1, isTip: true, message: '请求失败!' });
				reject(error);
			});
		}
	})
}
