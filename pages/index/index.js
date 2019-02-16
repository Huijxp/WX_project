//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//轮播图
    navlist:[]//九宫格
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImages();
    this.getNavImages();
  },
  //根据id判断跳转的是哪一个模块
  handleTap: function (e) {
    //1:获取自定义属性值
    var id = e.target.dataset.id;
    //2:跳转到美食组件
    var page = "/pages/shoplist/shoplist";
    if(id == 1){
      page = "/pages/shoplist/shoplist";
    }
    wx.navigateTo({url: page})
  },
  getImages:function(){
    //获取轮播图信息
    var url = "http://127.0.0.1:3000/getImages";
    wx.request({
      url:url,
      method:"GET",
      success:(res)=>{
        //console.log(res.data);
        this.setData({
          list:res.data
        })
      },
      fail:(res)=>{
        console.log(res);
      }
    })

  },
  getNavImages:function(){
    //获取九宫格信息
    //获取轮播图信息
    var url2 = "http://127.0.0.1:3000/getNavImages";
    wx.request({
      url: url2,
      method: "GET",
      success: (res) => {
        //console.log(res.data);
        this.setData({
          navlist: res.data
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
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
