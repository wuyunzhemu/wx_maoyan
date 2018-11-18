// miniprogram/pages/hotFilmInfo/hotFilmInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmInfo:{},
    isFold:true,
    actors:[],
    score:[]
  },


  changeFold(){
    this.setData({
      isFold:!this.data.isFold
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://wx.maoyan.com/hostproxy/mmdb/movie/v5/42964.json',//options.id
      method: 'GET',
      header: { str: 'content-type:application/json;charset=UTF-8' },
      success:res=>{
        let result = res.data.data.movie;
         result.img = result.img.replace('/w.h/movie','/movie');
         for(let i=0; i<result.photos.length;i++){
           result.photos[i] = result.photos[i].replace('/w.h/movie', '/movie');
         }
        let score = that.convertStarArray(result.sc)
        this.setData({
          filmInfo:result,
          score:score
        })
      }
    });

    wx.request({
      url: 'https://wx.maoyan.com/hostproxy/mmdb/v7/movie/42964/celebrities.json',//options.id
      method: 'GET',
      header: { str: 'content-type:application/json;charset=UTF-8' },
      success:actRes=>{
        let actResult = actRes.data.data
        actResult[0][0].roles="导演"
        for(let i=0;i<actResult.length;i++){
          for(let j=0;j<actResult[i].length;j++){
      
            actResult[i][j].avatar = actResult[i][j].avatar.replace('/w.h/', '/')
          }
          actResult[i].filter((item) => {
            return item.roles != '';
          })
        }
        this.setData({
          actors:actResult
        })
      }
    })
  },

  convertStarArray(score) {
      // 1 全星,0 空星,2半星
    let star = score / 2;
    let arr = []
    for(let i = 1; i <= 5; i++) {
    if (star >= i) {
      arr.push(1)
    } else if (score > i - 1 && star < i + 1) {
      arr.push(2)
    } else {
      arr.push(0)
    }
  }
  return arr
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