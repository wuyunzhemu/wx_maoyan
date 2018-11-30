// components/cnm-tag/cnm-tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value:''
    },
    desc:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    char:''
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

      //匹配输出相应的tag字符
      let cardStr = '开卡',
      plantStr = '特惠',
      merchStr = '促销'

      let str =  this.properties.desc 
      if(str.indexOf(cardStr)!==-1){
        this.setData({
          char:'卡'
        })
      }
      else if(str.lastIndexOf(plantStr)==str.length-plantStr.length){
        this.setData({
          char:'惠'
        })
      }
      else if (str.lastIndexOf(merchStr) == str.length-merchStr.length) {
        this.setData({
          char: '促'
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
