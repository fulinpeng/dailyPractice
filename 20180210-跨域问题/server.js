var express = require('express');

var app = express();

app.get('/jsonptest', function (req,res) {
    var {cb} = req.query;
    var data = {res:{type:'success',data:[1,2,3]}};
    res.end(`${cb}(${JSON.stringify(data)})`);
});

app.listen(3000);