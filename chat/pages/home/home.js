  Page({
    data: {
      menu: 'home',
      customerImg: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
      GPT: "https://tdesign.gtimg.com/miniprogram/images/avatar3.png",
      tabs: [{
          value: 'home',
          icon: 'home',
          label: '首页',
          url: 'pages/home/home',
        },
        {
          value: 'chat',
          icon: 'chat',
          label: '聊天',
          url: 'pages/cart/index',
        },
        {
          value: 'user',
          icon: 'user',
          label: '我的',
          url: 'pages/usercenter/index',
        },
      ],
    },

    onShow() {
    },
  
    onLoad() {
      // this.init();
    },
  
    onPullDownRefresh() {
    },
  
    init() {
      login()
      this.setData({
        menu: this.data.tabs[0].value
      })
    },
    login() {
        wx.login ({
            success: res => {
              if (res.code) {
                wx.request ({
                  url: 'https://test.com/onLogin', //测试api
                  data: {
                    code: res.code, //用户登录凭证，有效期5分钟
                  },
                  header: {
                    'content-type': 'application/json', //请求头
                  },
                  success: function (result) {
                    //json转化
                    const res = JSON.parse (result);
                    //解构赋值
                    const {openid, session_key, unionid, errorcode} = res.data;
                    //errorcode 状态码
                    if (errorcode === -1) {
                      console.log ('系统繁忙，请稍微重试');
                      return;
                    } else if (errorcode === 0) {
                      console.log ('请求成功');
                    } else if (errorcode === 40029) {
                      console.log ('code无效');
                      return;
                    } else if (errorcode === 45011) {
                      console.log ('请求过于频繁');
                      return
                    } else {
                      console.log ('未知错误');
                      return 
                    }
                    //data存储
                    this.data.openid = openid;
                    this.data['session_key'] = session_key;
                    this.data.unionid = unionid;
                    //数据缓存
                    this.setStorage ({
                      key: 'WxLoginInfo',
                      value: {
                        openid: openid,
                        session_key: session_key,
                        unionid: unionid,
                      },
                    });
                  },
                  fail: function (result) {
                    console.log (result);
                  },
                });
              } else {
                console.log ('登录失败' + res.errMsg);
              }
            },
          });
      wx.getUserProfile({
        desc: '必须授权才能继续使用', // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中

        success: (res) => {
          console.log('授权成功', res);
          this.setData({
            userInfo: res.userInfo
          })
        },
        fail: (err) => {

          console.log('授权失败', err);
        }
      })
    },
    onChange(event) {
      this.setData({
        menu: event.detail.value
      });
    }
  });