// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    value:'',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
 
  getURLFromString(string) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    if (reg.test(string)) { // 包含url链接
      return string.match(reg)[0];
    } else {
      return "";
    }
  },
  onLoad() {
    var that = this;
    
    var d = wx.getClipboardData({
      success (res){
        var url = that.getURLFromString(res.data)
        if(url){
          wx.showModal({
            title: '剪切板',
            confirmText:"粘贴",
            content: '检测到剪切板有链接，是否确认粘贴？',
            success (res) {
              if (res.confirm) {
                that.setData({
                  'value':url
                })
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        
        }
        console.log("剪切板内容：",url)
      }
    });

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getValue:function(e){
    // 获取到input的值
    let name = e.detail.value;
    // 获取到光标的位置
    let local = e.detail.cursor;
    this.setData({"value":name})
  },
  bindDecode: function (e) {
    console.log("点击解析", e)
    
    var that = this;
    console.log("内容：",that.data.value)
    return that.detail(that.data.value);
    
  },
  detail:function(value){
    console.log("跳转参数：",value)
    wx.navigateTo({
      url: '/pages/video_default/video_default?value='+encodeURIComponent(value),
      fail:function(res){
        console.log("跳转详情失败",res)
      },
      success: function(res) {
        console.log("跳转详情成功",res)
       }  
    });
  },
 
})
