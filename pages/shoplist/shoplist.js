// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //1：保存分页返回数据
    pageIndex:0,//保存分页 页码 1页 2页 3页
    pageSize:7, //保存页大小
    hasMore:true //是否有下一页数据
  },
  loadMore:function(){
    //判断是否有下一页数据
    //如果没有下一页数据，停止函数的执行
    if(this.data.hasMore === false)return;
    //4.loadMore 分页数据
    //console.log("分页.......");
    wx.showLoading({
      title: '加载数据中......',
    })
    //1: 获取两个数值 pno pageSize 页码和页大小
    var pno = this.data.pageIndex + 1;
    var ps = this.data.pageSize;
    //2：发送请求/getShopList
    var url = "http://127.0.0.1:3000/getShopList";
    wx.request({
      url: url,
      method:"GET",
      data:{pno:pno,pageSize:ps},//发送给服务器参数 其实就是在路径里 ?pno =? & pageSize =?
      success:(res)=>{
        //收到数据 9:005 多现实1s
        //在隐藏
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
        var rows = this.data.list.concat(res.data.data);   
        //console.log(res.data);
        //获取总的页数
        var pc = res.data.pageCount;
        //判断一下是否有下一页数据 true false  如果 当前页1<2 就加载下一页 否则就 2=2 那么就不加载下一页
        var flag = pno < pc;
        this.setData({
          // list:res.data.data,
          list:rows,
          pageIndex:pno,
          hasMore:flag  //保存判断结果
        })
      },
      fail:(res)=>{
        console.log(res);
      }
      //控制面板 appData
      //练习：下拉操作->只显示第一页-> 14:50
    })
    //3: 获取返回的当前页的内容
    //4：显示加载动画
    //5: 1500毫秒后隐藏动画
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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
   * 刷新 下拉刷新第一页内容
   */
  onPullDownRefresh: function () {
    console.log("用户下拉操作....刷新第一页的内容");
    //1: 清空原有的页码
    //2：清除原有数据列表
    //3：清除原有判断条件
    this.setData({
      pageIndex:0,
      list:[],
      hasMore:true
    })
    this.loadMore();
  },

  /**
   * 页面上拉触底事件的处理函数
   * 下一页
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})