/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.22 : Database - ltbike
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ltbike` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ltbike`;

/*Table structure for table `t_accessories` */

DROP TABLE IF EXISTS `t_accessories`;

CREATE TABLE `t_accessories` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_peijianid` int(11) NOT NULL,
  `sk_id` int(11) DEFAULT NULL,
  `pc_id` int(11) DEFAULT NULL,
  `a_name` char(20) DEFAULT NULL,
  `a_price` float DEFAULT NULL,
  `a_introduce` varchar(500) DEFAULT NULL,
  `a_weight` char(20) DEFAULT NULL,
  `a_ispost` int(11) DEFAULT NULL,
  `a_state` int(11) DEFAULT NULL,
  `a_date` date DEFAULT NULL,
  `a_color` char(20) DEFAULT NULL,
  PRIMARY KEY (`a_id`),
  UNIQUE KEY `AK_Key_2` (`a_name`,`a_peijianid`),
  KEY `FK_Reference_2` (`sk_id`),
  KEY `FK_Reference_5` (`pc_id`),
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`sk_id`) REFERENCES `t_stock` (`sk_id`),
  CONSTRAINT `FK_Reference_5` FOREIGN KEY (`pc_id`) REFERENCES `t_picture` (`pc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

/*Data for the table `t_accessories` */

