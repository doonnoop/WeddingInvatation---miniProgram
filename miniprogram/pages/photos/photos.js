Page({
  data: {
    imgList: [
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/12摆台BI3I2930.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/12摆台BI3I3011.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/12摆台BI3I3070.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/12摆台BI3I3098.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/12面BI3I3160.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/16面BI3I3038.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/18面BI3I2901.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/BI3I2879.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/BI3I2884.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/BI3I2886.JPG',
      },
      {
        url: 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/photos/BI3I2888.JPG',
      },
    ],
    leftHeight: 0,
    rightHeight: 0,
    length: 7,
    pageNo: 1,
    descHeight: 30,
    list: []
  },
  onLoad: function () {
    this.randomImg();
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 2000
    });
  },

  randomImg: function() {
    let set = new Set();
    while (set.size < 7) {
      var tmp = Math.round(10 * Math.random())
      set.add(this.data.imgList[tmp]);
    }
    let arr = Array.from(set);
    console.log(arr);
    this.setData({
      list: arr
    })
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