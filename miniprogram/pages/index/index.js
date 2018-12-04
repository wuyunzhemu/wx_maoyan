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
    city:'',    //当前城市
    onShow_selected:true,    //导航是否选中热映
    isOnShow:true,     //该元素是否为热映元素
    hot:[],        //热映电影列表
    onShow_finishLoad:false,    //是否加载完成
    lastHotListSize:0,
    hasHotDataMore:false, //是否还有数据
    nowTime:new Date().getTime() //当前时间 判断电影是否已经上映
  },

  onLoad: function() {
    wx.showLoading({
      title: '正在加载',
      mask:true
    })
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
    wx.hideLoading();
  },
  onShow: function () {

  },
  onReady:function(){

  },

  getOnShowFilmInfo:function(){    
    //获取热映影片基础信息
    //数量
    let city = this.data.city; //城市
    let offset = this.data.hot.length;
    apiMock.getFilmList(offset,city,res => {
        let result = res.data.data.hot;
        let hotList = this.data.hot;  
         result.forEach((item) => {
           item.img = item.img.replace('/w.h/', '/')
           item.mk = item.mk.toFixed(1)
        })
        
        hotList=[...hotList,...res.data.data.hot]
        this.setData({
          hot: hotList,
          hasHotDataMore: res.data.data.paging.hasMore,
        })  
      })
  },

  onReachBottom(){
    //触底新增列表 
    if(this.data.hasHotDataMore){
      this.getOnShowFilmInfo();
    }
    
  },

  getCity:function(){
    //获取城市信息
    wx.getLocation({
      success: res => {
        let lat = res.latitude,
        lnt = res.longitude
        qqmap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success:res=>{
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            let district = res.result.ad_info.district
            city = city.substring(0,city.length-1);
            district = district.substring(0,city-1);
            apiMock.getCity(ctRes=>{
            //------------------------------------------------------
            //得到猫眼API的城市对象
              for(let i=0;i<ctRes.data.cts.length;i++){
                if(district ===ctRes.data.cts[i].nm){
                  city = ctRes.data.cts[i]
                  break;
                }
              }
              if((typeof city)==='string')
              {
                for (let i = 0; i < ctRes.data.cts.length; i++) {
                  if (city === ctRes.data.cts[i].nm) {
                    city = ctRes.data.cts[i]
                    break;
                  }
                }
              }
            //---------------------------------------------------------
             
              this.setData({
                city: city,
                finishedLocal: true
              })
              app.globalData.lnt = lnt;
              app.globalData.lat = lat;
              app.globalData.userCity = this.data.city; 
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
    })
  }
})

