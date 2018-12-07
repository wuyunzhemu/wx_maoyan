
let getFilmList = exports.getFilmList = function getFilmList(offset,city, cb){
  //获取电影列表
  return wx.request({
    url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    data: {
      offset: offset,
      limit:12,
      ct:city,
    },
    success:res=>{
      console.log(res);
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

let getCinema = exports.getCinema = function getCinema(ctid,offset,lnt,lat,cb){
  //获取附近电影院
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmcs/cinema/v1/select/cinemas.json',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    data: {
      cityId:ctid,
      limit: 12,
      offset:offset,
      channelId:40000,
      lng:lnt,
      lat:lat,
    },
    success: res => {
      console.log(res)
      cb(res)
    },
    fail: {}
  })
}

let getCity = exports.getCity = function getCity(cb) {
  //获取定位城市
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/dianying/cities.json',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    success: res => {
      cb(res);
    }
  })
}

let selCinema = exports.selCinema = function selCinema(ctid,movieId,showDate, offset, lnt, lat, cb) {
  //选择有某电影的电影院
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmcs/cinema/v1/select/cinemas.json',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    data: {
      cityId: ctid,
      movieid: movieId,
      showDate: showDate,
      limit: 12,
      offset: offset,
      channelId: 40000,
      lng: lnt,
      lat: lat,
    },
    success: res => {
      console.log(res)
      cb(res)
    },
    fail: {}
  })
}

let getFilmTict= exports.getFilmTict = function getFilmTict(cinemaId,cb){
  //得到某电影院内购票详细信息
  return wx.request({
    url: 'https://wx.maoyan.com/hostproxy/mmcs/show/v2/cinema/shows.json?&ci=1&uuid=1A6E888B4A4B29B16FBA1299108DBE9CB5DDAD04E576252F3EF59E17E75DF01E&channelId=40000',
    method: 'GET',
    header: { str: 'content-type:application/json;charset=UTF-8' },
    data: {
      cinemaId: cinemaId
    },
    success: res=>{
      cb(res)
    },
    fail:{}
  })
}