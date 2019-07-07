"use strict";
const mysql=require("mysql");
const mydbconfig=require("./dbModule.js");
const informationModules={
    pr_information:function(request,response){
          let pr_username=request.body.pr_username;
          let sql="SELECT * FROM t_user LEFT JOIN t_picture ON t_p_pc_id=pc_id WHERE u_name=?  ";
          mydbconfig.getConnectionSql(sql,[pr_username],function(err,data){
              if(err==null||err==undefined){
                  response.send(data);
              }
          })
      },
    amendInformation:function(request,response){
         let pr_username=request.body.pr_username;
         let nickname=request.body.nickname;
         let dubai=request.body.dubai;
         let val=request.body.val;
         var arrAmendInformation=[val,dubai,nickname,pr_username];
         let sql="update t_user set u_sex=?,u_share=?,u_nickname=? where u_name=? ";
         mydbconfig.getConnectionSql(sql,arrAmendInformation,function(err,data){
             if(err==null||err==undefined){
                 response.send(data);
             }
         })
     },
    confirmcommitHead:function(request,response){
        let headPicUrl=request.body.headPicUrl;
        let pr_username=request.body.pr_username;
        let sql="UPDATE (t_user a LEFT JOIN t_picture b ON t_p_pc_id=pc_id) SET b.pc_src=?  WHERE a.u_name=?  ";
        mydbconfig.getConnectionSql(sql,[headPicUrl,pr_username],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    address:function(request,response){
        let shoujian_name=request.body.shoujian_name;                                 /*新增地址*/
        let shoujian_tel=request.body.shoujian_tel;
        let prAddress=request.body.prAddress;
        let user_Id=request.body.user_Id;
        let sql="insert into t_profile values (null,?,?,?,null,1,?) ";
        mydbconfig.getConnectionSql(sql,[user_Id,shoujian_name,prAddress,shoujian_tel],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    getUserId:function(request,response){
        let pr_username=request.body.pr_username;
        let sql="select * from t_user where u_name=? ";
        mydbconfig.getConnectionSql(sql,[pr_username],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    selectAddress:function(request,response){
        let user_Id=request.body.user_Id;
        let sql="select * from t_profile where u_id=? ";
        mydbconfig.getConnectionSql(sql,[user_Id],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    updateAddress:function(request,response){
        let shoujian_name=request.body.shoujian_name;                                 /*新增地址*/
        let shoujian_tel=request.body.shoujian_tel;
        let prAddress=request.body.prAddress;
        let user_Id=request.body.user_Id;
        let pr_id2=request.body.pr_id2;
        let sql="UPDATE t_profile SET pr_personal=?, pr_address=?, pr_tel=? WHERE u_id=? AND pr_id=? ";
        mydbconfig.getConnectionSql(sql,[shoujian_name,prAddress,shoujian_tel,user_Id,pr_id2],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    deleteAddress:function(request,response){
        let pr_id3=request.body.pr_id3;
        let sql="delete from t_profile where pr_id=? ";
        mydbconfig.getConnectionSql(sql,[pr_id3],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    showFriend:function(request,response){
        let user_Id=request.body.user_Id;
        let sql="SELECT * FROM t_mybyfriend a LEFT JOIN t_user b ON  a.t_u_u_id=b.u_id LEFT JOIN t_picture c ON b.t_p_pc_id=c.pc_id WHERE  a.u_id=? AND bf_state=1 ";
        mydbconfig.getConnectionSql(sql,[user_Id],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })

    },
    showdetailFreind:function(request,response){
        let user_Id=request.body.user_Id;
        let friend_id=request.body.friend_id;
        let sql="SELECT * FROM t_mybyfriend a LEFT JOIN t_user b ON  a.t_u_u_id=b.u_id LEFT JOIN t_picture c ON b.t_p_pc_id=c.pc_id WHERE  a.u_id=? AND bf_state=1 AND bf_id=? ";
        mydbconfig.getConnectionSql(sql,[user_Id,friend_id],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    showInd:function(request,response){
        let pr_username=request.body.pr_username;
        let pageNum=request.body.pageNum;
        pageNum=(pageNum-1)*3;
        let sql="SELECT * FROM t_indent a LEFT JOIN t_bicycle b ON a.t_b_b_id=b.b_id LEFT JOIN t_accessories c ON a.t_a_a_id=c.a_peijianid LEFT JOIN t_picture d ON c.pc_id=d.pc_id OR d.pc_id=b.pc_id WHERE u_name=? limit ?,3  ";
        mydbconfig.getConnectionSql(sql,[pr_username,pageNum],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    waitPay:function(request,response){
        let pr_username=request.body.pr_username;
        let sql="SELECT * FROM t_indent a LEFT JOIN t_bicycle b ON a.t_b_b_id=b.b_id LEFT JOIN t_accessories c ON a.t_a_a_id=c.a_peijianid LEFT JOIN t_picture d ON c.pc_id=d.pc_id OR d.pc_id=b.pc_id WHERE a.u_name=? and a.in_state=2  ";
        mydbconfig.getConnectionSql(sql,[pr_username],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    hadPay:function(request,response){
        let pr_username=request.body.pr_username;
        let sql="SELECT * FROM t_indent a LEFT JOIN t_bicycle b ON a.t_b_b_id=b.b_id LEFT JOIN t_accessories c ON a.t_a_a_id=c.a_peijianid LEFT JOIN t_picture d ON c.pc_id=d.pc_id OR d.pc_id=b.pc_id WHERE a.u_name=? and a.in_state=1  ";
        mydbconfig.getConnectionSql(sql,[pr_username],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    finishedPay:function(request,response){
        let pr_username=request.body.pr_username;
        let sql="SELECT * FROM t_indent a LEFT JOIN t_bicycle b ON a.t_b_b_id=b.b_id LEFT JOIN t_accessories c ON a.t_a_a_id=c.a_peijianid LEFT JOIN t_picture d ON c.pc_id=d.pc_id OR d.pc_id=b.pc_id WHERE a.u_name=? and a.in_state=3  ";
        mydbconfig.getConnectionSql(sql,[pr_username],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    selectAllCoutInd:function(request,response){
        let pr_username=request.body.pr_username;
        let pageNum=request.body.pageNum;
        pageNum=(pageNum-1)*3;
        let sql="SELECT count(*) h FROM t_indent a LEFT JOIN t_bicycle b ON a.t_b_b_id=b.b_id LEFT JOIN t_accessories c ON a.t_a_a_id=c.a_peijianid LEFT JOIN t_picture d ON c.pc_id=d.pc_id OR d.pc_id=b.pc_id WHERE u_name=?   ";
        mydbconfig.getConnectionSql(sql,[pr_username,pageNum],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
            }
        })
    },
    showIndAddress:function(request,response){
        let pr_username=request.body.pr_username;
    },
    indentdetails1:function(request,response){
        let indet=request.body.indentid;
        let sql='SELECT * FROM t_indent left join t_bicycle on t_b_b_id=b_id left join t_accessories on t_a_a_id=a_id where in_id=?';
        mydbconfig.getConnectionSql(sql,[indet],function(err,data){
            let indentList=data[0];
            response.render('order_details1',{indentList:indentList})
        })
    },
    indentdetails2:function(request,response){
        let uname=request.body.uname;
        let sql='SELECT * FROM t_user a left join t_Profile b on a.u_id=b.u_id where u_name=?';
        mydbconfig.getConnectionSql(sql,[uname],function(err,data){
            let adders=data[0];
            response.render('order_details2',{adders:adders})
        })
    },
    indentdetails3:function(request,response){
        let inid=request.body.inid;
        let sql='SELECT * FROM t_indent a left join t_bicycle b on a.t_b_b_id=b.b_id  left join t_accessories d on t_a_a_id=a_id left join  t_parameter c on b.pa_id=c.pa_id  where in_id=?';
        mydbconfig.getConnectionSql(sql,[inid],function(err,data){
            let indentList=data[0];
            response.render('order_details3',{indentList:indentList})
        })
    }
};

module .exports=informationModules;