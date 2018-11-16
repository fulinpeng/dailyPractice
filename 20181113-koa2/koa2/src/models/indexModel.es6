/**
 * Created by flp on 2018/4/12.
 */
import rp from 'request-promise'
export default class indexModel {
    initnum() {
        return new Promise((reselve, reject) => {
            rp({
                uri:'http://localhost:8888/practice/conmysql/initnum.php',
                method:'GET',
            }).then((data)=>{
                const result=JSON.parse(data);
                if (data) {
                    reselve(result);
                } else {
                    reject({});
                }
            })
        })
    }
    addition() {
        return new Promise((reselve, reject) => {
            rp({
                uri:'http://localhost:8888/practice/conmysql/praise.php',
                method:'GET',
            }).then((data)=>{
                const result=JSON.parse(data);
                if (data) {
                    reselve(result);
                } else {
                    reject({});
                }
            })
        })
    }
    print() {
        return new Promise((reselve, reject) => {
            rp({
                uri:'http://192.168.0.175/jasperserver/rest_v2/reports/reports/PlanApplyForm.html?accessToken=54a85f6f4b7844a98c50c42418130ea1&id=90&prescriptionId=270',
                method:'GET',
            }).then((data)=>{
                console.log(data);
                // const result=JSON.parse(data);
                if (data) {
                    reselve(data);
                } else {
                    reject({});
                }
            })
        })
    }
}