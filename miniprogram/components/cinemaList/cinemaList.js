// components/cinemaList/cinemaList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cinemaList:{
      type:Array,
      value:[]
    }
  },

  
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toBuyTic: function (e) {
      let cinema = e.currentTarget.dataset.item;
      this.triggerEvent('toBuyTic', {cinema},{})
    }
  }
})
