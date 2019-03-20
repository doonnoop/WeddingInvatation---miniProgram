App({
  globalData: {
    musicPlaying: true,
    audio: wx.createInnerAudioContext()
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    };

    this.globalData.audio = wx.createInnerAudioContext();
    console.log(this.globalData.audio);
    this.globalData.audio.src = 'cloud://testarea-3ecb6a.7465-testarea-3ecb6a/4091306434.mp3';
    console.log(this.globalData.audio.src);
    this.globalData.audio.play();
  },
})
