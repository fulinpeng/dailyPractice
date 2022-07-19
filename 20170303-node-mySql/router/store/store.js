/**
 * Created by Administrator on 2017/2/23.
 */
"use strict";
const mydatabase=require("./../dbModule.js");
var stModule={
    /*商城整车展示第一部分*/
    getStoreShow1:function(request,response){
          let Message=request.body.Message;
          let sql="SELECT b_name,b_price,pc_src,pc_name FROM t_bicycle b  JOIN t_picture p ON b.pc_id=p.pc_id WHERE p.pc_name LIKE 'indexs-black%'";
        mydatabase.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    /*商城整车展示第二部分*/
    getStoreShow2:function(request,response){
          let Message=request.body.Message;
          let sql="SELECT b_name,b_price,pc_src,pc_name FROM t_bicycle b  JOIN t_picture p ON b.pc_id=p.pc_id WHERE p.pc_name LIKE 'indexs-first%'";
          mydatabase.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    /*商城整车展示第二部分*/
    getStoreShow3:function(request,response){
        let Message=request.body.Message;
        let sql="SELECT b_name,b_price,pc_src,pc_name FROM t_bicycle b JOIN t_picture p ON b.pc_id=p.pc_id WHERE p.pc_name LIKE '%index-second%'";
        mydatabase.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    /*商城配件展示部分*/
    getStoreShow4:function(request,response){
        let Message=request.body.Message;
        let sql="SELECT	a_name,a_price,pc_name,pc_src FROM t_accessories a JOIN t_picture b ON a.pc_id=b.pc_id WHERE b.pc_name LIKE '%index_peijian%'";
        mydatabase.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    /*商品详情页面整车展示部分*/
    //detailsMessage_zhuangbei:function(request,response){
    //    let sql="SELECT a_name,a_price,pc_src,pc_name FROM t_accessories t1 JOIN t_picture t2 ON t1.pc_id=t2.pc_id";
    //    mydatabase.getConnectionSql(sql,[],function(err,data){
    //        console.log(err);
    //        if(err==null||err==undefined){
    //            response.send(data);
    //        }
    //    })
    //},
    /*商城配件点击带参数到详情页面*/
    getStorDetails:function(request,response){
        let src=request.query.src;
        let name=request.query.name;
        let sql="SELECT * FROM t_accessories a LEFT JOIN t_picture b ON a.pc_id=b.pc_id WHERE pc_name=? AND pc_src=?";
        mydatabase.getConnectionSql(sql,[name,src],function(err,data){
            let shplist=data[0];
            response.render('s-details1',{shplist:shplist});
        })
    },
    /*装备推荐用随机数产生*/
    getshangping:function(request,response){
        let rannum=request.body.rannum;
        rannum=Math.ceil(rannum);//math.ceil取整
        let sql='SELECT * FROM t_accessories a LEFT JOIN t_picture b ON a.pc_id=b.pc_id LIMIT ?,4';
        mydatabase.getConnectionSql(sql,[rannum],function(err,data){
            console.log(err);
            let accessList=data;
            response.render('storeShow',{accessList:accessList})
        })
    },
    /*商城整车1点击带参数到详情页面*/
    getbikeMessage1:function(request,response){
        let src=request.query.src;
        let name=request.query.name;
        let sql="SELECT * FROM t_bicycle a JOIN t_picture b ON a.pc_id=b.pc_id where pc_name=? AND pc_src=?";
        mydatabase.getConnectionSql(sql,[name,src],function(err,data){
          let shplist=data[0];
            response.render('s-details',{shplist:shplist});
        })
    },
    /*商城整车2点击带参数到详情页面*/
    getbikeMessage2:function(request,response){
        let src=request.query.src;
        let name=request.query.name;
        let sql="SELECT * FROM t_bicycle a JOIN t_picture b ON a.pc_id=b.pc_id WHERE pc_name=?";
        mydatabase.getConnectionSql(sql,[name],function(err,data){
            let shplist=data[0];
            response.render('s-details',{shplist:shplist});
        })
    },
    /*商城整车3点击带参数到详情页面*/
    getbikeMessage3:function(request,response){
        let src=request.query.src;
        let name=request.query.name;
        let sql="select * from t_bicycle a join t_picture b on a.pc_id=b.pc_id where pc_name=?";
        mydatabase.getConnectionSql(sql,[name],function(err,data){
            let shplist=data[0];
            response.render('s-details',{shplist:shplist});
        })
    },
    buybike:function(request,response){
        let username=request.body.username;
        let t_b_b_id=request.body.t_b_b_id;
        let in_bynumber=request.body.in_bynumber;
        let sql="INSERT INTO t_indent VALUES(NULL,1,?,NULL,?,?,NULL,NULL,1,NULL,NULL,NULL) ";
        mydatabase.getConnectionSql(sql,[t_b_b_id,username,in_bynumber],function(err,data){
            if(err==null||err==undefined){
                response.send(data)
            }else{
                console.log(err);
            }
        })
    },
    buryparts:function(request,response){
        let username=request.body.username;
        let bikeid=request.body.bikenum;
        let bikecount=request.body.in_bynumber;
        console.log(username);
        console.log(bikeid);
        console.log(bikecount);
        let sql="INSERT INTO t_indent VALUES(NULL,1,NULL,?,?,NULL,?,NULL,1,NULL,NULL,NULL)";
        mydatabase.getConnectionSql(sql,[bikeid,username,bikecount],function(err,data){
            if(err==null||err==undefined){
                response.send(data)
            }else{
                console.log(err)
            }
        })
    }
};
module.exports=stModule;