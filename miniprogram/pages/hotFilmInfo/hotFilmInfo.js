// miniprogram/pages/hotFilmInfo/hotFilmInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.request({
      url: 'https://wx.maoyan.com/hostproxy/mmdb/movie/v5/'+options.id+'.json',
      method: 'GET',
      header: { str: 'content-type:application/json;charset=UTF-8' },
      success:res=>{
        console.log(res)
        let result = res.data.data.movie;
         result.img = result.img.replace('/w.h/movie','/movie');
         for(let i=0; i<result.photos.length;i++){
           result.photos[i] = result.photos[i].replace('/w.h/movie', '/movie');
         }
        this.setData({
          filmInfo:result
        })
      }
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