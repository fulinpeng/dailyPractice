/**
 * Created by Administrator on 2017/2/25 0025.
 */
"use strict";

const dbconnect=require("../dbModule.js");
const modulShoppingCar={
    loadData_Pr_shoppingCar_bike:function(request,response){
        let sql="SELECT in_id,pc_src,pc_name,b_name,b_price,in_bynumber,b_price*in_bynumber xiaoji FROM t_indent t1 JOIN t_bicycle t2 ON t1.t_b_b_id=t2.b_id "+
                "JOIN t_picture t3 ON t3.pc_id=t2.pc_id "+
                "WHERE t1.u_name=?  AND in_state=1 AND t_b_b_id IS NOT NULL";
        let userName=request.body.userName;
        dbconnect.getConnectionSql(sql,[userName],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    loadData_Pr_shoppingCar_pei:function(request,response){
        let sql="SELECT in_id,pc_src,pc_name,a_name,a_price,in_acnumber,a_price*in_acnumber xiaoji FROM t_indent t1 JOIN t_accessories t2 ON t1.t_a_a_id=t2.a_id "+
            "JOIN t_picture t3 ON t3.pc_id=t2.pc_id "+
            "WHERE t1.u_name=? AND in_state=1 AND t_a_a_id IS NOT NULL ";
        let userName=request.body.userName;
        dbconnect.getConnectionSql(sql,[userName],function(err,data){
            if(err==null||err==undefined){
                response.send(data);
                response.end();
            }
        })
    },
    deleteShopCar:function(request,response){
        let sql="DELETE FROM t_indent WHERE in_id=? ";
        let in_id=request.body.in_id;
        dbconnect.getConnectionSql(sql,[in_id],function(err,data){
            response.send(data);
            response.end();
        })
    }
};
module.exports=modulShoppingCar;
