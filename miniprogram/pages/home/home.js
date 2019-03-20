var time = require('../../utils/time.js');   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePic: '/images/xcroll1.jpg',
    activeIndex: 0,
    imgs: [
      {
        url: '/images/xcroll1.jpg'
      },
      {
        url: '/images/xcroll2.jpg'
      },
      {
        url: '/images/xcroll3.jpg'
      },
      {
        url: '/images/index.jpg'
      }
    ],
    timerNumber: 0,
  },

  getCurrentCongrat: function () {
    var now = new Date();

    return time.unionSqureTime(now);
  },

  next3: function () {
    // 下一页
    var vm = this;
    if (vm.data.activeIndex3 < vm.data.imgs3.length - 1) {
      vm.animateOut3();
      setTimeout(function () {
        vm.setData({
          activePic3: vm.data.imgs3[vm.data.activeIndex3 + 1].url,
          activeIndex3: vm.data.activeIndex3 + 1
        });
        vm.animateIn3();
      }, 500);
    } else {
      vm.animateOut3();
      setTimeout(function () {
        vm.setData({
          activePic3: vm.data.imgs3[0].url,
          activeIndex3: 0
        });
        vm.animateIn3();
      }, 500);
    }
  },
  animateIn3: function () {
    // 图片显示动画
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
    // 图片隐藏动画
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