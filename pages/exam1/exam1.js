// pages/exam1/exam1.js
Page({

  handleTap1:function(){
    console.log("1：小程序 tap事件");
  },
  handleTap2: function (e) {
    console.log("1：父元素 tap事件2");
    console.log("事件类型"+e.type);
    console.log("当前事件对象");
    console.log(e.currentTarget);
    console.log("触发事件元素");
    console.log(e.target);
    console.log();
  },
  handleTap3: function (e) {
    console.log("禁止事件冒泡！！！");
    console.log(e.target.dataset.id);
  },
  handleTap4: function (e) {
    console.log("年龄和下标");
    console.log(e.target.dataset.age);
    console.log(e.target.dataset.idx);
  },
  /**
   * 页面的初始数据
   */
  data: {

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