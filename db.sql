#创建美食表
xz_shoplist(
  id int, /*编号*/
  img_url varchar(255), /*美食图片*/
  dname varchar(255), /*美食名称*/
  dphone  varchar(30),  /*店铺电话*/
  daddr varchar(255), /*店铺地址*/
  dtime varchar(255), /*店铺营业时间*/
  dpoint  int   /*评分*/
)

create table xz_shoplist(
  id int primary auto_increment,
  img_url varchar(255),
  dname varchar(255),
  dphone  varchar(30),
  daddr varchar(255),
  dtime varchar(255),
  dpoint  int 
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店1','13999999999','万寿路','9:00~21:00',80);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店2','13999999999','万寿路','9:00~21:00',85);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店3','13999999999','万寿路','9:00~21:00',98);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店4','13999999999','万寿路','9:00~21:00',60);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店5','13999999999','万寿路','9:00~21:00',88);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店6','13999999999','万寿路','9:00~21:00',76);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店7','13999999999','万寿路','9:00~21:00',80);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店8','13999999999','万寿路','9:00~21:00',85);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店9','13999999999','万寿路','9:00~21:00',98);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店10','13999999999','万寿路','9:00~21:00',60);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店11','13999999999','万寿路','9:00~21:00',88);
insert into xz_shoplist values(null,'http://127.0.0.1:3000/icons/niu.png','牛排店12','13999999999','万寿路','9:00~21:00',76);


create table xz_message(
  id int primary key auto_increment,
  title varchar(225),
  ctime datetime,
  img_url varchar(225),
  desc2 varchar(255),
  content varchar(2000)
);
insert into xz_message values(null,"年终大促",'2019-01-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-02-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-03-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-04-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-05-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-06-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-07-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-08-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-09-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-10-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-11-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
insert into xz_message values(null,"年终大促",'2019-12-18','http://127.0.0.1:3000/img/banner1.png','走过路过不要错过','年中大促');
