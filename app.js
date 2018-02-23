
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var index = require('./routes/index'); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : '742122a',
        // port : 3306, //port mysql
        database:'users'

    },'request') //or single

);



app.get('/', index.list);
app.get('/user/add', index.add);
app.post('/user/add', index.save);
app.get('/user/delete/:id', index.delete_customer);
app.get('/user/edit/:id', index.edit);
app.post('/user/edit/:id',index.save_edit);


app.use(app.router);
app.use(function(req,res,next){
    res.status(404).send('404 NOT FOUND');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
