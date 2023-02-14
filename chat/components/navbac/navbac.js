// components/navbac/navbac.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goBack(){
            wx.navigateBack({
              delta: 1,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
        }
    }
})
