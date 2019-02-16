// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false //判断条件 背景音乐是否播放
  },
  /**
   * 播放方法
   */
  onMusicTap:function(){
    // 2.如果当前判断条件为false 音乐暂停
    // 3.播放背景音乐
    if(this.data.isPlaying){
      wx.pauseBackgroundAudio();
      this.setData({isPlaying:false})
    }else{
      wx.playBackgroundAudio({
        dataUrl: 'http://127.0.0.1:3000/bg.mp3',
      });
      this.setData({isPlaying:true})
    }
    // 4.如果当前判断条件为true 音乐播放
    // 5.暂停背景音乐
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