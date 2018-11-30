// miniprogram/pages/movie/movie.js
import apiMock from '../../libs/api-mock.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemaList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let city = app.globalData.userCity;
    let lnt = app.globalData.lnt;
    let lat = app.globalData.lat;
    apiMock.getCinema(city.id, 0, lnt, lat, cnmRes => {
      let cinemaList = cnmRes.data.data.cinemas
      this.setData({
        cinemaList:cinemaList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let city = app.globalData.userCity;
    let lnt = app.globalData.lnt;
    let lat = app.globalData.lat;
    apiMock.getCinema(city.id, 0, lnt, lat, cnmRes => {
      let cinemaList = cnmRes.data.data.cinemas
      this.setData({
        cinemaList: cinemaList
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})