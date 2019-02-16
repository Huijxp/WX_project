const express = require("express");
const fs = require("fs");
//移动 将临时文件 移动到upload
//fs.renameSync();
const multer = require("multer");
//创建上传文件对象
var upload = multer({dest:"upload/"});
var app=express();
app.use(express.static("public"));
const pool=require("./pool");
app.listen(3000);

//express mysql 参数 request,response
//跨域访问的配置
//1:加载模块cors
const cors=require("cors");
//2：配置cors
app.use(cors({
  origin:["http://127.0.0.1:3001",
          "http://localhost:3001"],//允许列表
  credentials:true //是否验证
}));
//3.记载第三方模块 express-session
const session = require("express-session");
//4:对模块配置
app.use(session({
  secret:"128位随机字符串", //安全令牌
  resave:false, //请求保存
  saveUninitialized:true, //初始化
  cookie:{ //sessionid保存时
    maxAge:1000*60*60*24//时间1天 cookie
  }
}))



//功能一：首页轮播
app.get('/getImages',(req,res)=>{
  var rows=[
    {id:1,img_url:"http://127.0.0.1:3000/img/1.jpg"},
    {id:2,img_url:"http://127.0.0.1:3000/img/2.png"},
    {id:3,img_url:"http://127.0.0.1:3000/img/3.jpg"},
  ];
  res.send(rows);
})
//功能二:新闻分页显示
app.get("/getNews",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_news";//给count设置一个别名 c
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);//一共几页，从第一页显示
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,title,img_url,point";
    sql +=" FROM xz_news";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})

// //功能三：依据新闻编号，查询新闻详细信息
app.get("/getnewsinfo",(req,res)=>{
  //1:参数   id
  var id =req.query.id;
  //2：sql   select id, title,ctime,content, from xz_news where id = ?
  var sql="select id,title,ctime,content";
      sql+=" from xz_news where id = ?";
  //3:json   {code:1,data:}
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result[0]});
  })

})
//4：功能四：发表评论内容
app.get("/addComment",(req,res)=>{
  //1：参数 nid content
  var nid=req.query.nid;
  var content=req.query.content;
  //2：sql insert into 
  var sql="insert into xz_comment(id,content,ctime,nid)values(null,?,now(),?)";
  //3：json {code:1,msg:""}
  pool.query(sql,[content,nid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows > 0){
      res.send({code:1,msg:'评论发表成功'});
    }else{
      res.send({code:-1,msg:"评论发送失败"});
    }
  })

})
//功能5：“依据新闻的编号 查询出制定新闻编号的评论列表
app.get("/getComments",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = parseInt(req.query.nid);
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_comment";
  sql +=" WHERE nid = ?"
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,[nid],(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,ctime,content";
    sql +=" FROM xz_comment";
    sql +=" WHERE nid = ?";
    sql +=" order by id desc";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
})



