// miniprogram/pages/selSeats/selSeats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = JSON.parse(options.timeInfo);
    let film = JSON.parse(options.filmInfo)
    let cinema =JSON.parse(options.cinema);
    let pgDate = this.getShowDate(time.dt);
    this.setData({
      film:film,
      time:time,
      cinema:cinema,
      pgDate:pgDate
    })
  },


  getShowDate(date) { //扒来的数据是YYYY-MM-DD格式，转换成页面显示的格式
    let str = date.replace(/-/g, '/');
    let dateObj = new Date(str);
    let nowDate = new Date();
    let pgDate = '';

    if (dateObj.getDate() == nowDate.getDate() && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '今天 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else if (dateObj.getDay() == 5) {
      pgDate = '周五 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDay() == 6) {
      pgDate = '周六 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else if (dateObj.getDay() == 0) {
      pgDate = '周日 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDate() == nowDate.getDate() + 1 && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '明天 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }

    else if (dateObj.getDate() == nowDate.getDate() + 2 && dateObj.getMonth() == nowDate.getMonth()) {
      pgDate = '后天 ' + parseInt(dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日'
    }
    else {
      pgDate = dateObj.getMonth() + 1 + '月' + dateObj.getDate() + '日'
    }
    return pgDate;
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