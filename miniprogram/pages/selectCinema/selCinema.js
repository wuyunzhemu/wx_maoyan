// miniprogram/pages/selectCinema/selCinema.js
import apiMock from '../../libs/api-mock.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cnmList:[],
    hasMoreCinema:true,
    dateArr:[],
    selIndex:0,
    pgDateArr:[],
    film:{},
    reqDate:''
  },


  getCinema(){
    //得到影院列表
    let city = app.globalData.userCity,
    movieId = this.data.film,
    lnt = app.globalData.lnt,
    lat = app.globalData.lat,
    date = this.data.reqDate,
    offset = this.data.cnmList.length
    apiMock.selCinema(city.id,movieId,date,offset,lnt,lat,(res)=>{
      let cinemas = res.data.data.cinemas;
      let cnmList = [...this.data.cnmList, ...cinemas];
      this.setData({
        cnmList:cnmList,
        hasMoreCinema:res.data.data.paging.hasMore,
      })
    })
  },

  setDate(){
    //得到往后七天的日期,pgDateArr展示到页面上，dateArr发送请求
    let dateArr = []
    dateArr[0] = new Date();
    let nowDate = new Date(); 
    for(let i =1;i<8;i++){
      dateArr[i]= new Date((nowDate.setDate(nowDate.getDate()+1)));
    }
    let pgDateArr=[]
    pgDateArr[0] ='今天'+ parseInt(dateArr[0].getMonth()+1)+'月'+ dateArr[0].getDate()+'日'
    for(let j=1; j<7;j++){
      if(dateArr[j].getDay() == 6){
        pgDateArr[j] ='周六' +parseInt(dateArr[j].getMonth() + 1) + '月' + dateArr[j].getDate() + '日'
      }
      else if (dateArr[j].getDay() == 0){
        pgDateArr[j] = '周日' + parseInt(dateArr[j].getMonth() + 1) + '月' + dateArr[j].getDate() + '日'
      }
      else if(j==1){
        pgDateArr[j] ='明天'+ parseInt(dateArr[j].getMonth() + 1) + '月' + dateArr[j].getDate() + '日'
      }
      else{
        pgDateArr[j] = dateArr[j].getMonth() + 1 + '月' + dateArr[j].getDate() + '日'
      }
    }
    dateArr = dateArr.map((item)=>{
      return item.getFullYear()+'-'+parseInt(item.getMonth()+1)+'-'+item.getDate()
    })

    this.setData({
      pgDateArr:pgDateArr,
      dateArr:dateArr,
      reqDate:dateArr[0]
    })
  },

  changeDate(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      selIndex:index,
      reqDate:this.data.dateArr[index],
      cnmList:[]
    })
    this.getCinema();
  },

  toBuyTic:function(e){
    let cinema = JSON.stringify(e.detail.cinema);
    let movieId = this.data.film;
    let date = this.data.reqDate;
    wx.navigateTo({
      url: '../selTime/selTime?cinema='+cinema+'&&movieId='+movieId+'&&date='+date,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDate();
    let film = JSON.parse(options.film)
    wx.setNavigationBarTitle({
      title: film.nm
    })
    this.setData({
      film:film.id
    })
    this.getCinema(this.data.dateArr[0]);
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
    if(this.data.hasMoreCinema){
      this.getCinema();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})