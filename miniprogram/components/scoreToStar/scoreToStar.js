// components/scoreToStar/scoreToStar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score: {
      type: 'number',
      value: 1,
      observer:'showData'
    },
    size:{
      type:'string',
      value:'normal'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    score:1,
    star:[]
  },


  /**
   * 组件的方法列表
   */
  methods: {
    convertStarArray(score) {
      // 1 全星,0 空星,2半星
      let arr = []
      for (let i = 1; i <= 5; i++) {
        if (score >= i) {
          arr.push(1)
        } else if (score > i - 1 && score < i + 1) {
          arr.push(2)
        } else {
          arr.push(0)
        }
      }
      return arr
    },
    showData(){
      let star = this.convertStarArray(this.properties.score)
      this.setData({
        star: star
      })
    }
  },
  
})
