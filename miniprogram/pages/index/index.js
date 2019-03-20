const app = getApp();

Page({
  data: {
    lastTime: 0, //此变量用来记录上次摇动的时间
    lastX: 0,
    lastY: 0,
    lastZ: 0, //此组变量分别记录对应 x、y、z 三轴的数值和上次的数值
    shakeSpeed: 110, //设置阈值
    endShake: false
  },

  pauseMusic: function (event) {
    app.globalData.musicPlaying = !app.globalData.musicPlaying;
    if (app.globalData.musicPlaying) {
      app.globalData.audio.play();
    } else {
      app.globalData.audio.pause();
    }
  },

  onBindTap: function() {
    this.setData({
      endShake: true,
    })
    setTimeout(() => {
      wx.switchTab({
        url: '../home/home',
      })
    }, 1250)
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    };
  },

  shake: function (acceleration) {
    var nowTime = new Date().getTime(); //记录当前时间
    //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
    if (nowTime - this.data.lastTime > 100) {
      var x = 0, y = 0, z = 0;
      var diffTime = nowTime - this.data.lastTime; //记录时间段
      this.data.lastTime = nowTime; //记录本次摇动时间，为下次计算摇动时间做准备
      x = acceleration.x; //获取 x 轴数值，x 轴为垂直于北轴，向东为正
      y = acceleration.y; //获取 y 轴数值，y 轴向正北为正
      z = acceleration.z; //获取 z 轴数值，z 轴垂直于地面，向上为正
      //计算 公式的意思是 单位时间内运动的路程，即为我们想要的速度
      var speed = Math.abs(x + y + z - this.data.lastX - this.data.lastY - this.data.lastZ) / diffTime * 10000;
      //console.log(speed)
      if (speed > this.data.shakeSpeed) { //如果计算出来的速度超过了阈值，那么就算作用户成功摇一摇
        wx.stopAccelerometer()
        this.setData({
          endShake: true,
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../home/home',
          })
        }, 1250)
      }
      this.setData({
        lastX : x, //赋值，为下一次计算做准备
        lastY : y, //赋值，为下一次计算做准备
        lastZ : z, //赋值，为下一次计算做准备
      })
    }
  },

  onShow: function() {
    wx.onAccelerometerChange(this.shake)
  }
})
