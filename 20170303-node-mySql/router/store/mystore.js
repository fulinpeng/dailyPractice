/**
 * Created by Administrator on 2017/2/23 0023.
 */
"use strict";
const db=require("../dbModule.js");
var mystore={
    partslist:function(request,response){
        let cpage=request.body.cpage;
        let sql="SELECT a_id,a_name,a_price,pc_src,pc_name FROM t_accessories t " +
            " JOIN t_picture p ON t.pc_id=p.pc_id";
        sql=sql+" limit "+(cpage-1)*7+",7";
        db.getConnectionSql(sql,[],function(err,data){
            if(data!=null&&data.length>0){
                response.send(data);
            }else{
                console.log(err);
            }
        })
    },
    getCount:function(request,response){
        let sql="select count(*) as count from t_accessories";
        db.getConnectionSql(sql,[],function(err,data){
            if(err==null||err!==undefined){
                var count=data[0].count;
                if(count%7==0){
                    let newcount=parseInt(count/7);
                    response.send(newcount.toString());
                }else{
                    let newcount=parseInt(count/7+1);
                    response.send(newcount.toString());
                }
            }else{
                console.log(err)
            }
        })
    },
    getallbicyclecount:function(request,response){
        let sql="select count(*) as count from t_bicycle";
        db.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                var count=data[0].count;
                if(count%7==0){
                    let newcount=parseInt(count/7);
                    response.send(newcount.toString());
                }else{
                    let newcount=parseInt(count/7+1);
                    response.send(newcount.toString());
                }
            }else{
                console.log(err);
            }
        })
    },
    getallbicycle:function(request,response){
        let currentpage=request.body.currentpage;
        let sql="SELECT b_id,b_name,b_price,pc_name,pc_src FROM t_bicycle t JOIN t_picture p ON t.pc_id=p.pc_id";
        sql=sql+" limit "+(currentpage-1)*7+",7";
        db.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }else{
                console.log(data);
            }
        })
    },
    getallmadeparts:function(request,response){
        var str=request.body.str;
        str="%"+str+"%";
        let sql="SELECT a_id,a_name,a_price,pc_src,pc_name FROM t_accessories t JOIN t_picture p ON t.pc_id=p.pc_id WHERE t.a_name LIKE ?";
        db.getConnectionSql(sql,[str],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }else{
                console.log(err)
            }
        })
    },
    getpartsid:function(request,response){
        let lts=request.body.lts;
        lts=lts.split("/");
        lts=lts[lts.length-1];
        let cjs=request.body.cjs;
        cjs=cjs.split("/");
        cjs=cjs[cjs.length-1];
        let qcs=request.body.qcs;
        qcs=qcs.split("/");
        qcs=qcs[qcs.length-1];
        let lzs=request.body.lzs;
        lzs=lzs.split("/");
        lzs=lzs[lzs.length-1];
        let sql="SELECT a_id FROM t_accessories WHERE pc_id IN(SELECT pc_id FROM t_picture WHERE pc_name IN(?,?,?,?))"
        db.getConnectionSql(sql,[lts,qcs,lzs,cjs],function(err,data){
            if(data!=null&&data.length>0){
                response.send(data)
            }else{
                console.log(err)
            }
        })
    },
    madethebicycle:function(request,response){
      let part1=request.body.part1;
      let part2=request.body.part2;
      let part3=request.body.part3;
      let part4=request.body.part4;
      let userid=request.body.userid;
      let sql="insert into t_indent value(null,1111,null,?,?,0,1,null,1,now(),now(),null),(null,1111,null,?,?,0,1,null,1,now(),now(),null),(null,1111,null,?,?,0,1,null,1,now(),now(),null),(null,1111,null,?,?,0,1,null,1,now(),now(),null)"
      db.getConnectionSql(sql,[part1,userid,part2,userid,part3,userid,part4,userid],function(err,data){
          if(err==null||err==undefined){
              response.send("1");
              //response.redirect("pages/personal/pr_shoppingCar.html")
          }
      })
    },
    getuseraddress:function(request,response){
        let username=request.body.un;
        console.log(username)
        let sql="SELECT * FROM t_profile WHERE u_id=(SELECT u_id FROM t_user WHERE u_name=?)"
        db.getConnectionSql(sql,[username],function(err,data){
            if(err==null||err==undefined){
                response.send(data)
            }else{
                console.log(data)
            }
        })
    },
    getalllist:function(request,response){
        let list=request.body.list;
        let str="";
        for(let i=0;i<list.length;i++){
            if(i==list.length-1){
                str=str+"?"
            }else{
                str=str+"?,"
            }
        }
        str="("+str+")";
        let sql="select * from t_indent i left join t_bicycle b on i.t_b_b_id=b.b_id left join t_accessories on t_a_a_id=a_id where in_id in"
        sql=sql+str;
        db.getConnectionSql(sql,list,function(err,data){
            if(err==null||err==undefined){
                //console.log(data)
                response.send(data)
            }else{
                console.log(err)
            }
        })
    },
    getbicycleinfo:function(request,response){
        let n=request.body.n;
        let sql="SELECT * FROM t_bicycle t JOIN t_picture p ON t.pc_id=p.pc_id  JOIN t_parameter pa ON t.pa_id=pa.pa_id JOIN t_indent ind ON t.b_id=ind.t_b_b_id WHERE in_state=1 AND t.b_id=?"
        //console.log()
        db.getConnectionSql(sql,[n],function(err,data){
            if(err==null||err==undefined){
                //console.log(data)
                response.send(data);
            }
        })
    },
    getpartsinfo:function(request,response){
        let n=request.body.n;
        let sql="SELECT * FROM t_accessories t JOIN t_picture p ON t.pc_id=p.pc_id JOIN t_indent ind ON t.a_id=ind.t_a_a_id WHERE in_state=1 AND t.a_id=?"
        db.getConnectionSql(sql,[n],function(err,data){
            if(err==null||err==undefined){
                //console.log(data)
                response.send(data);
            }
        })
},
    inserintoindent:function(request,response){
        let newlist=request.body.newlist;
        let str="";
        for(let i=0;i<newlist.length;i++){
            if(i==newlist.length-1){
                str=str+"?"
            }else{
                str=str+"?,"
            }
        }
        str="("+str+")";
        let sql="UPDATE t_indent SET in_state=2 WHERE in_id IN ";
        sql=sql+str;
        db.getConnectionSql(sql,newlist,function(err,data){
            if(err==null||err==undefined){
                response.send("1")
            }else{
                console.log(err)
            }
        })
    }
};
module.exports=mystore;