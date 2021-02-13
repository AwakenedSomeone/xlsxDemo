<template>
    <div class="box txl">
        <div v-if="type == 1">
            <div class="mgt40 posr">
                <img class="posa login-icon zindex" style="width: 19px;" src="./imgs/user_login.png">
                <el-input class="input-m" v-model="loginForm.account" @keyup.native="inputLimit('account')" @blur.prevent="blurFun('account')" placeholder="请输入你的账户"></el-input>
            </div>
            <div class="mgt20 posr">
                <img class="posa login-icon zindex" style="width: 16px;" src="./imgs/lock.png">
                <el-input v-model="loginForm.password" class="input-m" type="password" auto-complete="new-password" placeholder="请输入你的密码"></el-input>
            </div>
            <div class="mgt40 f16 txr cusp remember">
                <el-checkbox v-model="remember" >记住密码</el-checkbox>
            </div>
        </div>
        <div v-if="type == 2">
            <div class="mgt40 posr">
                <img class="posa login-icon zindex vtm" style="width: 19px;" src="./imgs/user_login.png">
                <el-input class="input-m" v-model="loginForm.account" @keyup.native="inputLimit('account')" @blur.prevent="blurFun('account')" placeholder="请输入你的账户"></el-input>
            </div>
            <div class="mgt20 posr ">
            <img class="posa login-icon zindex vtm" style="width: 16px;" src="./imgs/lock.png">
                <el-input v-model="loginForm.code" style="width:70%" class="input-m disi" type="password" auto-complete="new-password" placeholder="请输入验证码"></el-input>
                <el-button :type='codeSend?"info": "primary"' :disabled="codeSend"  class="disi" @click="getCode">{{codeMsg}}</el-button>
            </div>
        </div>
        <div class="mgt40 txc">
             <label class=" cusp loginbtn disi" @click="login" style="width:200px;">登录</label>
        </div>
    </div>
</template>
<script>
// 手机号+密码的登录方式
export default {
    data() {
        return {
            account: "",
            password: "",//密码
            remember: true,
            isLoging: false,
            code: "",//验证码
            codeMsg: "验证码",
            codeSend: false,
            loginForm: {
                account: "",
                password: "",
                code: "",
            },
            must:
                [
                    {
                        must: [
                        "account",
                        this.type == 1? "password" : "code"
                        ],
                        tip: [
                            "请输入账号",
                            this.type == 1? "请输入密码" : "请输入验证码"
                        ]
                    }
                ]
        };
    },
    props: [
        "type", //type:  1:密码登录，2：验证码登录
        "jampUrl", //jampUrl:  登录成功后跳转的路由
        "ifMd5"],//ifMd5： 是否需要md5加密
    mounted(){
        this.getCookie();
    },
    methods: {
        //发送验证码
        getCode () {
            if (!this.loginForm.account) {
                this.$tip({ isTip: true, message: "请输入账号" });
                return;
            }
            this.post(this, "GetMsgCode", { mobile: this.loginForm.account}).then(res => {
                if (res.state == 0) {
                    this.codeSend = true;
                    this.$tip({ isTip: true, message: "验证码已发送！" });
                    var i = 60;
                    this.codeMsg= i +"（秒）";
                    var st = setInterval(() => {
                        if (i == 0) {
                            clearInterval(st);
                            this.codeMsg= "重新获取";
                            this.codeSend = false;
                        }
                        i --;
                        this.codeMsg= i +"（秒）";
                    }, 1000);
                } else {
                    this.$tip({ isTip: true, message: res.message });
                }
            });
        },
        //发送登录信息
        login() {
            if (this.common.ruleFormTip(this, this.must, this.loginForm)) {
                this.isLoging = true;
                var param = {};
                
                if (this.type == 1) {
                    param = {
                       mobile: this.loginForm.account, 
                       pwd: this.ifMd5?this.md5(this.loginForm.password) :this.loginForm.password
                    }
                } else {
                    param = {
                       mobile: this.loginForm.account, 
                       code: this.loginForm.code
                    }
                }
                var that = this;
                this.post(this, "LOGIN", param, {showLoading: true}).then(res => {
                    if (res.state == 0) {
                        var remeberFlag;
                        //判断复选框是否被勾选
                        if (that.remember) {
                            remeberFlag = true;
                        }else {
                            remeberFlag = false;
                        }
                        //调用配置cookie方法,传入账号名，密码，和保存天数3个参数
                        that.type == 1&&this.setCookie(that.loginForm.account, that.loginForm.password, 7, remeberFlag);
                        that.common.localset('userinf',res.ext)
                        this.$router.push({
                        path: this.jampUrl
                        });
                    } else {
                        this.$tip({ isTip: true, message: res.message });
                    }
                });
            }
        },
        inputLimit(key) {
            if (this[key]) {
                this[key] = this[key].replace(/[^\.\d]/g, "");
                this[key] = this[key].replace(".", "");
            }
        },
        blurFun(key) {
        const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
        if (this.loginForm[key]) {
            if (phoneReg.test(this.loginForm[key]) == false) {
            this.$tip({ isTip: true, message: "请输入正确的电话号码！" });
            this.loginForm[key] = "";
            }
        }
        },
        //设置cookie
        setCookie(c_name, c_pwd, exdays, remeberFlag) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            if(remeberFlag){
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "remeberFlag" + "=" + remeberFlag + ";path=/;expires=" + exdate.toGMTString();
            }else{
            window.document.cookie = "userName" + "=" + '';
            window.document.cookie = "userPwd" + "=" + '';
            window.document.cookie = "remeberFlag" + "=" + false;
            }
        },

        //读取cookie
        getCookie() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.loginForm.account = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.loginForm.password = arr2[1];
                    }else if(arr2[0]=='remeberFlag'){
                        this.remember =new Boolean(arr2[1]);
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss">
 .loginbtn{
    background: linear-gradient(to right,#2180FF,#77D3FF);
    box-shadow: #77D3FF 0 5px 3px 0 ;//边框阴影
    text-align: center;
    border-radius: 20px;
    line-height: 40px;
    color: white;
    font-size: 14px;
  }
.login-icon {
    left: 10px;
    top: 15px;
}
.box .input-m{
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: #f0f5fb;
    padding-left: 30px;
    box-sizing: border-box;
}
</style>

