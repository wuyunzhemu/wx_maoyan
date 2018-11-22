// miniprogram/pages/hotFilmInfo/hotFilmInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmInfo:{},
    isFold:true,
    actors:[],
    comnts:{
      list:[],
      total:0
    }
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
        result.photos = that.getRealUrl(result.photos)
        result.sc = parseFloat(result.sc);
        // let score = that.convertStarArray(result.sc/2)
        this.setData({
          filmInfo:result,
          // score:score
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
        actResult.forEach((actor)=>{
          actor=actor.forEach((item)=>{
            item.avatar = item.avatar.replace('/w.h/', '/');//得到正确地址
            item.roles != ''; //演职人员列表只展示导演及演员
            return item;
          })
          return actor;
        })
        this.setData({
          actors:actResult
        })
      }
    });
    wx.request({
      url: 'https://wx.maoyan.com/hostproxy/mmdb/comments/movie/v2/42964.json',//options.id
      method:'GET',
      header: { str: 'content-type:application/json;charset=UTF-8' },
      success:comntRes=>{
        console.log(comntRes);
        let comnts = [];
        for(let i =0;i<3;i++){
          // comntRes.data.hcmts[i].starArr =that.convertStarArray( comntRes.data.hcmts[i].score)
          comnts.push(comntRes.data.hcmts[i])
        }
           
        that.setData({
          'comnts.list':comnts,
          'comnts.total':comntRes.data.total
        })
      }
    })
  },

  getRealUrl(arr){
    //得到图片正确路径
    arr = arr.map((item)=>{
      item = item.replace('/w.h/', '/');
      return item;
    })
    return arr;
  },

  // convertStarArray(score) {
  //     // 1 全星,0 空星,2半星
  //   let arr = []
  //   for(let i = 1; i <= 5; i++) {
  //   if (score >= i) {
  //     arr.push(1)
  //   } else if (score > i - 1 && score < i + 1) {
  //     arr.push(2)
  //   } else {
  //     arr.push(0)
  //   }
  // }
  // return arr
  // },

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