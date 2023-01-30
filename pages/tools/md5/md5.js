// pages/tools/md5/md5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_url:'',
  },
  onOpenVideo:function(e){
    var that = this; // 这句话很重要，下面再介绍
    wx.chooseMedia({ // wx小程序的视频模块下的一个api
      count:1,
      sourceType:["album","camera"],
      mediaType: ["video"], // 在相册中选择，还是利用照相机进行拍摄
      success: function(res){ // 回调函数：再选择完视频之后，会将选择的视频文件传给res
        console.log("选择文件信息:",res.tempFiles);
        var video_url = res.tempFiles[0].tempFilePath;
        console.log("文件临时路径：",video_url);
        wx.navigateTo({
          url: '/pages/tools/md5/md5_details?url='+video_url
        })
        // wx.openVideoEditor({
        //   filePath:video_url,
        //   fail:function(res) {
        //     console.log("打开视频编辑器失败：",res)
        //   },success:function (res) {
        //     that.setData({
        //       video_url:video_url
        //     });
        //     wx.navigateTo({
        //       url: '/pages/tools/md5/md5_details'
        //     })
        //     console.log("打开视频编辑成成功：", res)
        //   }
        // });
        // wx.setStorageSync('videoFilePath', that.data.tempFilePath); // 将键值对<'videoFilePath', that.data.tempFilePath>存入本地缓存中
          
      }
    })
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

  }
})