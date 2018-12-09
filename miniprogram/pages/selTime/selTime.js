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
    let date = '';
    let movieId =0;
    this.setData({
      cinema:cinema
    })
    if(options.date){
       date = options.date
    }
    if(options.movieId){
       movieId = options.movieId
    }
    apiMock.getFilmTict(cinema.id,res=>{
      let result = res.data.data.movies;
      result.forEach((item) => {
        item.img = item.img.replace('/w.h/', '/')//得到正确图片路径
      })

   
    //-------------------------------------------------------------------------------------------------
     //扒来的数据是YYYY-MM-DD格式，转换成页面显示的格式= =，
      result.map((item)=>{     
        item.shows.map((film)=>{
          let str = film.showDate.replace(/-/g, '/');
          let dateObj = new Date(str);
          let nowDate = new Date();
          let pgDate ='';
          
          if (dateObj == new Date((new Date()).setDate((new Date()).getDate + 1))) {  //优先级低的在前面
            pgDate = '明天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }

          else if (dateObj.getDay() == 6) {
            pgDate = '周六' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }
          else if (dateObj.getDay() == 0) {
            pgDate = '周日' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }

          else if (dateObj == new Date()) {
            pgDate = '今天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }
          else {
            pgDate = dateObj.getMonth() + 1 + '月' + dateObj.getDate() + '日'
          }
          console.log(pgDate);
          film['pgDate'] = pgDate;
        })
      //-------------------------------------------------------------------------------------------
      })

      this.setData({
        movies:result
      })
      for(let i =0;i<this.data.movies.length;i++){  //默认选中进来时的电影
        if(this.data.movies[i].id==movieId){
          this.setData({
            selIndex:i
          })
          break;
        }
      }
    })
  },

  changeMovie(e){
    this.setData({
      selIndex:e.detail.current,
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