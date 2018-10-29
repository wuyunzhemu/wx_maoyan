//index.js
const QQMapWX = require('../../libs//qqmap-wx-jssdk.js');
const qqmap = new QQMapWX({
  key: '4LJBZ-CQI6U-ZBZVR-BJZ2Y-IX3OQ-LUBZG'
})
// 调用接口
const app = getApp()

Page({
  data: {
    finishedLocal:false,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    city:[],
    onShow_selected:true,
    isOnShow:true
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }else{   
        }
        if(res.authSetting['scope.userLocation']){
        this.getCity();
        }
        else{
          wx.authorize({ scope: "scope.userLocation"})
        }
      }
    })
  },
  onShow: function () {
    qqmap.search({
      keyword: '电影院',
      success:res=>{
        console.log(res);
      }
    });    
  },
  getCity:function(){
    wx.getLocation({
      success: res => {
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:res=>{
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            let district = res.result.ad_info.district
            this.setData({
              province: province,
              city: city,
              finishedLocal:true
            })
            console.log(this.data)
          }
        })
      }
    })
  },
  changeSelect(e){
    if (!this.data.onShow_selected == e.currentTarget.dataset.onshow){
      const change = !this.data.onShow_selected
      this.setData({
        onShow_selected: change
      })
    }

  }
})

