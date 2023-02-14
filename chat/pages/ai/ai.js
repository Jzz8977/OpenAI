const app = getApp()
// pages/ai/ai.js
Page({

    /**
     * 页面的初始数据
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
        list:[
            {
                title:'ChatGPT',
                content:"它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动,能撰写邮件、视频脚本、文案、翻译、代码，写论文...",
                key:  "/pages/ai/chat/chat"
            },
            {
                title:'DALL·E 2',
                content:"它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动,能撰写邮件、视频脚本、文案、翻译、代码，写论文...",
                key:"/pages/ai/dell/dell"
            },
            {
                title:'DALL·E 2',
                content:"它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动,能撰写邮件、视频脚本、文案、翻译、代码，写论文...",
                key:"/pages/ai/dell/dell"
            },
            {
                title:'DALL·E 2',
                content:"它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动,能撰写邮件、视频脚本、文案、翻译、代码，写论文...",
                key:"/pages/ai/dell/dell"
            },
            {
                title:'DALL·E 2',
                content:"它能够通过学习和理解人类的语言来进行对话，还能根据聊天的上下文进行互动,能撰写邮件、视频脚本、文案、翻译、代码，写论文...",
                key:"/pages/ai/dell/dell"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    onDirect(e){
        let detail = e.currentTarget.dataset.key
        debugger
        wx.navigateTo({
            url: detail,
            success: function(res) {
              // 通过 eventChannel 向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    }
})