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
    console.log(cinema)
    console.log(options.date)
    console.log(options.movieId)
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

   
    //-------------------------------------------------------------------------------------------------
     //扒来的数据是YYYY-MM-DD格式，转换成页面显示的格式= =并用一个新数组接受，方便传递给组件，
      let pgDateArrs = 
      result.map((item)=>{     
        return item.shows.map((film)=>{
          let str = film.showDate.replace(/-/g, '/');
          let dateObj = new Date(str);
          let nowDate = new Date();
          let pgDate ='';
          if (dateObj.getDate() == nowDate.getDate()+1 && dateObj.getMonth()==nowDate.getMonth()) {  //优先级低的在前面
            pgDate = '明天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }

          else if (dateObj.getDay() == 6) {
            pgDate = '周六' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }
          else if (dateObj.getDay() == 0) {
            pgDate = '周日' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }

          else if (dateObj.getDate() == nowDate.getDate() && dateObj.getMonth() == nowDate.getMonth()) {
            pgDate = '今天' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
          }
          else {
            pgDate = dateObj.getMonth() + 1 + '月' + dateObj.getDate() + '日'
          }
          return pgDate;
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
    console.log(this.data.selDateIndex)
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