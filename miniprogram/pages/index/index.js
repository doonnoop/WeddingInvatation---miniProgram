//index.js
const app = getApp()
Page({
  data: {
    
  },

  onBindTap: function() {
    wx.switchTab({
      url: '../home/home',
    })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    };
  }
})
