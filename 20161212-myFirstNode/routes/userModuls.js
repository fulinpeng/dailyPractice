"use strict";
const dbconfig=require("./dbconfig.js");
const fs =require("fs");
const user={
    isLogin:function(request,response,next){
        if(request.session.userLogin!=null||request.session.userLogin!=undefined){
            next();
        }else{
            response.redirect("login.html");
        }
    },
    login:function(request,response){
        let name=request.body.username;
        let pwd=request.body.pwd;
        let sql="select*from t_user WHERE u_name='"+name+"' and u_pwd='"+pwd+"'";
        dbconfig.getConnectionSql(sql,[name,pwd],function(err,data) {
            if (data != undefined && data.length > 0) {
                //创建session对象
                request.session.userLogin={myname:name,mypwd:pwd};
                //console.log(request.session.userLogin)
                response.redirect("index.html");
            } else {
                response.redirect("404.html");
            }
        })
    },
    reg:function(request,response){
        let name=request.query.username;
        let pwd=request.query.pwd;
        //let sql="select*from t_user where u_name=? and u_pwd=?";
        let sql="insert into t_user values(null,?,?,null)";
        dbconfig.getConnectionSql(sql,[name,pwd],function(err,data){
            if(err==null){
                response.send("注册成功")
            }else{
                response.send("账号已存在")
            }
        })
    },
    load_deparment:function(request,response){
        let limit=request.body.myPageNum;
        let name=request.body.mydivisionName;
        let userDataLIst=new Array();
        let sql="select*from t_deparment where 1=1 ";
        if(name!=""){
            sql+="and d_name like ? ";
            name="%"+name+"%";
            userDataLIst.push(name);
        }
        sql+="limit ?,10 ";
        let starCount=(limit-1)*10;
        userDataLIst.push(starCount);
        dbconfig.getConnectionSql(sql,userDataLIst,function(err,data){
            if(err!==null||err==undefined){
                response.send(data);
                response.end();
            }
        });
    },
    getMaxPageNum:function(request,response){
        let sql="select count(*) countnum from t_deparment ";
        dbconfig.getConnectionSql(sql,[],function(err,data){
            if(err!==null||err==undefined){
                response.send(data);
                response.end();
            }
        });
    },
    search_deparment:function(request,response){
        let name=request.body.mydivisionName2;
        let sql="select * from t_deparment where d_name=? ";
        dbconfig.getConnectionSql(sql,[name],function(err,data){
            if(err!==null||err==undefined){
                response.send(data);
                response.end();
            }
        });
    },
    revise_deparment:function(request,response){
        let ID=request.body.myID;
        let divisionName=request.body.mydivisionName;
        let tell=request.body.myTell;
        let sql="update t_deparment set d_name=?,d_tell=? where d_id=?";
        dbconfig.getConnectionSql(sql,[divisionName,tell,ID],function(err,data){

        })
    },
    getStaff:function(request,response){
        let ID=request.body.d_id;
        let sql="SELECT s_id,s_name,s_sex,s_tel,s_email,s_state FROM t_staff WHERE d_id=?";
        dbconfig.getConnectionSql(sql,[ID],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    add_deparment:function(request,response){
        let divisionName=request.body.mydivisionName2;
        let tell=request.body.myTell;
        let sql="INSERT INTO t_deparment VALUES(NULL,?,null,null,?)";
        dbconfig.getConnectionSql(sql,[divisionName,tell],function(err,data){

        })
    },
    delete_deparment:function(request,response){
        let ID=request.body.myID;
        let sql="delete from t_deparment where d_id=?";
        dbconfig.getConnectionSql(sql,[ID],function(err,data){

        })
    },
    add_notice:function(request,response){
        let title=request.query.noticeTitle;
        let detail=request.query.noticeDetail;
        let date=request.query.noticeDate;
        let name=request.query.noticeName;
        let sql="insert into t_notice values(null,?,?,?,?,null) ";
        dbconfig.getConnectionSql(sql,[title,name,date,detail],function(err,data){
            let note={
                "n_title":title,
                "n_detail":detail,
                "n_date":date,
                "n_name":name
                };
            response.render("more",note);
        })
    },
    load_noticeList:function(request,response){
        let name=request.session.userLogin.myname;
        let pageNum=request.body.pageNumeNotice;
        let sql="select*from t_notice where 1=1 ";
        let noticearr=new Array();
        noticearr.push(name);
        sql+="and n_name=? ";
        pageNum=(pageNum-1)*6;
        sql+="limit ?,6 ";
        noticearr.push(pageNum);console.log(sql);
        dbconfig.getConnectionSql(sql,noticearr,function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        });
    },
    getMaxPageNum_notice:function(request,response){
        let sql="select count(*) countNum from t_notice where 1=1 ";
        let name=request.session.userLogin.myname;
        if(name!=null||name!=undefined){
            sql+="and n_name=?";
        }
        dbconfig.getConnectionSql(sql,[name],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        });
    },
    showNoticeDetail:function(request,response){
        let ID =request.query.noticeId;
        let sql = "select * from t_notice where id=?";
        dbconfig.getConnectionSql(sql,[ID],function(err,data){
            let note= data[0];
            response.render("more",note)
        })
    },
    delete_notice:function(request,response){
        let ID=request.body.noticeId;
        let sql="DELETE from t_notice where id=? ";
        dbconfig.getConnectionSql(sql,[ID],function(err,data){
        })
    },
    load_staff:function(request,response){
        let pageNum=request.body.myPageNum;
        let sql="SELECT t1.s_id,t1.s_name,t1.s_sex,t1.s_tel,t1.s_email,t1.s_state,t2.j_name FROM t_staff t1 LEFT JOIN t_job t2 ON t1.j_job=t2.j_job ";
        sql+="LIMIT ?,10 ";
        pageNum=(pageNum-1)*10;
        dbconfig.getConnectionSql(sql,[pageNum],function(err,data){
            if(err==null||err==undefined) {
                response.send(data);
                response.end();
            }
        })
    },
    update_staff:function(request,response){
        let name=request.body.myname;
        let id=request.body.myid;
        let sex=request.body.mysex;
        let tel=request.body.mytel;
        let email=request.body.myemail;
        let activated=request.body.myactivated;
        let duty=request.body.myduty;
        let sql="UPDATE t_staff SET s_name=?,s_sex=?,s_tel=?,s_email=?,s_state=?,j_job=? where s_id=?";
        dbconfig.getConnectionSql(sql,[name,sex,tel,email,activated,duty,id],function(err,data){
            response.end();
        })
    },
    fabuPic:function(request,response){
        let picSrc=request.body.picSrc;
        let alt=request.body.alt;
        let banji=request.body.banji;
        let nianji=request.body.nianji;
        let title=request.body.title;
        let sql="INSERT INTO t_pic VALUES(NULL,?,?,NULL,?,?,?,?) ";
        dbconfig.getConnectionSql(sql,[title,alt,picSrc,banji,nianji,3],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    getPic:function(request,response){
        let sql="SELECT * FROM t_pic limit ?,10 ";
        let pageNum=request.body.pageNum;
        pageNum=(pageNum-1)*10;
        dbconfig.getConnectionSql(sql,[pageNum],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    getMaxPageNum_pic:function(request,response){
        let sql="select count(*) count from t_pic ";
        dbconfig.getConnectionSql(sql,[],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    delete_pic:function(request,response){
        let sql="DELETE FROM t_pic WHERE p_id=? ";
        let id=request.body.id;
        dbconfig.getConnectionSql(sql,[id],function(err,data){
        })
    },
    delete_pics:function(request,response){
        let sql="DELETE FROM t_pic WHERE p_id in (?) ";
        let picArr=request.body.picArr;
        dbconfig.getConnectionSql(sql,[picArr],function(err,data){
            console.log(err);
        })
    },
    upPic:function(request,response){
        let username="admin";
        let fileName=request.files.myfiles.name;
        let tempPath=request.files.myfiles.path;
        let tergetPath="./public/upload/"+username+"/"+fileName;
        if(fs.existsSync("./public/upload/"+username)==false){//判断有没有该文件夹
            fs.mkdirSync("./public/upload/"+username);//创建一个文件夹
        }
        fs.rename(tempPath,tergetPath,function(err){
            if(err==null){
                response.send({url:"upload/"+username+"/"+fileName});
            }else{
                throw err;
            }
        });
    }
};
module.exports=user;
