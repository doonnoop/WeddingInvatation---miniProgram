var time = require('../../utils/time.js');   

// pages/testme/testme.js
Page({

  /**
   * Page initial data
   */
  data: {
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  timerNumber: 0,
  lastTime: 0, //此变量用来记录上次摇动的时间
  lastX: 0,
  lastY: 0,
  lastZ: 0, //此组变量分别记录对应 x、y、z 三轴的数值和上次的数值
  shakeSpeed: 110, //设置阈值

  shake: function (acceleration) {
    var nowTime = new Date().getTime(); //记录当前时间
    //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
    if (nowTime - this.lastTime > 100) {
      var x = 0, y = 0, z = 0;
      var diffTime = nowTime - this.lastTime; //记录时间段
      this.lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
      x = acceleration.x; //获取 x 轴数值，x 轴为垂直于北轴，向东为正
      y = acceleration.y; //获取 y 轴数值，y 轴向正北为正
      z = acceleration.z; //获取 z 轴数值，z 轴垂直于地面，向上为正
      //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
      var speed = Math.abs(x + y + z - this.lastX - this.lastY - this.lastZ) / diffTime * 10000;
      //console.log(speed)
      if (speed > this.shakeSpeed) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
        wx.stopAccelerometer()
        wx.showLoading({
          title: '寻找大神中...'
        })
      }
      this.lastX = x; //赋值，为下一次计算做准备
      this.lastY = y; //赋值，为下一次计算做准备
      this.lastZ = z; //赋值，为下一次计算做准备
    }
  },

  getCurrentCongrat: function () {
    var now = new Date();

    return time.unionSqureTime(now);
  },

  onShow: function () {
    wx.onAccelerometerChange(this.shake)
    this.getCurrentCongrat()
    //wx.startAccelerometer()
    //var audioCtx = wx.createAudioContext('myAudio')

    this.timerNumber = setInterval( () => {
      this.setData({
        congratCounts: this.getCurrentCongrat()
      });
    }, 100)
  },
  onHide: function () {
    //this.isShow = false;
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})