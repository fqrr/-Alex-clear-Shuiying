// pages/video_default/video_default.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    data: '',
  },
  onSaveImages:function (e) {
    console.log("保存封面：",this.data.data.cover)
    app.onSaveImages(this.data.data.cover)
  },
  onSaveVideo:function(e){
    console.log("点击保存视频：",this.data.data.url)
    //下载
    app.onSaveVideo(this.data.data.url,1);
 
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    app.loading();
    var that = this;
    console.log("传递的内容：", options)
    if (!options) {
      app.error("页面超时");
      return;
    }
    var value = options.value;
    if (!value) {
      // 请求失败
      app.error("获取链接错误，请返回重试");
      return;
    }
    this.setData({
      'value': value
    });
    wx.request({
      url: 'https://bytedance.rootmao.com', //仅为示例，并非真实的接口地址
      data: {
        method: 'dewatermark-v2',
        video_url: value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("请求响应：", res.data)
        if (!res.data.code) {
          var res_result = res.data.result.data;
          console.log("data:", res_result)
          that.setData({
            "data": res_result
          });
          wx.setNavigationBarTitle({
            title: res_result.title + ' - 短视频去水印'
          });
          app.success();
          
          console.log("解析url：", res_result.cover)
        } else {
          app.error("获取视频错误：" + res.data.message);
        }

      },
      error: function (res) {
        console.log("获取接口异常：", res)
        app.error("网络异常，请返回重试");
      }
    })
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

  }
})