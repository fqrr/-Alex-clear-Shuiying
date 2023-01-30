// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  
  onSaveImages:function (filePath) {
    var that = this;
    that.loading();
    wx.getImageInfo({
      src: 'https://bytedance.rootmao.com?method=getimages&url='+encodeURIComponent(filePath),
      fail:function (res) {
        console.log("获取图片失败:",res);
        that.error("获取图片信息错误"); 
      },
      success (res) {
        console.log("图片地址：",res.path)
        console.log("保存图片：",res);
        wx.saveImageToPhotosAlbum({
          filePath:res.path,
          success(res) { 
            that.success("保存成功");
            console.log("保存图片成功:", res)
          },fail:function (res) {
            console.log("保存失败:",res);
            that.error("保存失败");
          }
        })
      }
    })
  },
  onSaveVideo: function (filePath, type = 0) {
    var that = this;
    that.loading();
    if (type == 0) {
      wx.saveVideoToPhotosAlbum({
        filePath: filePath,
        success(res) {
          console.log("视频保存成功：", res)
          that.success("视频保存成功");
        },
        fail: function (res) {
          that.error("视频保存失败");
          console.log("视频保存失败：", res)
        }
      })
    } else {
      //视频保存到相册跟图片保存到相册使用方式相同
      //下载到本地，判断是否拥有权限
      wx.getSetting({
        withSubscriptions: true,
        success: res => {
          console.info(res.authSetting);
          if (res.authSetting['scope.writePhotosAlbum']) {
            wx.downloadFile({
              url: 'https://bytedance.rootmao.com?method=getvideo&url=' + encodeURIComponent(filePath),
              success: res => {
                //保存到相册
                wx.saveVideoToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: res => {
                    console.info(res);
                    that.success('保存成功');
                  },
                  fail: res => {
                    that.error('保存失败');
                  }
                })
              }
            });

          } else {
            wx.showModal({
              cancelColor: 'cancelColor',
              title: '提示',
              content: '请开启相册访问权限',
              success: res => {
                if (res.confirm)
                  wx.openSetting({
                    withSubscriptions: true,
                  })
              }
            })
          }
        }
      })
    }

  },
  loading: function (msg = "加载中...") {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: msg,
    })
  },
  success: function (msg = "请求成功") {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration:2000
    });
    wx.hideNavigationBarLoading();
    wx.hideLoading({noConflict:true});  
  },
  error: function (msg = "请求错误", title = '错误') {
    wx.hideLoading();
    wx.showModal({
      title: title,
      content: msg,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('错误内容：用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

        wx.navigateBack({
          delta: 1,
          fail: function (e) {
            wx.reLaunch({
              url: '/pages/index/index'
            });
            console.log("返回失败，来源错误", res)
          }
        });
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        wx.hideToast();
      }
    })

  },
  globalData: {
    userInfo: null
  }
})