let getFilmList = exports.getFilmList = function getFilmList(limit,city, cb){
  //获取电影列表
  return wx.request({
    url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    data: {
      offset: 0,
      limit:limit,
      ct:city,
    },
    success:res=>{
      cb(res)
    }
  })
}



let getFilmDetail = exports.getFilmDetail = function getFilmDetail(id,cb){
  //获取电影详情
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmdb/movie/v5/' +id + '.json',//options.id
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    success: res => {
      cb(res);
    },
    fail:{}
  })
}

let getActInfo = exports.getActInfo = function getActInfo(id,cb){
  // 获取电影主要演员信息
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmdb/v7/movie/' + id + '/celebrities.json',//options.id
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    success: res => {
      cb(res)
    },
    fail:{}
  })
}

let getComnts = exports.getComnts = function getComnts(id,cb){
  // 获取电影评论
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmdb/comments/movie/v2/' + id + '.json',//options.id
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    success: res => {
      cb(res)
    },
    fail:{}
  })
}