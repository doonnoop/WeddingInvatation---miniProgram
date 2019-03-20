var imgList = require('data.js');
const app = getApp();
Page({
  data: {
    imgList: [],
    leftHeight: 0,
    rightHeight: 0,
    length: 20,
    pageNo: 1,
    descHeight: 30,
    list: []
  },
  onLoad: function () {
    this.randomImg();
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 3000
    });
  },

  randomImg: function() {
    let set = new Set();
    while (set.size < 20) {
      var tmp = Math.round(157 * Math.random())
      set.add(imgList.imgList[tmp]);
    }
    let arr = Array.from(set);
    console.log(arr);
    this.setData({
      list: arr
    })
  },

  pauseMusic: function (event) {
    app.globalData.musicPlaying = !app.globalData.musicPlaying;
    if (app.globalData.musicPlaying) {
      app.globalData.audio.play();
    } else {
      app.globalData.audio.pause();
    }
  },

  loadImage: function (e) {
    var vm = this;
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var index = e.currentTarget.dataset.index;
    vm.data.list[index].height = windowWidth / 2 / e.detail.width * e.detail.height;
    var count = 0;
    for (var i = (vm.data.pageNo - 1) * vm.data.length; i < vm.data.list.length; i++) {
      if (vm.data.list[i].height) {
        count++;
      }
    }
    if (count == vm.data.length) {
      for (var i = (vm.data.pageNo - 1) * vm.data.length; i < vm.data.list.length; i++) {
        if (vm.data.leftHeight <= vm.data.rightHeight) {
          vm.data.list[i].top = vm.data.leftHeight;
          vm.data.list[i].left = windowWidth * 0.005;
          vm.setData({
            leftHeight: vm.data.leftHeight + vm.data.list[i].height + vm.data.descHeight
          });
        } else {
          vm.data.list[i].top = vm.data.rightHeight;
          vm.data.list[i].left = windowWidth / 2 - windowWidth * 0.005;
          vm.setData({
            rightHeight: vm.data.rightHeight + vm.data.list[i].height + vm.data.descHeight
          });
        }
      }
      console.log(vm.data.list);
      vm.setData({
        list: vm.data.list
      });
    }
  },

  viewImg: function(event) {
    var src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current: src,
      urls: [src],
    });
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 1000
    });
  },

  onPullDownRefresh: function () {
    console.log("refresh");
    this.setData({
      list: [],
      leftHeight: 0,
      rightHeight: 0,
    });
    this.randomImg();
  },

  onReachBottom: function () {
    console.log("bottom");
  },
})