//功能六：商品列表
app.get("/getGoodsList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 4;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_product";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,name,img_url,price,bank";
    sql +=" FROM xz_product";
    sql +=" ORDER BY id DESC";//按编号降序排列
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

//功能七：将商品添加到购物车
app.get("/addCart",(req,res)=>{
  //1:参数 uid pid price count
  var uid   = parseInt(req.query.uid);
  var pid   = parseInt(req.query.pid);
  var price = parseFloat(req.query.price);
  var count = parseInt(req.query.count);
  //2:sql  INSERT
  var sql=" INSERT INTO `xz_cart`(`id`, ";
      sql+=" `uid`, `pid`, `price`,";
      sql+=" `count`) VALUES (null,?,?,?,?)";
  pool.query(sql,[uid,pid,price,count],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
  })
  //3:json {code:1,msg:"添加成功"}
});
//功能八：商品的详细信息
app.get("/getProduct",(req,res)=>{
  //1:参数 商品id
  var pid = parseInt(req.query.id);
  //2:sql  SELECT id,name,price,
  var sql =" SELECT `id`, `name`, `img_url`";
      sql+=" , `price`, `bank` FROM `xz_product`"; 
      sql+=" WHERE id=?";
  pool.query(sql,[pid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result[0]})
  });
  //3:json {code:1,data:{}}
});
//功能九：用户注册
app.get("/register",(req,res)=>{
  var name=req.query.name;
  var pwd=req.query.pwd;
  var reg=/^[a-z0-9_]{8,12}$/;
  if(!reg.test(name)){
    res.send({code:-1,msg:"用户名格式不正确"});
    return;
  }
  var sql=" INSERT INTO xz_login VALUES(null";
      sql+=",?,md5(?))";
  pool.query(sql,[name,pwd],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"});
    }else{
      res.send({code:-1,msg:"注册失败"});
    }
  })
})
//功能十：验证用户名是否存在
app.get('/existsName',(req,res)=>{
  var name=req.query.name;
  var sql=" SELECT count(id) as c FROM xz_login WHERE name = ?";
  pool.query(sql,[name],(err,result)=>{
    console.log(result);
    console.log(result[0].c);
    if(err)throw err;
    if(result[0].c > 0){
      res.send({code:-1,msg:"用户名已存在!"});
    }else{
      res.send({code:1,msg:"欢迎使用!"});
    }
  })
})
//十一:用户登录
app.get("/login",(req,res)=>{
   //1:获取登录
   var name=req.query.name;
   var pwd=req.query.pwd;
   //2：正则 
   var regname=/^[a-z0-9_]{3,12}$/;
   var regpwd=/^[a-z0-9]{3,12}$/;
   if(!regname.test(name)){
     res.send({code:-1,msg:"用户名必须在8位以上，支持大小写！"});
     return;
   }
   if(!regpwd.test(pwd)){
     res.send({code:-1,msg:"密码输入不正确！"});
     return;
   }
   //3：创建sql语句
   var sql=" SELECT count(id) as c,id";
       sql+=" FROM xz_login";
       sql+=" WHERE name = ? AND pwd = md5(?)";
   pool.query(sql,[name,pwd],(err,result)=>{
       if(err) throw err;
       var c = result[0].c;
       if(c == 1){
         req.session.uid = result[0].id;
         res.send({code:1,msg:"登陆成功!"});
       }else{
         res.send({code:-1,msg:"用户名和密码有误！"});
       }
   })
   //4：如果参数匹配成功，将用户id保存到session对象
   //5：返回结果{code:1,msg:"登陆成功"}{code:-1,msg:"用户名或密码错误"}
});
//功能十二:查询购物车中数据
app.get("/getCartList",(req,res)=>{
  //1:参数
  var uid = req.session.uid;
  console.log("|"+uid+"|");
  //2:sql
  var sql =" SELECT p.name,c.count,c.price";
      sql +=" ,c.id";
      sql +=" FROM xz_product p,xz_cart c";
      sql +=" WHERE p.id = c.pid";
      sql +=" AND c.uid = ?";
  console.log(sql);    
  pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result});
  }) 
})
//功能十三：同步更新购物车商品的数量
app.get("/updateCart",(req,res)=>{
  //1:参数 id count
  var id=req.query.id;
  var count=req.query.count;
  //2:sql Update
  var sql=" UPDATE xz_cart SET count = ?";
      sql+=" WHERE id = ?";
  //3:json {code:1,msg:""}
  pool.query(sql,[count,id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows > 0){
      res.send({code:1,msg:"更新成功"});
    }else{
      res.send({code:-1,msg:"更新失败"});
    }
  })
})
//功能十四：计算累积和
app.get("/addSum",(req,res)=>{
  var id=req.query.id;
  var price=req.query.price;
  var count=req.query.count;
  var sql="SELECT "
})

