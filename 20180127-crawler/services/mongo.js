/**
 * Created by flp on 2018/1/27.
 */
const mongoose=require('mongoose');
// mongoose.Promise=global.Promise;

mongoose.createConnection('mongodb://localhost/crawler', {
    server:{poolSize:5}
});

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.on('openUrl', function () {
    console.log('MongoDB Connection Established.');
});
/**
 * 
 */
module.exports=db;

