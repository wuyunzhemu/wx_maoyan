// miniprogram/pages/hotFilmInfo/hotFilmInfo.js
const apiMock = require('../../libs/api-mock.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmInfo:{},
    isFold:true,  //电影简介折叠状态
    actors:[],
    showDialog: false,
    actOnShow: {},
    comnts:{
      list:[],
      total:0,
    },
    watch:-1   //电影状态：-1 未看 0 想看 1 已看 
  },

  changeWatch(){
    //修改观影状态
    let watch = this.data.watch;
    if(watch === -1){
      this.setData({
        watch: 0
      })
      wx.showToast({
        title: '已标记想看',
        icon:'success'
      });
    }
    else if(watch ===0){
      this.setData({
        watch: -1
      })
      wx.showToast({
        title: '已取消想看',
        icon: 'success'
      });
    }
    else if (watch === 1) {
      
      wx.showModal({
        title: '是否取消看过？',
        content: '若取消看过，您的评分也将被删除',
        success:res=>{
          if(res.confirm){
            this.setData({
              watch: -1
            });
          }
          if(res.cancel){
            
          }
        }
      })
    }
  },

  changeFold(){
    //修改电影简介折叠状态
    this.setData({
      isFold:!this.data.isFold
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let id = options.id
    apiMock.getFilmDetail(id,res=>{
      //得到影片详情信息
      let that = this;
      let result = res.data.data.movie;
      result.img = result.img.replace('/w.h/movie', '/movie');
      result.photos = that.getRealUrl(result.photos)
      result.sc = result.sc.toFixed(1)
      // let score = that.convertStarArray(result.sc/2)
      this.setData({
        filmInfo: result,
        // score:score
      });
    })

      apiMock.getActInfo(id,actRes=>{
        //得到演员信息
        let actResult = actRes.data.data
        actResult[0].forEach(item=>{
          item.roles = '导演'
        })
        actResult.forEach((actor) => {
          actor = actor.forEach((item) => {
            item.avatar = item.avatar.replace('/w.h/', '/');//得到正确地址
            item.roles != ''; //演职人员列表只展示导演及演员
            return item;
          })
          return actor;
        })
        this.setData({
          actors: actResult
        });
      })
        
   apiMock.getComnts(id,comntRes=>{
    //  得到热评信息
     console.log(comntRes);
     let comnts = [];
     for (let i = 0; i < 3; i++) {
       // comntRes.data.hcmts[i].starArr =that.convertStarArray( comntRes.data.hcmts[i].score)
       comntRes.data.hcmts[i]['date'] = that.strToDate(comntRes.data.hcmts[i].time)
       comnts.push(comntRes.data.hcmts[i])
     }
     that.setData({
       'comnts.list': comnts,
       'comnts.total': comntRes.data.total
     })
   })
  },
  showPhoto(e){
    //点击图片大图预览
    let src = e.currentTarget.dataset.src;
    let imgList = e.currentTarget.dataset.list;
    wx.previewImage({
      current:src,
      urls: imgList,
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

  strToDate(str){
    //从时间字符串得到日期
    str = str.replace(/-/g,'/');
    let dateObj = new Date(str);
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    if(month >0 && month <10){
      month = '0'+month
    }
    if(day>0 && day<10){
      day = '0'+day
    }
    let date = month + '-' +day;
    return date;
  },

  showActDetail(e){
    //展示演员细节信息
    let act = e.currentTarget.dataset.act;
    this.setData({
      showDialog:true,
      actOnShow:act
    })
  },
  setScore(){
    //未实现功能
    wx.showToast({
      title: '此功能暂时不可用',
      icon:'none'
    })
  },
  likeComnt(e){
    let index = e.currentTarget.dataset.index
    let comntLike = 'comnts.list['+index+'].approved';
    let comntLikeNum = 'comnts.list['+index+'].approve';
    if(this.data.comnts.list[index].approved===true)
    {
      this.setData({
        [comntLike]: false,
        [comntLikeNum]: this.data.comnts.list[index].approve - 1,
      })
    }
    else
    {
      this.setData({
        [comntLike]: true,
        [comntLikeNum]: this.data.comnts.list[index].approve + 1,
      })

    }
    
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