app.get("/Logout",(req,res)=>{
  req.session.uid=null;
  res.send({code:1,msg:"退出成功"})
})
//功能十五：小程序九宫格
app.get("/getNavImages",(req,res)=>{
  var list = [
    { id: 1, img_url: "http://127.0.0.1:3000/icons/grid-01.png",title:"美食"},
    { id: 2, img_url: "http://127.0.0.1:3000/icons/grid-02(1).png", title: "洗浴" },
    { id: 3, img_url: "http://127.0.0.1:3000/icons/grid-03.png", title: "结婚啦" },
    { id: 4, img_url: "http://127.0.0.1:3000/icons/grid-04.png", title: "卡拉OK" },
    { id: 5, img_url: "http://127.0.0.1:3000/icons/grid-05.png", title: "公司" },
    { id: 6, img_url: "http://127.0.0.1:3000/icons/grid-06.png", title: "学校" },
    { id: 7, img_url: "http://127.0.0.1:3000/icons/grid-07.png", title: "洗车" },
    { id: 8, img_url: "http://127.0.0.1:3000/icons/grid-08.png", title: "租房" },
    { id: 9, img_url: "http://127.0.0.1:3000/icons/grid-09.png", title: "更多" },
  ];
  res.send(list);
})

//功能十六 ：小程序美食分页显示
app.get("/getShopList",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_shoplist";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,img_url,dname,daddr,dphone,dtime,dpoint";
    sql +=" FROM xz_shoplist";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

//功能十七：添加商品

app.get("/saveP",(req,res)=>{
  //1:获取参数 pname price
  var pname = req.query.pname;
  var price = req.query.price;
  //2:创建sql语句添加
  var sql = "INSERT INTO xz_product VALUES";
  sql +="(null,?,";
  sql+="'http://127.0.0.1:3000/img/banner1.png";
  sql+="',?,1)";
  pool.query(sql,[pname,price],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"商品添加成功"});
    }else{
      res.send({code:-1,msg:"商品添加失败"});
    }
  });
  //3:判断添加是否成功并且返回值  
});
//功能十九:分页显示小程序消息列表
app.get("/getMessage",(req,res)=>{
  //1:参数       pno 页码;pageSize 页大小
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //1.2:默认值
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 2;
  }
  //2:验证正则表达式
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pno)){
     res.send({code:-1,msg:"页码格式不正确"});
     return;
  }
  if(!reg.test(pageSize)){
    res.send({code:-2,msg:"页大小格式不正确"});
    return;
  }
  //3:创建sql
  //  查询总页数
  var sql = "SELECT count(id) as c FROM xz_message";
  var progress = 0; //sql执行进度
  obj = {code:1};
  pool.query(sql,(err,result)=>{
       if(err)throw err;
       //console.log(result[0].c);
       var pageCount = Math.ceil(result[0].c/pageSize);
       obj.pageCount = pageCount;
       progress += 50;
       if(progress == 100){
        res.send(obj);
       }
  });
  //  查询当前页内容
var sql=" SELECT id,img_url,title,ctime,desc2,content";
    sql +=" FROM xz_message";
    sql +=" LIMIT ?,?"
var offset = parseInt((pno-1)*pageSize);
pageSize = parseInt(pageSize);
  pool.query(sql,[offset,pageSize],(err,result)=>{
    if(err)throw err;
    //console.log(result);
    obj.data = result;
    progress+=50;
    if(progress==100){
      res.send(obj);
    }
  }); 
});

//功能二十：小程序学子商城上传图片
app.post("/upload",upload.single('mypic'),(req,res)=>{
  // 1:获取上传文件的大小超过2m提示错误
  var size = req.file.size / 1024 /1024;
  if(size > 2){
    res.send({code:-1,msg:"上传图片过大，不能超过2MB"});
    return;
  }
  // 2：获取上传文件类型不是图片提示错误
  var type = req.file.mimetype;
  var i2 = type.indexOf("image");
  if(i2 == -1){
    res.send({code:-2,msg:"上传只能是图片！"});
    return;
  }
  // 3：创建新文件 ./upload/时间戳+随机数+后缀
  var src = req.file.originalname;
  var time = new Date().getTime;
  var r = Math.floor(Math.random()*9999);
  var i3 = src.lastIndexOf(".");
  var suff = src.substring(i3,src.length);
  var des = "./upload/"+time+r+suff;
  // 4：降临时文件移动到upload目录下
  fs.renameSync(req.file.path,des);
  // 5：上传成功
  res.send({code:1,msg:"上传成功！"});
})