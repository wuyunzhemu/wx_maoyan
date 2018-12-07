// miniprogram/pages/selTime/selTime.js
import apiMock from '../../libs/api-mock.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema:{}, //电影院信息
    movies:[], //电影信息
    selIndex:0 //当前选中的电影
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cinema = JSON.parse(options.cinema);
    console.log(cinema)
    console.log(options.date)
    console.log(options.movieId)
    this.setData({
      cinema:cinema
    })
    if(options.date){
      let date = options.date
    }
    if(options.movieId){
      let movieId = options.movieId
    }
    apiMock.getFilmTict(cinema.id,res=>{
      console.log(res);
      let result = res.data.data.movies;
      result.forEach((item) => {
        item.img = item.img.replace('/w.h/', '/')//得到正确图片路径
      })
      this.setData({
        movies:result
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