insert  into `t_accessories`(`a_id`,`a_peijianid`,`sk_id`,`pc_id`,`a_name`,`a_price`,`a_introduce`,`a_weight`,`a_ispost`,`a_state`,`a_date`,`a_color`) values (1,1,1,1,'城市用光头山地车外胎',399,'基本上就和公路外胎没有什么区别，不过，山地车和公路车之间，因为骑行姿势不一样，所以，很多车友都不愿意去购买只注重速度的公路，而是选择 舒适为主的山地，但是，还是有很多车友喜欢奔跑的感觉，就诞生出了光头的山地外胎，山地外胎最明显的优势就是阻力非常小，能够很快的加速，同时也能够让山地车将速度提升至极限，带来骑行的畅快感受!','10',1,1,'2017-02-23','黑色'),(2,2,2,2,'休闲式山地车外胎',499,'外胎和深齿外胎比较起来，其纹路明显要小很多，其主要是用于城市周边骑行，应付一些环湖小路，又或者是乡间的干燥小路，能够得心应手，属于多用途的休闲式山地外胎。','12',1,1,'2017-02-23','黑色'),(3,3,3,3,'越野用山地车外胎',599,'外胎有着明显的深齿结构，同时齿纹之间间距相对较大，其主要用于山地越野，深齿纹带来了很强的抓地力，一定的避震效果以及挡泥等性质，在越野用轮胎中是具有综合性机能的全能产品。','15',1,1,'2017-02-23','黑色'),(4,4,4,4,'PLUS山地自行车头盔',210,'上市时间: 2016年夏季品牌: GUB型号: K80 PLUS尺码: L是否商场同款: 是适用对象: 通用颜色分类: 钛灰色一副灰色镜片 黑色一副灰色镜片 荧光绿一副灰色镜片 橙色均码一副灰色镜片 红色一副灰色镜片 钛灰色一副灰色镜片+一副透明镜片 黑色一副灰色镜片+一副透明镜片 荧光绿一副灰色镜片+一副透明镜片 橙色均码一副灰色镜片+一副透明镜片 红色一副灰色镜片+一副透明镜片 钛灰色一副灰色镜片+一副黄色镜片 黑色一副灰色镜片+一副黄色镜片 荧光绿一副灰色镜片+一副黄色镜片 橙色均码一副灰色镜片+一副黄色镜片 红色一副灰色镜片+一副黄色镜片货号: K80 PLUS头盔分类: 可拆卸帽檐头盔 一体成型头盔','3',1,1,'2017-02-23','黑黄'),(5,5,5,5,'PLUS山地自行车头盔',210,'上市时间: 2016年夏季品牌: GUB型号: K80 PLUS尺码: L是否商场同款: 是适用对象: 通用颜色分类: 钛灰色一副灰色镜片 黑色一副灰色镜片 荧光绿一副灰色镜片 橙色均码一副灰色镜片 红色一副灰色镜片 钛灰色一副灰色镜片+一副透明镜片 黑色一副灰色镜片+一副透明镜片 荧光绿一副灰色镜片+一副透明镜片 橙色均码一副灰色镜片+一副透明镜片 红色一副灰色镜片+一副透明镜片 钛灰色一副灰色镜片+一副黄色镜片 黑色一副灰色镜片+一副黄色镜片 荧光绿一副灰色镜片+一副黄色镜片 橙色均码一副灰色镜片+一副黄色镜片 红色一副灰色镜片+一副黄色镜片货号: K80 PLUS头盔分类: 可拆卸帽檐头盔 一体成型头盔','3',1,1,'2017-02-23','黑红'),(6,6,6,6,'PLUS山地自行车头盔',210,'上市时间: 2016年夏季品牌: GUB型号: K80 PLUS尺码: L是否商场同款: 是适用对象: 通用颜色分类: 钛灰色一副灰色镜片 黑色一副灰色镜片 荧光绿一副灰色镜片 橙色均码一副灰色镜片 红色一副灰色镜片 钛灰色一副灰色镜片+一副透明镜片 黑色一副灰色镜片+一副透明镜片 荧光绿一副灰色镜片+一副透明镜片 橙色均码一副灰色镜片+一副透明镜片 红色一副灰色镜片+一副透明镜片 钛灰色一副灰色镜片+一副黄色镜片 黑色一副灰色镜片+一副黄色镜片 荧光绿一副灰色镜片+一副黄色镜片 橙色均码一副灰色镜片+一副黄色镜片 红色一副灰色镜片+一副黄色镜片货号: K80 PLUS头盔分类: 可拆卸帽檐头盔 一体成型头盔','3',1,1,'2017-02-23','橙蓝'),(7,7,7,7,'PLUS山地自行车头盔',210,'上市时间: 2016年夏季品牌: GUB型号: K80 PLUS尺码: L是否商场同款: 是适用对象: 通用颜色分类: 钛灰色一副灰色镜片 黑色一副灰色镜片 荧光绿一副灰色镜片 橙色均码一副灰色镜片 红色一副灰色镜片 钛灰色一副灰色镜片+一副透明镜片 黑色一副灰色镜片+一副透明镜片 荧光绿一副灰色镜片+一副透明镜片 橙色均码一副灰色镜片+一副透明镜片 红色一副灰色镜片+一副透明镜片 钛灰色一副灰色镜片+一副黄色镜片 黑色一副灰色镜片+一副黄色镜片 荧光绿一副灰色镜片+一副黄色镜片 橙色均码一副灰色镜片+一副黄色镜片 红色一副灰色镜片+一副黄色镜片货号: K80 PLUS头盔分类: 可拆卸帽檐头盔 一体成型头盔','3',1,1,'2017-02-23','白绿'),(8,8,8,8,'LT骑行头盔',250,'上市时间: 2015年夏季品牌: STUDIO/斯图迪恩型号: MV-50S尺码: 其他适用对象: 通用颜色分类: 升级黑红(M) 升级黑红(L) 升级黑红(L)头盔+L码红色长指手套 升级黑红白(L) 升级黑蓝(M) 升级黑蓝(L) 升级黑蓝(L)头盔+L码蓝色长指手套 升级黑蓝白(M) 升级黑蓝白(L) 升级黑黄(M) 升级黑黄(L) 升级版黑白灰(M） 升级黑白(M) 升级黑白(L) 升级灰白(M) 升级灰白(L) 升级版黑白灰(L) 升级版哑黑(M) 升级版哑黑(L) 升级版亚黑(L)头盔+L码黑色短指手套 升级版亚黑(L)头盔+L码黑色长指手套 升级版黑红(L)+L码短指手套 升级版黑绿白(L)货号: MV-50S','3',1,1,'2017-02-23','橙色'),(9,9,9,9,'LT骑行头盔',250,'上市时间: 2015年夏季品牌: STUDIO/斯图迪恩型号: MV-50S尺码: 其他适用对象: 通用颜色分类: 升级黑红(M) 升级黑红(L) 升级黑红(L)头盔+L码红色长指手套 升级黑红白(L) 升级黑蓝(M) 升级黑蓝(L) 升级黑蓝(L)头盔+L码蓝色长指手套 升级黑蓝白(M) 升级黑蓝白(L) 升级黑黄(M) 升级黑黄(L) 升级版黑白灰(M） 升级黑白(M) 升级黑白(L) 升级灰白(M) 升级灰白(L) 升级版黑白灰(L) 升级版哑黑(M) 升级版哑黑(L) 升级版亚黑(L)头盔+L码黑色短指手套 升级版亚黑(L)头盔+L码黑色长指手套 升级版黑红(L)+L码短指手套 升级版黑绿白(L)货号: MV-50S','3',1,1,'2017-02-23','白色'),(10,10,10,10,'LT骑行头盔',250,'上市时间: 2015年夏季品牌: STUDIO/斯图迪恩型号: MV-50S尺码: 其他适用对象: 通用颜色分类: 升级黑红(M) 升级黑红(L) 升级黑红(L)头盔+L码红色长指手套 升级黑红白(L) 升级黑蓝(M) 升级黑蓝(L) 升级黑蓝(L)头盔+L码蓝色长指手套 升级黑蓝白(M) 升级黑蓝白(L) 升级黑黄(M) 升级黑黄(L) 升级版黑白灰(M） 升级黑白(M) 升级黑白(L) 升级灰白(M) 升级灰白(L) 升级版黑白灰(L) 升级版哑黑(M) 升级版哑黑(L) 升级版亚黑(L)头盔+L码黑色短指手套 升级版亚黑(L)头盔+L码黑色长指手套 升级版黑红(L)+L码短指手套 升级版黑绿白(L)货号: MV-50S','3',1,1,'2017-02-23','黑色'),(11,11,11,11,'LT手套',53,'货号: MLS2205产地: 中国上市时间: 2016年冬季吊牌价: 98性别: 男女通用颜色分类: 黑色 枚红色 湖蓝色 胭脂红 纹理灰 荧光绿 蓝色（非触屏版） 红色（非触屏版） 黑色（非触屏版） 天蓝色（防滑版） 黑色（防滑版） 枚红色（防滑版）尺码: S M L XL户外面料: 其他上市时间: 2016年秋季商品系列: 跑步系列','1',1,1,'2017-02-23','黑色'),(12,12,9,12,'LT手套',53,'货号: MLS2205产地: 中国上市时间: 2016年冬季吊牌价: 98性别: 男女通用颜色分类: 黑色 枚红色 湖蓝色 胭脂红 纹理灰 荧光绿 蓝色（非触屏版） 红色（非触屏版） 黑色（非触屏版） 天蓝色（防滑版） 黑色（防滑版） 枚红色（防滑版）尺码: S M L XL户外面料: 其他上市时间: 2016年秋季商品系列: 跑步系列','1',1,1,'2017-02-23','黑紫'),(17,13,5,13,'LT骑行鞋',533,'上市时间: 2016年夏季品牌: SHIMANO/禧玛诺型号: SH-M088是否商场同款: 是颜色分类: M089限量版 M089白色 M089黑色骑行鞋类型: 专业骑行鞋货号: ESHM088C400W鞋码: 38 39 40 41 42 43 44 45适用对象: 通用','4',1,1,'2017-02-23','黑色'),(18,14,4,14,'LT骑行鞋',533,'上市时间: 2016年夏季品牌: SHIMANO/禧玛诺型号: SH-M088是否商场同款: 是颜色分类: M089限量版 M089白色 M089黑色骑行鞋类型: 专业骑行鞋货号: ESHM088C400W鞋码: 38 39 40 41 42 43 44 45适用对象: 通用','4',1,1,'2017-02-23','蓝色'),(19,15,4,15,'LT骑行鞋',533,'上市时间: 2016年夏季品牌: SHIMANO/禧玛诺型号: SH-M088是否商场同款: 是颜色分类: M089限量版 M089白色 M089黑色骑行鞋类型: 专业骑行鞋货号: ESHM088C400W鞋码: 38 39 40 41 42 43 44 45适用对象: 通用','4',1,1,'2017-02-23','红色'),(20,16,5,16,'LT骑行衣A',862,'上市时间: 2015年春季品牌: Spakct/思帕客型号: 极光休闲长袖骑行服颜色分类: 荧光绿(长袖) 蓝色（长袖） 黄色长袖 橙色长袖 荧光绿二代短袖 蓝色二代短袖 黄色二代短袖 橙色二代短袖货号: S15C07款式: 长袖骑行服适用对象: 男适用季节: 春夏','1',1,1,'2017-02-23','黑色'),(21,17,1,17,'LT骑行衣B',862,'上市时间: 2015年春季品牌: Spakct/思帕客型号: 极光休闲长袖骑行服颜色分类: 荧光绿(长袖) 蓝色（长袖） 黄色长袖 橙色长袖 荧光绿二代短袖 蓝色二代短袖 黄色二代短袖 橙色二代短袖货号: S15C07款式: 长袖骑行服适用对象: 男适用季节: 春夏','1',1,1,'2017-02-23','黑色'),(23,18,5,45,'LT车架A',900,NULL,'10',1,1,'2017-02-24','黄色'),(24,19,5,46,'LT车架B',900,NULL,'10',1,1,'2017-02-24','黑白'),(25,20,7,47,'LT车架C',900,NULL,'10',1,1,'2017-02-24','黑色'),(26,21,5,48,'LT轮组A',900,NULL,'10',1,1,'2017-02-24','黑色'),(27,22,5,49,'LT轮组B',900,NULL,'10',1,1,'2017-02-24','黑色'),(28,23,3,50,'LT轮组C',900,NULL,'10',1,1,'2017-02-24','黑色'),(29,24,5,51,'LT前叉A',900,NULL,'10',1,1,'2017-02-24','白色'),(30,25,4,52,'LT前叉B',900,NULL,'10',1,1,'2017-02-24','黑白'),(31,26,5,53,'LT前叉C',900,NULL,'10',1,1,'2017-02-24','黑色'),(32,27,5,86,'LT山地型花鼓',300,NULL,NULL,NULL,NULL,NULL,NULL),(33,28,5,87,'LT山地型轮胎',400,NULL,NULL,NULL,NULL,NULL,NULL),(34,29,5,88,'LT-200安全帽',200,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `t_activity` */

DROP TABLE IF EXISTS `t_activity`;

CREATE TABLE `t_activity` (
  `act_id` int(11) NOT NULL AUTO_INCREMENT,
  `act_activeid` int(11) NOT NULL,
  `act_name` char(20) NOT NULL,
  `act_starTime` date NOT NULL,
  `act_endTime` date NOT NULL,
  `act_manNumber` int(11) DEFAULT NULL,
  `act_initiator` char(50) NOT NULL,
  `act_tel` char(40) NOT NULL,
  `act_particulars` varchar(500) NOT NULL,
  `act_starapply` date NOT NULL,
  `act_endapply` date NOT NULL,
  `act_state` int(11) DEFAULT NULL,
  `act_date` date DEFAULT NULL,
  PRIMARY KEY (`act_id`),
  UNIQUE KEY `AK_Key_2` (`act_name`,`act_activeid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_activity` */

insert  into `t_activity`(`act_id`,`act_activeid`,`act_name`,`act_starTime`,`act_endTime`,`act_manNumber`,`act_initiator`,`act_tel`,`act_particulars`,`act_starapply`,`act_endapply`,`act_state`,`act_date`) values (1,10000,'紫淑山三日骑行游','2017-04-28','2017-05-01',25,'狼途俱乐部','135024458876','这是一项官方组织的旅游骑行活动,在这三天中我们将会从成都出发前往紫淑山，途经金堂、简阳、绵阳等地，在路途中我们会经过三个由\'我们官方组织的补给点，您可以在那里获得补给活动，另外骑行队伍会分为三个梯队，骑行速度会有所区别，请根据您的能力进行合理的选择','2017-02-15','2017-03-15',1,'2015-05-02'),(2,10001,'山地骑行技术交流大赛','2017-04-28','2017-04-30',100,'狼途俱乐部','135024458876','一场任何人都可以加入的骑行交流大赛,只要您热爱山地骑行就可以加入，主办方设立了6个和山地骑行有关的项目，争取让所有人都能够获得最好最公平的一场竞技体验。','2017-02-23','2017-03-23',1,'2015-05-02'),(3,10002,'绕城公路骑行大赛','2017-05-02','2017-05-02',50,'狼途俱乐部','135024458876','我们之所以举办这场活动意在是大家能够在繁忙的工作结束后，能够享受到真正的骑行乐趣，绕城一圈的骑行大赛不仅是对体力的考验，更是一场对意志的检验，只要你参与到这项活动就肯定会有所收获，我们期待你的参与。','2017-02-28','2017-03-23',1,'2018-05-02');

/*Table structure for table `t_award` */

DROP TABLE IF EXISTS `t_award`;

CREATE TABLE `t_award` (
  `ao_id` int(11) NOT NULL AUTO_INCREMENT,
  `ao_jpid` int(11) NOT NULL,
  `t_p_pc_id` int(11) DEFAULT NULL,
  `ao_name` char(20) DEFAULT NULL,
  `ao_state` int(11) DEFAULT NULL,
  `ao_number` int(11) DEFAULT NULL,
  `ao_date` date DEFAULT NULL,
  PRIMARY KEY (`ao_id`),
  UNIQUE KEY `AK_Key_2` (`ao_name`,`ao_jpid`),
  KEY `FK_Reference_22` (`t_p_pc_id`),
  CONSTRAINT `FK_Reference_22` FOREIGN KEY (`t_p_pc_id`) REFERENCES `t_picture` (`pc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_award` */

/*Table structure for table `t_bicycle` */

DROP TABLE IF EXISTS `t_bicycle`;

CREATE TABLE `t_bicycle` (
  `b_id` int(11) NOT NULL AUTO_INCREMENT,
  `b_bikeid` int(11) NOT NULL,
  `sk_id` int(11) DEFAULT NULL,
  `pc_id` int(11) DEFAULT NULL,
  `t_b_bc_id` int(11) DEFAULT NULL,
  `pa_id` int(11) DEFAULT NULL,
  `b_name` varchar(20) DEFAULT NULL,
  `b_price` float DEFAULT NULL,
  `b_introduce` varchar(500) DEFAULT NULL,
  `b_ispost` int(11) DEFAULT NULL,
  `b_date` date DEFAULT NULL,
  PRIMARY KEY (`b_id`),
  UNIQUE KEY `AK_Key_2` (`b_name`,`b_bikeid`),
  KEY `FK_Reference_1` (`sk_id`),
  KEY `FK_Reference_20` (`t_b_bc_id`),
  KEY `FK_Reference_3` (`pa_id`),
  KEY `FK_Reference_4` (`pc_id`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`sk_id`) REFERENCES `t_stock` (`sk_id`),
  CONSTRAINT `FK_Reference_20` FOREIGN KEY (`t_b_bc_id`) REFERENCES `t_byclass` (`bc_id`),
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`pa_id`) REFERENCES `t_parameter` (`pa_id`),
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`pc_id`) REFERENCES `t_picture` (`pc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

/*Data for the table `t_bicycle` */

insert  into `t_bicycle`(`b_id`,`b_bikeid`,`sk_id`,`pc_id`,`t_b_bc_id`,`pa_id`,`b_name`,`b_price`,`b_introduce`,`b_ispost`,`b_date`) values (21,1,3,19,1,1,'小旋风',4000,NULL,1,'2017-02-23'),(22,2,5,20,1,3,'小旋风',4000,NULL,1,'2017-02-23'),(23,3,3,21,2,1,'LT雄鹰',6000,NULL,1,'2017-02-23'),(24,4,6,22,2,2,'LT雄鹰',6000,NULL,1,'2017-02-23'),(25,5,3,23,3,4,'LT摩拜',7000,NULL,1,'2017-02-23'),(26,6,3,24,3,2,'LT摩拜',5000,NULL,1,'2017-02-23'),(27,7,5,25,4,1,'LT熊猫',5500,NULL,1,'2017-02-23'),(28,8,3,26,5,3,'LT雅迪',5500,NULL,1,'2017-02-23'),(29,9,7,27,5,2,'LT琅琊',3600,NULL,1,'2017-02-23'),(30,10,3,28,5,1,'LT琅琊',5200,NULL,1,'2017-02-23'),(31,11,7,29,2,3,'LT小熊猫',5600,NULL,1,'2017-02-23'),(32,12,3,30,2,2,'LT小熊猫',2400,NULL,1,'2017-02-23'),(33,13,4,31,2,4,'LT小熊猫',4300,NULL,1,'2017-02-23'),(34,14,4,32,1,3,'LT金典',4000,NULL,1,'2017-02-23'),(35,15,8,33,2,2,'LT极速',2500,NULL,1,'2017-02-23'),(36,16,5,34,3,4,'LT-MAX',4000,NULL,1,'2017-02-23'),(37,17,5,35,4,4,'LT-X6',5600,NULL,1,'2017-02-23'),(38,18,5,36,6,2,'LT-X6',4000,NULL,1,'2017-02-23'),(39,19,3,37,6,2,'LT-X6',4300,NULL,1,'2017-02-23'),(40,20,2,38,5,1,'LT-X7',4000,NULL,1,'2017-02-23'),(41,21,7,39,5,2,'LT琅琊',4000,NULL,1,'2017-02-23'),(42,22,7,40,5,1,'LT琅琊',4000,NULL,1,'2017-02-23'),(43,23,4,41,2,2,'LT小熊猫',5000,NULL,1,'2017-02-23'),(44,24,4,42,2,2,'LT小熊猫',5000,NULL,1,'2017-02-23'),(45,25,4,43,1,3,'LT金典',5000,NULL,1,'2017-02-23'),(46,26,4,44,1,3,'LT金典',5000,NULL,1,'2017-02-23'),(47,27,4,63,1,NULL,'LT黑旋风',8000,NULL,1,'2017-02-25'),(48,28,4,64,1,NULL,'LT白旋风',8500,NULL,1,'2017-02-25');

/*Table structure for table `t_byclass` */

DROP TABLE IF EXISTS `t_byclass`;

CREATE TABLE `t_byclass` (
  `bc_id` int(11) NOT NULL AUTO_INCREMENT,
  `bc_name` char(20) DEFAULT NULL,
  PRIMARY KEY (`bc_id`),
  UNIQUE KEY `AK_Key_2` (`bc_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `t_byclass` */

insert  into `t_byclass`(`bc_id`,`bc_name`) values (4,'专业型'),(3,'休闲型'),(2,'公路型'),(1,'越野型'),(6,'速降型'),(5,'飞跃型');

/*Table structure for table `t_indent` */

DROP TABLE IF EXISTS `t_indent`;

CREATE TABLE `t_indent` (
  `in_id` int(11) NOT NULL AUTO_INCREMENT,
  `in_fromid` int(11) NOT NULL,
  `t_b_b_id` int(11) DEFAULT NULL,
  `t_a_a_id` int(11) DEFAULT NULL,
  `u_name` char(50) DEFAULT NULL,
  `in_bynumber` int(11) DEFAULT NULL,
  `in_acnumber` int(11) DEFAULT NULL,
  `in_price` float DEFAULT NULL,
  `in_state` int(11) DEFAULT NULL,
  `in_time` date DEFAULT NULL,
  `in_date` date DEFAULT NULL,
  `in_eva` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`in_id`)
) ENGINE=InnoDB AUTO_INCREMENT=393 DEFAULT CHARSET=utf8;

/*Data for the table `t_indent` */

insert  into `t_indent`(`in_id`,`in_fromid`,`t_b_b_id`,`t_a_a_id`,`u_name`,`in_bynumber`,`in_acnumber`,`in_price`,`in_state`,`in_time`,`in_date`,`in_eva`) values (9,3,NULL,3,'admin',NULL,2,4000,2,'2017-02-25','2017-02-25',NULL),(11,5,NULL,5,'admin',NULL,3,7000,3,'2017-02-25','2017-02-25',NULL),(15,8,8,8,'admin',8,8,8,2,NULL,NULL,NULL),(17,3,8,NULL,'admin',8,NULL,8,3,NULL,NULL,NULL),(18,3,8,NULL,'admin',8,NULL,8,1,NULL,NULL,NULL),(19,3,8,NULL,'admin',8,NULL,8,2,NULL,NULL,NULL),(20,3,8,NULL,'admin',8,NULL,8,3,NULL,NULL,NULL),(21,1,8,NULL,'admin',8,NULL,8,2,NULL,NULL,NULL),(22,3,NULL,5,'aaa',NULL,4,NULL,2,NULL,NULL,'erftr '),(23,4,NULL,5,'aaa',NULL,3,NULL,2,NULL,NULL,NULL),(48,222,40,NULL,'aaa',1,NULL,NULL,3,NULL,NULL,NULL),(208,33,32,NULL,'aaa',3,NULL,NULL,3,NULL,NULL,NULL),(210,1111,NULL,24,'546',0,1,NULL,1,'2017-02-26','2017-02-26',NULL),(211,1111,NULL,27,'546',0,1,NULL,1,'2017-02-26','2017-02-26',NULL),(212,1111,NULL,31,'546',0,1,NULL,1,'2017-02-26','2017-02-26',NULL),(213,1111,NULL,3,'admin',0,1,NULL,2,'2017-02-26','2017-02-26',NULL),(217,1111,NULL,2,'546',0,1,NULL,1,'2017-02-26','2017-02-26',NULL),(219,1111,NULL,27,'546',0,1,NULL,1,'2017-02-26','2017-02-26',NULL),(221,1111,NULL,2,'',0,1,NULL,2,'2017-02-26','2017-02-26',NULL),(222,1111,NULL,23,'',0,1,NULL,2,'2017-02-26','2017-02-26',NULL),(223,1111,NULL,26,'',0,1,NULL,2,'2017-02-26','2017-02-26',NULL),(224,1111,NULL,31,'',0,1,NULL,2,'2017-02-26','2017-02-26',NULL),(253,1,1,NULL,'admin',1,NULL,NULL,NULL,NULL,NULL,NULL),(254,1,8,NULL,'admin',1,NULL,NULL,1,NULL,NULL,NULL),(319,1,43,NULL,'bbb',2,NULL,NULL,2,NULL,NULL,NULL),(320,1,43,NULL,'bbb',1,NULL,NULL,2,NULL,NULL,NULL),(321,1,43,NULL,'bbb',1,NULL,NULL,2,NULL,NULL,NULL),(338,1111,NULL,2,'admin',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(339,1111,NULL,24,'admin',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(340,1111,NULL,26,'admin',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(342,1,NULL,1,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(343,1,NULL,1,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(344,1,NULL,1,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(345,1,NULL,4,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(346,1,NULL,4,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(347,1,43,NULL,'admin',1,NULL,NULL,2,NULL,NULL,NULL),(349,1,NULL,32,'admin',NULL,1,NULL,2,NULL,NULL,NULL),(385,1,NULL,6,'aaa',NULL,2,NULL,2,NULL,NULL,NULL),(386,1,45,NULL,'aaa',1,NULL,NULL,2,NULL,NULL,NULL),(387,1111,NULL,3,'aaa',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(388,1111,NULL,23,'aaa',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(389,1111,NULL,27,'aaa',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(390,1111,NULL,31,'aaa',0,1,NULL,2,'2017-02-28','2017-02-28',NULL),(391,1,41,NULL,'aaa',1,NULL,NULL,2,NULL,NULL,NULL),(392,1,41,NULL,'admin',1,NULL,NULL,1,NULL,NULL,NULL);

/*Table structure for table `t_joinactive` */

DROP TABLE IF EXISTS `t_joinactive`;

CREATE TABLE `t_joinactive` (
  `ja_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(20) DEFAULT NULL,
  `act_id` int(11) DEFAULT NULL,
  `ja_state` int(11) DEFAULT NULL,
  `ja_date` date DEFAULT NULL,
  PRIMARY KEY (`ja_id`),
  KEY `FK_Reference_30` (`act_id`),
  KEY `FK_Reference_31` (`u_id`),
  CONSTRAINT `FK_Reference_30` FOREIGN KEY (`act_id`) REFERENCES `t_activity` (`act_id`),
  CONSTRAINT `FK_Reference_31` FOREIGN KEY (`u_id`) REFERENCES `t_user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `t_joinactive` */

insert  into `t_joinactive`(`ja_id`,`u_id`,`act_id`,`ja_state`,`ja_date`) values (2,2,2,1,'2016-12-20'),(3,2,3,1,'2016-11-20'),(4,13,1,1,'2016-09-20'),(5,1,2,1,'2017-02-25'),(11,1,1,1,'2017-02-25'),(12,1,3,1,'2017-02-25'),(13,1,1,1,'2017-02-25'),(14,1,3,1,'2017-02-25'),(15,1,1,1,'2017-02-25'),(16,5,2,1,'2017-02-25'),(17,5,1,1,'2017-02-25'),(18,5,3,1,'2017-02-25'),(19,4,1,1,'2017-02-27'),(20,4,3,1,'2017-02-27'),(21,21,1,1,'2017-02-27'),(22,22,1,1,'2017-02-27'),(23,22,2,1,'2017-02-27'),(24,22,3,1,'2017-02-27'),(29,4,2,1,'2017-02-28');

/*Table structure for table `t_mybyfriend` */

DROP TABLE IF EXISTS `t_mybyfriend`;

CREATE TABLE `t_mybyfriend` (
  `bf_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `t_u_u_id` int(11) DEFAULT NULL,
  `bf_date` date DEFAULT NULL,
  `bf_state` int(11) DEFAULT NULL,
  PRIMARY KEY (`bf_id`),
  KEY `FK_Reference_27` (`u_id`),
  KEY `FK_Reference_28` (`t_u_u_id`),
  CONSTRAINT `FK_Reference_27` FOREIGN KEY (`u_id`) REFERENCES `t_user` (`u_id`),
  CONSTRAINT `FK_Reference_28` FOREIGN KEY (`t_u_u_id`) REFERENCES `t_user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `t_mybyfriend` */

insert  into `t_mybyfriend`(`bf_id`,`u_id`,`t_u_u_id`,`bf_date`,`bf_state`) values (1,4,2,NULL,1),(2,4,3,NULL,1),(3,4,5,NULL,1),(4,4,6,NULL,1);

/*Table structure for table `t_parameter` */

DROP TABLE IF EXISTS `t_parameter`;

CREATE TABLE `t_parameter` (
  `pa_id` int(11) NOT NULL AUTO_INCREMENT,
  `pa_comid` int(11) NOT NULL,
  `pa_weight` char(20) DEFAULT NULL,
  `pa_bicycleHubs` char(20) DEFAULT NULL,
  `pa_forkClass` char(20) DEFAULT NULL,
  `pa_handlebar` char(20) DEFAULT NULL,
  `pa_Shifts` char(20) DEFAULT NULL,
  `pa_system` char(20) DEFAULT NULL,
  `pa_Frame` char(20) DEFAULT NULL,
  `pa_color` char(20) DEFAULT NULL,
  `pa_date` date DEFAULT NULL,
  PRIMARY KEY (`pa_id`),
  UNIQUE KEY `AK_Key_2` (`pa_comid`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `t_parameter` */

insert  into `t_parameter`(`pa_id`,`pa_comid`,`pa_weight`,`pa_bicycleHubs`,`pa_forkClass`,`pa_handlebar`,`pa_Shifts`,`pa_system`,`pa_Frame`,`pa_color`,`pa_date`) values (1,1,'12KG','LT-100','LT-100','LT-100','9','前后碟刹','碳纤维','黑色','2017-02-23'),(2,2,'12KG','LT-100','LT-100','LT-100','9','前后碟刹','炭纤维','蓝色','2017-02-23'),(3,3,'10kg','LT-101','LT-101','LT-101','9','前后碟刹','钛合金','黑色','2017-02-23'),(4,4,'10KG','LT-101','LT-101','LT-101','9','前后碟刹','钛合金','蓝色','2017-02-23'),(5,5,'12KG','LT-102','LT-102','LT-102','9','前后碟刹','铝合金','黑色','2017-02-23'),(6,6,'12KG','LT-102','LT-102','LT-102','9','前后碟刹','铝合金','灰色','2017-02-23'),(7,7,'8KG','LT-103','LT-103','LT-103','9','前后碟刹','钛合金','灰色','2017-02-23'),(8,8,'8KG','LT-103','LT-103','LT-103','9','前后碟刹','钛合金','蓝色','2017-02-23'),(9,9,'5KG','LT-105','LT-105','LT-105','9','前后碟刹','炭纤维','黑色','2017-02-23'),(10,10,'5KG','LT-105','LT-105','LT-105','9','前后碟刹','炭纤维','蓝色','2017-02-23'),(11,11,'7KG','LT-106','LT-106','LT-106','9','前后碟刹','炭纤维','黑色','2017-02-23'),(12,12,'7KG','LT-106','LT-106','LT-106','9','前后碟刹','炭纤维','蓝色','2017-02-23'),(13,13,'15KG','LT-107','LT-107','LT-107','9','前后碟刹','铝合金','黑色','2017-02-23'),(14,14,'15KG','LT-107','LT-107','LT-107','9','前后碟刹','铝合金','蓝色','2017-02-23'),(15,15,'10KG','LT-108','LT-108','LT-108','9','前后碟刹','炭纤维','黑色','2017-02-23'),(16,16,'10KG','LT-108','LT-108','LT-108','9','前后碟刹','炭纤维','蓝色','2017-02-23'),(17,17,'15KG','LT-109','LT-109','LT-109','9','前后碟刹','铝合金','黑色','2017-02-23'),(18,18,'5KG','LT-110','LT-110','LT-110','9','前后碟刹','炭纤维','黑色','2017-02-23'),(19,19,'15KG','LT-111','LT-111','LT-111','9','前后碟刹','铝合金','蓝色','2017-02-23'),(20,20,'5KG','LT-112','LT-112','LT-112','9','前后碟刹','炭纤维','黑色','2017-02-23');

/*Table structure for table `t_pclass` */

DROP TABLE IF EXISTS `t_pclass`;

CREATE TABLE `t_pclass` (
  `pl_id` int(11) NOT NULL AUTO_INCREMENT,
  `pl_name` char(20) DEFAULT NULL,
  PRIMARY KEY (`pl_id`),
  UNIQUE KEY `AK_Key_2` (`pl_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_pclass` */

/*Table structure for table `t_picture` */

DROP TABLE IF EXISTS `t_picture`;

CREATE TABLE `t_picture` (
  `pc_id` int(11) NOT NULL AUTO_INCREMENT,
  `pc_pcid` int(11) NOT NULL,
  `pl_id` int(11) DEFAULT NULL,
  `pc_name` char(40) NOT NULL,
  `pc_src` varchar(200) NOT NULL,
  `pc_state` int(11) DEFAULT NULL,
  `pc_date` date DEFAULT NULL,
  PRIMARY KEY (`pc_id`),
  UNIQUE KEY `AK_Key_2` (`pc_name`,`pc_pcid`),
  KEY `FK_Reference_19` (`pl_id`),
  CONSTRAINT `FK_Reference_19` FOREIGN KEY (`pl_id`) REFERENCES `t_pclass` (`pl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8;

/*Data for the table `t_picture` */

insert  into `t_picture`(`pc_id`,`pc_pcid`,`pl_id`,`pc_name`,`pc_src`,`pc_state`,`pc_date`) values (1,1,NULL,'splt11.jpg','../../images/store',1,'2017-02-23'),(2,2,NULL,'splt12.jpg','../../images/store',1,'2017-02-23'),(3,3,NULL,'splt13.jpg','../../images/store',1,'2017-02-23'),(4,4,NULL,'spm11.jpg','../../images/store',1,'2017-02-23'),(5,5,NULL,'spm12.jpg','../../images/store',1,'2017-02-23'),(6,6,NULL,'spm13.jpg','../../images/store',1,'2017-02-23'),(7,7,NULL,'spm14.jpg','../../images/store',1,'2017-02-23'),(8,8,NULL,'spm21.jpg','../../images/store',1,'2017-02-23'),(9,9,NULL,'spm22.jpg','../../images/store',1,'2017-02-23'),(10,10,NULL,'spm23.jpg','../../images/store',1,'2017-02-23'),(11,11,NULL,'spst11.jpg','../../images/store',1,'2017-02-23'),(12,12,NULL,'spst12.jpg','../../images/store',1,'2017-02-23'),(13,13,NULL,'spx11.jpg','../../images/store',1,'2017-02-23'),(14,14,NULL,'spx12.jpg','../../images/store',1,'2017-02-23'),(15,15,NULL,'spx13.jpg','../../images/store',1,'2017-02-23'),(16,16,NULL,'spy11.jpg','../../images/store',1,'2017-02-23'),(17,17,NULL,'spy12.jpg','../../images/store',1,'2017-02-23'),(18,18,NULL,'pic5.jpg','../../images/zhangsan/LOHAS.png',1,'2017-02-23'),(19,19,NULL,'120005-1.jpg','../../images/store',1,'2017-02-23'),(20,20,NULL,'120005-2.jpg','../../images/store',1,'2017-02-23'),(21,21,NULL,'130001-1.jpg','../../images/store',1,'2017-02-23'),(22,22,NULL,'130001-2.jpg','../../images/store',1,'2017-02-23'),(23,23,NULL,'130002-1.jpg','../../images/store',1,'2017-02-23'),(24,24,NULL,'130002-2.jpg','../../images/store',1,'2017-02-23'),(25,25,NULL,'130003-1.jpg','../../images/store',1,'2017-02-23'),(26,26,NULL,'130004-2.jpg','../../images/store',1,'2017-02-23'),(27,27,NULL,'130005-1.jpg','../../images/store',1,'2017-02-23'),(28,28,NULL,'130005-2.jpg','../../images/store',1,'2017-02-23'),(29,29,NULL,'bike1.jpg','../../images/store',1,'2017-02-23'),(30,30,NULL,'bike2.jpg','../../images/store',1,'2017-02-23'),(31,31,NULL,'bike3.jpg','../../images/store',1,'2017-02-23'),(32,32,NULL,'svbig.jpg','../../images/store',1,'2017-02-23'),(33,33,NULL,'svbla.jpg','../../images/store',1,'2017-02-23'),(34,34,NULL,'svblack.jpg','../../images/store',1,'2017-02-23'),(35,35,NULL,'svblue.jpg','../../images/store',1,'2017-02-23'),(36,36,NULL,'svbluebig.jpg','../../images/store',1,'2017-02-23'),(37,37,NULL,'svbluesp.jpg','../../images/store',1,'2017-02-23'),(38,38,NULL,'svred.jpg','../../images/store',1,'2017-02-23'),(39,39,NULL,'indexs-black-1.jpg','../../images/store',1,'2017-02-23'),(40,40,NULL,'indexs-blue-1.jpg','../../images/store',1,'2017-02-23'),(41,1,NULL,'indexs-black-2.jpg','../../images/store',1,'2017-02-23'),(42,1,NULL,'indexs-blue-2.jpg','../../images/store',1,'2017-02-23'),(43,1,NULL,'indexs-black-3.jpg','../../images/store',1,'2017-02-23'),(44,50,NULL,'indexs-blue-3.jpg','../../images/store',1,'2017-02-23'),(45,41,NULL,'cj1.jpg','../../images/store',1,'2017-02-24'),(46,42,NULL,'cj2.jpg','../../images/store',1,'2017-02-24'),(47,43,NULL,'cj3.png','../../images/store',1,'2017-02-24'),(48,44,NULL,'lz1.jpg','../../images/store',1,'2017-02-24'),(49,45,NULL,'lz2.jpg','../../images/store',1,'2017-02-24'),(50,46,NULL,'lz3.jpg','../../images/store',1,'2017-02-24'),(51,47,NULL,'qc1.jpg','../../images/store',1,'2017-02-24'),(52,48,NULL,'qc2.jpg','../../images/store',1,'2017-02-24'),(53,49,NULL,'qc3.jpg','../../images/store',1,'2017-02-24'),(54,50,NULL,'admin.jpg','../../images/zhangsan/cuanzangxian.jpg',1,'2017-02-24'),(55,50,NULL,'indexs-black-1.jpg','../../images/store',1,'2017-02-25'),(56,50,NULL,'indexs-blue-1.jpg','../../images/store',1,'2017-02-25'),(57,50,NULL,'indexs-black-2.jpg','../../images/store',1,'2017-02-25'),(58,50,NULL,'indexs-blue-2.jpg','../../images/store',1,'2017-02-25'),(59,51,NULL,'indexs-black-3.jpg','../../images/store',1,'2017-02-25'),(60,52,NULL,'indexs-blue-3.jpg','../../images/store',1,'2017-02-25'),(63,50,NULL,'indexs-first.png','../../images/store',1,'2017-02-25'),(64,50,NULL,'index-second.png','../../images/store',1,'2017-02-25'),(65,50,NULL,'indexs-first','../../images/store',1,'2017-02-25'),(69,1,NULL,'index-second.png','../../images/store',1,'2017-02-25'),(71,0,NULL,'indexs-first.png','../../images/store',1,'2017-02-24'),(72,53,NULL,'test','../../images/store',1,'2017-02-25'),(77,1,NULL,'indexs-first.png','../../images/store',1,'2017-02-25'),(83,1,NULL,'dd.jpg','../../images/zhangsan/333.jpg',1,'2017-02-05'),(84,1,NULL,'mohe','../../images/mohe.jpg',1,'2017-02-05'),(85,1,NULL,'dayunhe','../../images/dayunhe1.jpg',1,'2017-02-05'),(86,86,NULL,'index-peijian1.jpg','../../images/store',1,'2017-02-05'),(87,87,NULL,'index-peijian2.jpg','../../images/store',1,'2017-02-05'),(88,88,NULL,'index-peijian3.jpg','../../images/store',1,'2017-02-05'),(96,90,NULL,'3dbg.jpg','../../images/personal',1,NULL),(97,91,NULL,'333.jpg','../../images/personal',1,NULL),(98,92,NULL,'6666.jpg','../../images/personal',1,NULL),(99,93,NULL,'20121.jpg','../../images/personal',1,NULL),(100,94,NULL,'63432dnqXaxVICY.jpg','../../images/personal',1,NULL),(101,95,NULL,'cat.jpg','../../images/persoanl',1,NULL),(102,96,NULL,'d201.jpg','../../images/persoanl',1,NULL),(103,97,NULL,'pexels-photo-200516.jpeg','../../images/persoanl',1,NULL),(104,98,NULL,'pic1.jpg','../../images/persoanl',1,NULL),(105,99,NULL,'pic2.jpg','../../images/persoanl',1,NULL),(106,100,NULL,'pic3.jpg','../../images/persoanl',1,NULL),(107,101,NULL,'pic5.jpg','../../images/persoanl',1,NULL),(108,102,NULL,'qingchengsh.jpg','../../images/persoanl',1,NULL),(109,103,NULL,'timg (1).jpg','../../images/persoanl',1,NULL),(110,104,NULL,'timg.jpg','../../images/persoanl',1,NULL),(111,105,NULL,'u=32061.jpg','../../images/persoanl',1,NULL);

/*Table structure for table `t_profile` */

DROP TABLE IF EXISTS `t_profile`;

CREATE TABLE `t_profile` (
  `pr_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_id` int(11) DEFAULT NULL,
  `pr_personal` char(10) NOT NULL,
  `pr_address` varchar(50) NOT NULL,
  `pr_date` date DEFAULT NULL,
  `pr_state` int(11) DEFAULT NULL,
  `pr_tel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`pr_id`),
  KEY `FK_Reference_25` (`u_id`),
  CONSTRAINT `FK_Reference_25` FOREIGN KEY (`u_id`) REFERENCES `t_user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

/*Data for the table `t_profile` */

insert  into `t_profile`(`pr_id`,`u_id`,`pr_personal`,`pr_address`,`pr_date`,`pr_state`,`pr_tel`) values (2,2,'景帅','江西省新余市分宜县云华路','2016-12-16',1,'13183810335'),(61,2,'付林鹏','山东省莱芜市莱城区中北大道',NULL,1,'15784515248'),(62,2,'张帆','山西省晋城市龙港镇中北大道',NULL,1,'1588469522'),(68,1,'临安','山东省聊城市阳谷县山东省聊城市阳谷县而',NULL,1,'15847893256'),(69,4,'孔翔','上海市卢湾区北京市朝阳区故宫永和街000001',NULL,1,'15847893256'),(70,4,'王平','西藏林芝地区朗镇云华路999999',NULL,1,'12547894561'),(72,4,'景帅','省市县四川省成都市双流县双流大道南湖小区',NULL,1,'13619081315'),(73,4,'景帅','四川省成都市县双流县双流大道南湖小区',NULL,1,'13619081315');

/*Table structure for table `t_reply` */

DROP TABLE IF EXISTS `t_reply`;

CREATE TABLE `t_reply` (
  `re_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_s_s_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `re_context` varchar(500) NOT NULL,
  `re_time` date DEFAULT NULL,
  `re_state` int(11) DEFAULT NULL,
  `re_date` date DEFAULT NULL,
  PRIMARY KEY (`re_id`),
  KEY `FK_Reference_24` (`u_id`),
  KEY `FK_Reference_8` (`t_s_s_id`),
  CONSTRAINT `FK_Reference_24` FOREIGN KEY (`u_id`) REFERENCES `t_user` (`u_id`),
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`t_s_s_id`) REFERENCES `t_share` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `t_reply` */

insert  into `t_reply`(`re_id`,`t_s_s_id`,`u_id`,`re_context`,`re_time`,`re_state`,`re_date`) values (1,29,1,'怎么说的呢','2017-02-24',NULL,NULL),(2,28,1,'看亲戚来很强的样子！','2017-02-24',NULL,NULL),(3,28,1,'好吧','2017-02-24',NULL,NULL),(4,31,1,'的哈水电费','2017-02-24',NULL,NULL),(5,31,1,'的神色','2017-02-24',NULL,NULL),(6,29,1,'这可是搞笑了，哈哈','2017-02-24',NULL,NULL),(7,36,3,'自己吐槽自己 啊哈哈','2017-02-24',NULL,NULL),(8,28,1,'厉害！！','2017-02-24',NULL,NULL),(9,28,5,'好厉害！','2017-02-25',NULL,NULL),(10,28,5,'今天算是学到了','2017-02-25',NULL,NULL),(11,29,5,'奇葩很多的，何必在意这些','2017-02-25',NULL,NULL),(12,32,5,'每一行每一页都是非常复杂的，坚持就行','2017-02-25',NULL,NULL),(13,33,5,'我也是很久没有骑过车了啊 啊啊啊啊啊啊','2017-02-25',NULL,NULL),(14,34,5,'闲下来玩一次就好','2017-02-25',NULL,NULL),(15,36,5,'不知道啊。。','2017-02-25',NULL,NULL),(16,37,5,'D1：成都-雅安市成都-新津县-邛崃市-名山区-金鸡关隧道-雅安市（K2631）里程：154KM   骑行时间：约8-10小时难度等级：8风景等级：3路况等级：8','2017-02-25',NULL,NULL),(17,37,5,'行程简介：行程长，骑行时间长，早出发，在城市间穿行，路况虽好，但车流量大，注意安全。出成都沿成新蒲快速通道前行，在新津段与G318前往雅安。也可沿成新蒲快速路行至蒲塘路口，右转上蒲塘路，在大塘镇左转上-雅安市：名山区岔路较多，进城于三岔路口处沿新明路前行，+4km爬坡路段到达金鸡关隧道，出金鸡关隧道，5km平缓路段进入雅安市区  13608260024  包餐/晚  13980170770  25-40元/床位 18981609951  30元/床位','2017-02-25',NULL,NULL),(18,37,5,'-多营镇：沿康藏路出雅安市，+7km起伏缓上路段到达多营镇多营镇8km起伏缓上路段到达飞仙关镇飞仙关镇22km起伏上坡路段到达天全县天全县9km起伏上坡路段到达茶马古道墙，-新沟村：出紫石乡，250米，无灯，路面坑洼泥泞），出隧道，骑友推荐住宿：新沟村不大，食宿很多，条件、价格差不多，根据自己喜好挑选。冯家饭庄0835-7388082 15-25元/床位新沟柯大侠饭庄0835-7388188 15-25元/床位-二郎山隧道：出新沟村，+9km盘山路段到达二郎山隧道，部分路段修路中，泥泞难行二郎山隧道4km，有照明设施。出隧道后，高原地貌映入眼帘，S211的岔路，可前往鱼进沟村牛背山观看云海，游览海螺沟泡温泉、贡嘎雪山、冰川、磨西古镇甘谷地村-泸定县：出甘谷地村，14km下坡路段到达泸定县。参观泸定桥骑友推荐住宿：泸定登巴客栈  13548405930 25-35元/晚床位泸定青松客栈  13568681619 25-35元/晚/床位红色泸定静苑驿站  13568297555 25-35元/晚/床位','2017-02-25',NULL,NULL),(19,37,5,'D4：泸定县-康定市泸定县-烹坝乡（K2810）-冷竹关村（K2815）-瓦斯沟（K2819）-小天都隧道（K2835）-康定市（K2843）里程：50KM  骑行时间：约6-8小时难度等级：6风景等级：6路况等级：6','2017-02-25',NULL,NULL),(20,37,5,'行程简介：行程不长，但以起伏+长上坡路段为主，有一定的难度，午餐自备干粮。途经小天都隧道，灯光昏暗，提前准备灯具，注意安全。到康定后，可乘车前往跑马山或木格错游览。','2017-02-25',NULL,NULL),(21,37,5,'骑友推荐住宿：康定登巴客栈  0836-2828577 25-40元/晚/床位康定哈达客栈  13568683088；0836-2831999  20-40 元/晚/床位藏羚人青年旅社  0836-2838377；0836-6669666  30-45元/晚-折多塘村：出康定市，5km起伏爬坡路段到达折多塘村（折多塘村有免费的简陋露天温泉，泡泡温泉，欣赏雪山）折多塘村11km爬坡路段到达二台子中桥，继续-新都桥瓦泽乡：出折多山垭口，,夏秋季节风景最美。骑友推荐住宿：折多塘村住宿：征途客栈  18015788121  45元/晚(包早晚餐)驴友之家  13551691500  50元/晚(包早晚餐)新都桥住宿：雅克国际青年旅舍  0836-2866645  25-50元/晚登巴客栈  13990470010  25-50元/晚康巴情藏家休闲山庄  15351492980  25-50元/晚木雅背包客栈 13158408689；0836-2866565  25元/晚星相映志行社  18008033644  25-50 元/晚','2017-02-25',NULL,NULL),(22,49,4,'在自行车上怎么笑要去吃灰哇','2017-02-27',NULL,NULL),(23,31,4,'你参加了啥。最后一名哇','2017-02-27',NULL,NULL),(24,40,4,'没去过的表示没体会，好久还是要去耍哈，骑上我心爱的BIKE，要约的一起，有妹子就好了','2017-02-27',NULL,NULL),(25,42,4,'da ','2017-02-27',NULL,NULL),(26,49,22,'非常好','2017-02-27',NULL,NULL),(27,47,23,'','2017-02-27',NULL,NULL),(28,28,4,'简单的回复','2017-02-28',NULL,NULL),(29,50,4,'drghdrfgdfb','2017-02-28',NULL,NULL);

/*Table structure for table `t_share` */

DROP TABLE IF EXISTS `t_share`;

CREATE TABLE `t_share` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_tzid` int(11) NOT NULL,
  `sc_id` int(11) DEFAULT NULL,
  `u_id` int(11) DEFAULT NULL,
  `s_name` char(50) NOT NULL,
  `s_context` varchar(2000) DEFAULT NULL,
  `s_star` int(11) DEFAULT NULL,
  `s_endstar` int(11) DEFAULT NULL,
  `s_state` int(11) DEFAULT NULL,
  `s_time` date DEFAULT NULL,
  `s_date` date DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  UNIQUE KEY `AK_Key_2` (`s_tzid`),
  KEY `FK_Reference_21` (`sc_id`),
  KEY `FK_Reference_26` (`u_id`),
  CONSTRAINT `FK_Reference_21` FOREIGN KEY (`sc_id`) REFERENCES `t_shclass` (`sc_id`),
  CONSTRAINT `FK_Reference_26` FOREIGN KEY (`u_id`) REFERENCES `t_user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

/*Data for the table `t_share` */

insert  into `t_share`(`s_id`,`s_tzid`,`sc_id`,`u_id`,`s_name`,`s_context`,`s_star`,`s_endstar`,`s_state`,`s_time`,`s_date`) values (28,214415826,1,1,'自行车越野大揭秘','一、山地车越野-路面倾斜的小径 路面倾斜（off-chamber）的路段，陡峭的斜向悬崖边，假如使用煞车或做大动作的移动控制，可能造成轮胎失去抓地力和滑出路面边缘；如果知道下列的技巧，绝大部分是可以安全过关。 1. 对付路面倾斜向下的小径就如同要转弯一样，利用侧倾身体来取代倾斜单车，路面倾斜度越大就像弯度越大，使力的情况是一样的，然后你知道你的轮胎就会像胶一样的黏，不会侧滑出去。 2. 避免在路面倾斜向下的小径上加速，在到达之前，保持一定的速度，滑行过这段路面；如果还要加点力才能通过的话，就请轻轻的、平顺的施力。 3. 把身体全部的重量加在斜面下方的踏板，你会发现这个技巧对于轮贴紧抓住路面的效果非常的好 - 即使在类似的地势上也很好用，你要做的只是站在踏板上滑行，直到通过为止。 4.选择中间的路线，避免挤向斜面的上方处。二、山地车越野-向上跳跃（step-up） 对任何比前轮轴心还高的岩石或木头，可以不需下马而战胜它；这里要告诉你如何做到。 1. 带着些速度–大约是轻松骑时最快的速度，动能是你的朋友，因为一般人无法靠踩踏直接上到大的落差。 2. 当靠近这个落差时，身体向后倾斜，拉着车把和举起前轮，上到这个阶梯的顶部。 3. 一旦前轮上到落差的顶部，马上将身体往前倾斜，然后移动身体的重量到车把的上方。 4. 不需任何的力量支撑，前进的动能会让后轮滚动向着阶梯顶部；不论如何，你可能需要施些力在车把上，以前轮为轴举起后轮跨越最后些许的落差。 5. 不要往后看向前踩去，好象你一点也不在乎，你的伙伴正在阶梯之前下马，惊呀的挤在一起。',NULL,NULL,1,'2017-02-23',NULL),(29,214536960,2,1,'今天骑车遇到个奇葩','真是服了！',NULL,NULL,1,'2017-02-23',NULL),(31,214544500,3,1,'第一届绕城公路骑行大赛总结与分享','       有幸参加到第一届绕城骑行大赛，主办方的专业精神让我深感佩服，下面我就来分享一下在这其中的所见所闻。',NULL,NULL,1,'2017-02-23',NULL),(32,214350209,2,1,'没想到专业的骑行这么复杂','各位高手练了多久才有现在这样的技术啊。',NULL,NULL,1,'2017-02-24',NULL),(33,214323765,2,1,'已经有三个月没有碰过自行车了，烦躁啊','。。。来吐槽一下呗',NULL,NULL,1,'2017-02-24',NULL),(34,21437666,2,1,'好烦，没有时间玩骑行了','疯狂加班中g',NULL,NULL,1,'2017-02-24',NULL),(35,214421945,3,1,'山地骑行技术交流大赛回忆','内容手打中',NULL,NULL,1,'2017-02-24',NULL),(36,214557954,2,3,'现在的生活真是越来越忙了啊','骑行这项动作我们这些\'\'老年人”还能不能参加 啊！！',NULL,NULL,1,'2017-02-24',NULL),(37,215056201,1,5,'2016骑行318-川藏线最新、最精准的攻略','2016最新骑行318国道-川藏南线攻略。攻略详细的列出沿途各点之间海拔趋势、路况、景点、住宿和注意事项等信息。对每天行程的难度、风景、路况进行评级，等级由1-10，评级越高，难度越大、风景越美、路况越好。每日住宿信息为骑友推荐的住宿点，旅行旺季，部分地方住宿较为紧张，最好提前预定。现在川南线开发越来越成熟，食宿越来越多，条件也越来越好。行程中并未安排休整日程，具体在哪儿休息可根据自己体力及喜好安排。全程可安排3-4天修正，最好选择补给方便或者周边有著名景区的城镇，美食犒劳下自己，恢复体力；欣赏美景，奖赏这一路的艰辛。成都至拉萨全程沿国道318前行，全程约2100KM，海拔起伏大，翻越十几座高山，频繁的高度落差，创造出形态各异的自然美景，时而秀美，时而壮阔，被称为中国最美的景观大道。看了下图的全程海拔趋势图，是不是有种要上天的感觉。',NULL,NULL,1,'2017-02-25',NULL),(38,215128212,2,5,'4月中，海南东线，求同行','初学者，计划6-7天左右的时间。欢迎同行并一起计划，有意者请联系哈',NULL,NULL,1,'2017-02-25',NULL),(40,215145442,3,5,'要去多少次西藏 才能看完这些最美的湖！','当穹措位于中国西藏自治区那曲地区尼玛县南部，当惹雍错北部。当穹措像一块自天际间坠落的翡翠，静静的镶嵌在群山之中，湖的东岸是连绵不断、屏风般矗立的褚红色山壁，被湖水冲刷而成的阶梯从湖畔山顶一圈又一圈地一直环绕到湖滨。',NULL,NULL,1,'2017-02-25',NULL),(42,215126733,2,5,'如果一辈子只能选一辆公路车','你的选择（配置）是？装每一辆车之前都觉得是最后一辆了。目前的选择是sw tarmac+9100（更换sw牙盘+quarq功率曲柄）+enve ses 4.5。目前市面上没有什么想换的零件了，静待 tarmac sl6 发布。',NULL,NULL,1,'2017-02-25',NULL),(43,215146413,2,5,'新人报到！','新人报到，试发一贴！',NULL,NULL,1,'2017-02-25',NULL),(44,21515126,2,5,'我又来灌水来了。','我的神钻和兔兔',NULL,NULL,1,'2017-02-25',NULL),(45,2151127,2,5,'这就尴尬了………………','好几天了。难到大规模刷屏的广告才算吗',NULL,NULL,1,'2017-02-25',NULL),(46,215139287,2,5,'这小分给我考得。','今天能查分了。我一查。心格愣一下子。感觉好低。然后有个同学告诉我。  你不用跑过熊。只需要跑过同学就行。会考就能过。哎 我突然间底气十足……',NULL,NULL,1,'2017-02-25',NULL),(47,21515441,2,5,'大家懂车的给推荐款公路啊，预算一万','大家懂车的给推荐款公路啊，预算一万',NULL,NULL,1,'2017-02-25',NULL),(48,2143787,2,1,'玩一玩而太阳','w45yewrtyweer送人头有人',NULL,NULL,1,'2017-02-27',NULL),(49,21489736,2,4,'让我们在自相车上放声大笑','',NULL,NULL,1,'2017-02-27',NULL),(50,214849154,1,4,'一个新的帖子','啊啊啊啊',NULL,NULL,1,'2017-02-28',NULL);

/*Table structure for table `t_sharepic` */

DROP TABLE IF EXISTS `t_sharepic`;

CREATE TABLE `t_sharepic` (
  `sp_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_s_s_id` int(11) DEFAULT NULL,
  `pc_id` int(11) DEFAULT NULL,
  `re_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sp_id`),
  KEY `FK_Reference_11` (`t_s_s_id`),
  KEY `FK_Reference_12` (`pc_id`),
  KEY `FK_Reference_13` (`re_id`),
  CONSTRAINT `FK_Reference_11` FOREIGN KEY (`t_s_s_id`) REFERENCES `t_share` (`s_id`),
  CONSTRAINT `FK_Reference_12` FOREIGN KEY (`pc_id`) REFERENCES `t_picture` (`pc_id`),
  CONSTRAINT `FK_Reference_13` FOREIGN KEY (`re_id`) REFERENCES `t_reply` (`re_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_sharepic` */

/*Table structure for table `t_shclass` */

DROP TABLE IF EXISTS `t_shclass`;

CREATE TABLE `t_shclass` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT,
  `sc_name` char(20) DEFAULT NULL,
  PRIMARY KEY (`sc_id`),
  UNIQUE KEY `AK_Key_2` (`sc_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `t_shclass` */

insert  into `t_shclass`(`sc_id`,`sc_name`) values (2,'我要吐槽'),(1,'技术交流'),(3,'美丽回忆');

/*Table structure for table `t_stock` */

DROP TABLE IF EXISTS `t_stock`;

CREATE TABLE `t_stock` (
  `sk_id` int(11) NOT NULL AUTO_INCREMENT,
  `sk_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`sk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `t_stock` */

insert  into `t_stock`(`sk_id`,`sk_number`) values (1,12),(2,11),(3,7),(4,5),(5,6),(6,8),(7,5),(8,12),(9,21),(10,4),(11,11);

/*Table structure for table `t_user` */

DROP TABLE IF EXISTS `t_user`;

CREATE TABLE `t_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_uid` char(6) DEFAULT NULL,
  `t_p_pc_id` int(11) DEFAULT NULL,
  `act_id` int(11) DEFAULT NULL,
  `u_name` char(50) NOT NULL,
  `u_sex` int(11) DEFAULT NULL,
  `u_password` char(50) DEFAULT NULL,
  `u_tel` char(11) DEFAULT NULL,
  `u_email` varchar(50) DEFAULT NULL,
  `u_state` int(11) DEFAULT NULL,
  `u_integral` int(11) DEFAULT NULL,
  `u_date` date DEFAULT NULL,
  `u_share` varchar(60) DEFAULT NULL,
  `u_nickname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `AK_Key_2` (`u_name`,`u_uid`),
  KEY `FK_Reference_23` (`t_p_pc_id`),
  KEY `FK_Reference_32` (`act_id`),
  CONSTRAINT `FK_Reference_23` FOREIGN KEY (`t_p_pc_id`) REFERENCES `t_picture` (`pc_id`),
  CONSTRAINT `FK_Reference_32` FOREIGN KEY (`act_id`) REFERENCES `t_activity` (`act_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `t_user` */

insert  into `t_user`(`u_id`,`u_uid`,`t_p_pc_id`,`act_id`,`u_name`,`u_sex`,`u_password`,`u_tel`,`u_email`,`u_state`,`u_integral`,`u_date`,`u_share`,`u_nickname`) values (1,'100004',54,NULL,'admin',1,'admin','18080886041','78541@qq.com',1,NULL,NULL,'null','null'),(2,'100000',18,2,'546',1,'000','13183810335','925940834@qq.com',1,100,'2016-02-05','56  5456 45 64','你好'),(3,'100002',85,3,'aa',1,'aaaaaa','123234545','rtuynij@136.com',1,100,'2014-02-03','骑行','热天'),(4,'100001',18,2,'aaa',0,'123456','13608227784','yitjhy@126.com',1,100,'2017-02-23','世界那么大，我想去看看','烟火'),(5,'100003',84,3,'www',1,'admin','13608227784','jrhnrtji@125.com',1,100,'2017-02-23','hteiuwy oe ','rrr'),(6,'100007',18,2,'张心如',0,'123456','18224087939','ewr @125.cpm',1,NULL,'2017-02-23','骑行路后的风景','LikeBike'),(7,'100010',86,NULL,'张三',NULL,'123456','18224087939',NULL,1,NULL,'2017-02-23',NULL,NULL),(12,'100011',87,NULL,'保温',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'100012',88,NULL,'gh',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'100013',59,NULL,'bsns',NULL,'123456zz','13608227784',NULL,1,NULL,'2017-02-23',NULL,NULL),(15,'100014',NULL,NULL,'zaq',NULL,'123456','18224087939',NULL,1,NULL,'2017-02-23',NULL,NULL),(16,'100015',NULL,NULL,'aaaaaaa',NULL,'qaz123456','18224087939',NULL,1,NULL,'2017-02-24',NULL,NULL),(17,'100016',NULL,NULL,'qqqqqqq',NULL,'qq123456','18224087939',NULL,1,NULL,'2017-02-24',NULL,NULL),(18,'100017',NULL,NULL,'zzz',NULL,'123456zz','18080886041',NULL,1,NULL,'2017-02-24',NULL,NULL),(19,'100018',NULL,NULL,'zzzz',NULL,'369308','18080886041',NULL,1,NULL,'2017-02-24',NULL,NULL),(20,NULL,NULL,NULL,'zzqq123456',NULL,'qq123456','18080886041',NULL,1,NULL,'2017-02-26',NULL,NULL),(21,NULL,NULL,NULL,'15515057171',NULL,'962464','15515057171',NULL,1,NULL,'2017-02-27',NULL,NULL),(22,NULL,NULL,NULL,'women',NULL,'123','15008484618',NULL,1,NULL,'2017-02-27',NULL,NULL),(23,NULL,NULL,NULL,'bbb',0,'bbb','18990822060',NULL,1,NULL,'2017-02-27','657657','7678'),(24,NULL,NULL,NULL,'zzzzz',NULL,'123456','18080886041',NULL,1,NULL,'2017-02-28',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
