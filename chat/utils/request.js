import alert from './alert'
import Message from 'tdesign-miniprogram/message/index';

const request = option => {
    if (typeof option === 'string') {
        option = {
            url: option,
        }
    } else if (typeof option !== 'object') {
        Message.error({
            context: this,
            offset: [20, 32],
            duration: 5000,
            content: '参数错误',
        });
        return
    }
    const {
        url,
        data,
        header = {
            'content-type': 'application/x-www-form-urlencoded',
        },
        method = 'GET',
        dataType = 'json',
        responseType = 'text',
        showLoading = true,
        fail = res => {
            Message.error({
                context: this,
                offset: [20, 32],
                duration: 5000,
                content: '网络异常',
            });
        },
        complete = () => {},
        isSuccess = data => false,
        success = data => {},
        isNoLogin = data => false,
        noLogin = data => {
            Message.error({
                context: this,
                offset: [20, 32],
                duration: 5000,
                content: (data && (data.message || data.errmsg || data.msg)) || '未登录'
            });
        },
        error = data => {
            Message.error({
                context: this,
                offset: [20, 32],
                duration: 5000,
                content: (data && (data.message || data.errmsg || data.msg)) || '接口异常'
            });
        },
    } = option
    if (typeof fail !== 'function' || typeof complete !== 'function' || typeof isSuccess !== 'function' || typeof success !== 'function' || typeof isNoLogin !== 'function' || typeof noLogin !== 'function' || typeof error !== 'function') {
        Message.error({
            context: this,
            offset: [20, 32],
            duration: 5000,
            content: '参数错误'
        });
        return
    }

    showLoading && wx.showLoading({
        title: '加载中',
    })
    if (method === 'GET') {
        
    wx.request({
        url,
        data,
        header,
        method,
        dataType,
        responseType,
        success: ({
            data,
        }) => {
            showLoading && wx.hideLoading()

            if (isSuccess(data) || data.code === 1001 || data.errno === 0) {
                success(data)
            } else if (isNoLogin(data) || data.code === 1024 || data.errno === 3520) {

                noLogin(data)
            } else {
                error(data)
            }
        },
        fail: res => {
            showLoading && wx.hideLoading()

            fail(res)
        },
        complete,
    })
    } else {
        wx.request({
            url, //接口
            method: 'POST',
            data: JSON.stringify({
                question :'123123'
            }),
            body:JSON.stringify({
                question :'123123'
            }),
            header,
            success: function (res) {
                that.setData({ //这里是修改data的值  
                    test: res.data //test等于服务器返回来的数据  
                });
                console.log(res.data)
            }
        });
    }
}

export default request