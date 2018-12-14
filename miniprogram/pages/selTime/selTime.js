// miniprogram/pages/selTime/selTime.js
import apiMock from '../../libs/api-mock.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema:{}, //电影院信息
    movies:[], //电影信息
    selIndex:0, //当前选中的电影
    pgDateArrs:[], //页面显示的日期数组
    selDateIndex:0, //当前选中的日期
    defaultDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cinema = JSON.parse(options.cinema);
    let date = '';
    let movieId =0;
    this.setData({
      cinema:cinema
    })
    if(options.date){
      date = options.date;
       this.setData({
         defaultDate:options.date
       })
    }
    if(options.movieId){
       movieId = options.movieId
    }
    apiMock.getFilmTict(cinema.id,res=>{
      let result = res.data.data.movies;
      result.forEach((item) => {
        item.img = item.img.replace('/w.h/', '/')//得到正确图片路径
      })

      result.map((movie)=>{  //得到结束时间以便于渲染到页面上
        return movie.shows.map(item=>{
          return item.plist.map(time=>{
            time['overTime'] = this.getOverTime(time.tm,movie.dur)
          })
        })
      })

   
    //-------------------------------------------------------------------------------------------------
    
      let pgDateArrs =  //得到页面显示的日期格式
      result.map((item)=>{    
        return item.shows.map((film)=>{
          return this.getShowDate(film.showDate)
        })
      })
     //-------------------------------------------------------------------------------------------
      this.setData({
        movies:result,
        pgDateArrs:pgDateArrs
      })
      for(let i =0;i<this.data.movies.length;i++){  //默认选中进来时的电影
        if(this.data.movies[i].id==movieId){
          this.setData({
            selIndex:i
          })
          break;
        }
      }

      this.selDefDate(); //默认选中进来时的日期

    })
  },

  changeMovie(e){ //滑动改变当前选中电影
    this.setData({
      selIndex:e.detail.current,
    })
    this.selDefDate();
  },

  selDefDate(){ //选中默认日期
    let showDates = this.data.movies[this.data.selIndex].shows
    let date = this.data.defaultDate;
    for (let j = 0; j <showDates.length; j++) {  //选中进来时选中的日期
      if (showDates[j].showDate == date) {
        this.setData({
          selDateIndex: j
        })
        break;
      }
    }
  },

  changeDate(e){ //改变日期
    this.setData({
      selDateIndex:e.detail.index
    })
  },

  getOverTime(startTime,dur){  //传入HH:MM格式时间和时长，计算出结束时间
    let overHour = parseInt(startTime.split(':')[0]) + parseInt(dur / 60)
    if (overHour >= 24) {
      overHour = overHour - 24;
    }
    if (overHour <= 9) {
      overHour = '0' + overHour;
    }
    let overMin = parseInt(startTime.split(':')[1]) + parseInt(dur % 60)
    
    if (overMin >= 60) {
      overHour += parseInt(overMin / 60);
      overMin = overMin % 60;
    }
    if (overMin <= 9) {
      overMin = '0' + overMin;
    }
    return  overHour + ':' + overMin
  },

  getShowDate(date) { //扒来的数据是YYYY-MM-DD格式，转换成页面显示的格式
    let str = date.replace(/-/g, '/');
    let dateObj = new Date(str);
    let nowDate = new Date();
    let pgDate = '';

    if (dateObj.getDate() == nowDate.getDate() && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '今天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else if (dateObj.getDay() == 5) {
      pgDate = '周五' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDay() == 6) {
      pgDate = '周六' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else if (dateObj.getDay() == 0) {
      pgDate = '周日' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDate() == nowDate.getDate() + 1 && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '明天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDate() == nowDate.getDate() + 2 && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '后天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else {
      pgDate = dateObj.getMonth() + 1 + '月' + dateObj.getDate() + '日'
    }
    return pgDate;
  },

  buyTict(e){//点击买票按钮
    let timeInfo = JSON.stringify(e.currentTarget.dataset.item);
    let filmInfo = JSON.stringify(this.data.movies[this.data.selIndex]);
    let cinema = JSON.stringify(this.data.cinema);
    let cinemas = 
    wx.navigateTo({
      url: '../selSeats/selSeats?timeInfo='+timeInfo+'&filmInfo='+filmInfo+'&cinema='+cinema,
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