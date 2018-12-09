// components/selDate/selDate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pgDateArr:{
      type:Array,
      value:[]
    },
    selDateIndex:{
      type:Number,
      value:0,
      observer:'selectDate'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    selIndex:0
  },


  /**
   * 组件的方法列表
   */
  methods: {
    changeDate(e) {
      let index = e.currentTarget.dataset.index;
      this.setData({
        selIndex:index
      })
      this.triggerEvent('changeDate', { index }, {})
    },

    selectDate(){
        this.setData({
          selIndex: this.properties.selDateIndex
        })
    }
  }
})
