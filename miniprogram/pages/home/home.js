var time = require('../../utils/time.js');   
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePic: '/images/1.jpg',
    activeIndex: 0,
    activeText: `我们想要一场属于自己的婚礼 
        轻松  愉快  温馨  
        有你们&有我们   
        我们的幸福需要您的见证`,
    imgs: [
      {
        url: '/images/1.jpg',
        text: `我们想要一场属于自己的婚礼 
        轻松  愉快  温馨  
        有你们&有我们   
        我们的幸福需要您的见证`,
      },
      {
        url: '/images/2.jpg',
        text: `从兹缔结良缘，定成佳偶
        赤绳早系，白首永偕，
        花好月圆，新燕尔之，将海枯石烂，
        指鸳侣而先盟，谨订此约。`,
      },
      {
        url: '/images/3.jpg',
        text: `新娘  ·  董芃    
        遇见你 真的很幸运
        这一天我穿上婚纱走向他 
        迎来我们人生的新起点`,
      },
      {
        url: '/images/4.jpg',
        text: `新郎  ·  田宏伟   
         往后余生 全都是你 
         与你相伴到老
         爱上彼此灵魂的眷恋`,
      },
      {
        url: '/images/5.jpg',
        text: `<2019/5/25> 星期六
        16:18分举行
        百合华堂婚礼酒店 · 锦绣厅
        解放北路48号津湾广场3号楼`,
      }
    ],
    timerNumber: 0,
  },

  pauseMusic: function (event) {
    app.globalData.musicPlaying = !app.globalData.musicPlaying;
    if (app.globalData.musicPlaying) {
      app.globalData.audio.play();
    } else {
      app.globalData.audio.pause();
    }
  },

  getCurrentCongrat: function () {
    var now = new Date();

    return time.unionSqureTime(now);
  },

  next3: function () {
    // 下一页
    var vm = this;
    if (vm.data.activeIndex3 < vm.data.imgs3.length - 1) {
      vm.animateOut1();
      vm.animateOut2();
      vm.animateOut3();
      setTimeout(function () {
        vm.setData({
          activePic3: vm.data.imgs3[vm.data.activeIndex3 + 1].url,
          activeIndex3: vm.data.activeIndex3 + 1,
          activeText3: vm.data.imgs3[vm.data.activeIndex3 + 1].text,
        });
        vm.animateIn3();
        vm.animateIn2();
        vm.animateIn1()
      }, 500);
    } else {
      vm.animateOut1();
      vm.animateOut2();
      vm.animateOut3();
      setTimeout(function () {
        vm.setData({
          activePic3: vm.data.imgs3[0].url,
          activeIndex3: 0,
          activeText3: vm.data.imgs3[0].text,
        });
        vm.animateIn3();
        vm.animateIn2();
        vm.animateIn1();
      }, 500);
    }
  },
  animateIn1: function () {
    // 图片渐入动画
    var animation = wx.createAnimation({
      duration: 1100,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData1: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData1: animation.export()
      })
    }.bind(this), 900)
  },
  animateOut1: function () {
    // 图片渐出动画
    var animation = wx.createAnimation({
      duration: 900,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData1: animation.export()
    });
  },
  animateIn2: function () {
    // 图片渐入动画
    var animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData2: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData2: animation.export()
      })
    }.bind(this), 500)
  },
  animateOut2: function () {
    // 图片渐出动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData2: animation.export()
    });
  },
  animateIn3: function () {
    // 图片向上动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.translateY(-800).step()
    this.setData({
      animationData3: animation.export()
    })

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData3: animation.export()
      })
    }.bind(this), 300)
  },
  animateOut3: function () {
    // 图片向下动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.translateY(-800).step()
    this.setData({
      animationData3: animation.export()
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      imgs3: this.data.imgs,
      activePic3: this.data.activePic,
      activeIndex3: this.data.activeIndex,
      activeText3: this.data.activeText,
    });
    this.getCurrentCongrat();

    this.timerNumber = setInterval(() => {
      this.setData({
        congratCounts: this.getCurrentCongrat()
      });
    }, 100);
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