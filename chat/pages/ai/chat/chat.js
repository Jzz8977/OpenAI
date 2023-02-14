const app = getApp()
import request from '../../../utils/request'
import WXDATA from '../../../utils/api'
console.log(WXDATA.WXDATA, 'WXDATAWXDATAWXDATA')
// components/chat/chat.js
Page({
    /**
     * 组件的初始数据
     */
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '标题', //导航栏 中间的标题
            white: true, // 是就显示白的，不是就显示黑的。
            address: '../../images/蒙版组 1@2x.png' // 加个背景 不加就是没有
        },
        // 导航头的高度
        height: app.globalData.height * 2 + 20,
        customerImg: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
        GPT: "https://tdesign.gtimg.com/miniprogram/images/avatar3.png",
        question: '',
        inputValue: '',
        list: [
        ]



    },



        bindKeyInput: function (e) {
            var inputModel = e.currentTarget.dataset.name;
            //通过value获取当前用户输入的内容
            var value = e.detail.value;
            //将input所对应的全局属性的属性只更新
            this.data[inputModel] = value;
            this.setData({
                inputValue: this.data[inputModel]
            });
        },
        askQuestion(e) {
            let obj = {
                word: this.data.inputValue,
                type: 'question'
            }
            this.data.list.push(obj)
            this.setData({
                list: this.data.list
            })
            this.requestQuestion()
        },
        requestQuestion() {
            request({
                url: `${WXDATA.WXDATA}/answer?question=${this.data.inputValue}`,
                method: "GET",
                showLoading: true,
                fail: () => {

                },
                isSuccess: () => true,
                success: (res) => {
                    const answer = res.bot
                    if(answer.length>0){
                        let obj = {
                            word: answer,
                            type: 'answer'
                        }
                        this.data.list.push(obj)
                        this.setData({
                            list: this.data.list,
                            inputValue: ''
                        })
                    }else{
                        let obj = {
                            word: answer,
                            type: 'answer'
                        }
                        this.data.list.push(obj)
                        this.setData({
                            inputValue: ''
                        })
                    }
                },
            })
        },
        
})