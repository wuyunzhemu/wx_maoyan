// miniprogram/pages/selSeats/selSeats.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:{},
    time:{},
    cinema:{},
    pgDate:'',
    seatsArea:{
      seatsRow: [],
      seatScale: false,
      seatScrollLeft: 0,
      seatScrollTop: 0,
      roomTitleMove: 260,
      xMove: 320,
      yMove:0,
    },
    
    seats:[
      [{ type: 'normal', status: -1 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal'}],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
      [{ type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }, { type: 'normal', status: 0 }],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    //  let time = JSON.parse(options.timeInfo);
    //  let film = JSON.parse(options.filmInfo)
    //  let cinema =JSON.parse(options.cinema);
    //  let pgDate = this.getShowDate(time.dt);
    let seats = this.data.seats;
    seats.map(row=>{
      return row.map(seat=>{
        seat['src'] = this.getSeatImgSrc(seat);
      })
    })
    let seatsRow = this.getSeatsRow(seats);
    this.setData({
      //  film:film,
      //  time:time,
      //  cinema:cinema,
      //  pgDate:pgDate,
      seats:seats,
      'seatsArea.seatsRow':seatsRow
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

  getSeatImgSrc(seat){  //得到状态相应座位的图片路径
    let type='normal';
    let status='empt'
    if(seat.type=='double'){
      type='double'
    }
    if(seat.status==1){
      status='select'
    }
    if(seat.status==-1){
      status='disable'
    }
    let src = `../../images/seat-${type}-${status}.png`;
    return src;
  },

  setSeatView(){ //在放大座位区域后选中中间部分
    this.setData({
      'seatsArea.seatScrollLeft': 320,
      'seatsArea.seatScrollTop': 150,
    })
  },

  selSeat(e){//选座
    console.log(e);
    let rowIndex=e.currentTarget.dataset.rowindex;
    let colindex=e.currentTarget.dataset.colindex
    let seat = e.currentTarget.dataset.seat;
    if(seat.status == -1) 
    {
      wx.showToast({
        title: '座位上有人了~',
        icon:'none'
      })
      return;
    }
    else if(seat.status == 0)
    {
      console.log('选择位置')
      seat.status = 1
    }
    else if(seat.status == 1){
      console.log('取消选择')
      seat.status = 0
    }
    seat.src = this.getSeatImgSrc(seat)
    let selSeat = 'seats['+rowIndex+']['+colindex+']'
    this.setData({
      [selSeat]:seat
    })
  },

  getSeatsRow(arr){
    let seatsRow = [],
       rowIndex = 0; //行数
    for(let i=0;i<arr.length;i++){
      rowIndex++;
      if(arr[i].length ==0){
        rowIndex--;
        seatsRow[i] = 0;
        continue;
      }
      seatsRow[i] = rowIndex;
    }
    return seatsRow;
  },

  moveBar(e){
    console.log(e.detail);
    let x = e.detail.scrollLeft - this.data.seatsArea.xMove ;
    let y = e.detail.seatScrollTop - this.data.seatsArea.yMove;
    this.setData({
      'seatsArea.roomTitleMove': this.data.seatsArea.roomTitleMove - x,
      'seatsArea.xMove':e.detail.scrollLeft,
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
    this.setData({
      seatsScale:  2,
    })

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