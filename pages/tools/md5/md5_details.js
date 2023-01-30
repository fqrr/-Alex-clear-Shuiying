// pages/tools/md5_details/md5_details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_url:'',
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
    var value = options.url;
    if (!value) {
      // 请求失败
      app.error("获取链接错误，请返回重试");
      return;
    }
    this.setData({
      'video_url': value
    });
    app.success();
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
  onSaveVideo:function(e){
    app.onSaveVideo(this.data.video_url);
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