// miniprogram/pages/movie/movie.js
import apiMock from '../../libs/api-mock.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemaList:[],
    hasMoreCinema:true,
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '正在加载',
      mask:true
    })
    this.getCinema();
    this.setData({
      city:app.globalData.userCity.nm
    })
    wx.hideLoading();
  },


  getCinema:function(){
    let city = app.globalData.userCity;
    let lnt = app.globalData.lnt;
    let lat = app.globalData.lat;
      apiMock.getCinema(city.id, this.data.cinemaList.length, lnt, lat, cnmRes => {
        let cinemas = cnmRes.data.data.cinemas;
        let addCinemas = [...this.data.cinemaList, ...cinemas];
        this.setData({
          cinemaList: addCinemas,
          hasMoreCinema: cnmRes.data.data.paging.hasMore,
        })
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let city = app.globalData.userCity;
    let lnt = app.globalData.lnt;
    let lat = app.globalData.lat;
      apiMock.getCinema(city.id, 0, lnt, lat, cnmRes => {
        let cinemas = cnmRes.data.data.cinemas;
        let addCinemas = [...this.data.cinemaList, ...cinemas];
        this.setData({
          cinemaList: addCinemas,
          hasMoreCinema: cnmRes.data.data.paging.hasMore,
        })
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMoreCinema)
    {
      this.getCinema();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})