//index.js
const apiMock = require('../../libs/api-mock.js')
const QQMapWX = require('../../libs//qqmap-wx-jssdk.js');
const qqmap = new QQMapWX({
  key: '4LJBZ-CQI6U-ZBZVR-BJZ2Y-IX3OQ-LUBZG'
})
const db = wx.cloud.database();
const onShowFilms = db.collection('onShowFilms')
// 调用接口
const app = getApp()

Page({
  data: {
    finishedLocal:false,    //是否完成定位
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    city:'',    //当前城市
    onShow_selected:true,    //导航是否选中热映
    isOnShow:true,     //该元素是否为热映元素
    hot:[],        //热映电影列表
    onShow_finishLoad:false,    //是否加载完成
    listSize:12,    //单页电影数
    lastHotListSize:0,
    hasHotDataMore:false, //是否还有数据
    nowTime:new Date().getTime()
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userLocation']){
          this.getCity();
        }
        else{
          wx.authorize({ scope: "scope.userLocation"})
        }
        this.getOnShowFilmInfo();
      }
    })
  },
  onShow: function () {

  },
  onReady:function(){

  },

  getOnShowFilmInfo:function(){    
    //获取热映影片基础信息
    let limit = this.data.hot.length + this.data.listSize;//数量
    let city = this.data.city; //城市
    apiMock.getFilmList(limit,city,res => {
        if(this.data.lastHotListSize === res.data.data.hot.length){  //判断请求是否还返回数据
          this.setData({
            hasHotDataMore:false
          })
          return;
        }
        let result = res.data.data.hot;
        let hotList = this.data.hot;  
         result.forEach((item) => {
           item.img = item.img.replace('/w.h/', '/')
        })
        
        hotList=[...hotList,...res.data.data.hot]
        let increaseNum = result.length-this.data.hot.length;   //每次请求增加多少数据
        this.setData({
          hot: result,
          onShow_finishLoad: true,
          hasHotDataMore: true
        })  
        this.data.lastHotListSize+=increaseNum;
      })
  },

  onReachBottom(){
    //触底新增列表 
    this.getOnShowFilmInfo();
  },

  getCity:function(){
    //获取城市信息
    wx.getLocation({
      success: res => {
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:res=>{
            this.setData({
              onShow_finishLoad: true,
            })
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            let district = res.result.ad_info.district
            this.setData({
              province: province,
              city: city,
              finishedLocal:true
            })
          
          }
        })
      }
    })
  },
  changeSelect(e){
    //在 热映 及 待映 间切换
    if (!this.data.onShow_selected == e.currentTarget.dataset.onshow){
      const change = !this.data.onShow_selected
      this.setData({
        onShow_selected: change
      })
    }

  },

  intofilmInfo(e){
    //跳转进入影片详细信息页面
    wx.navigateTo({
      url: '../hotFilmInfo/hotFilmInfo?id='+e.currentTarget.dataset.id,
      success:res=>{
        console.log(res)
      }
    })
  }
})

