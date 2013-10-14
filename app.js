
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/hi', function(req, res){
	res.send('<h1>oh hey there</h1>')
})

app.get('/manicmonday', function(req, res){
	res.send('<button type = button class = "btn">Hi Im a button</button>')
})

app.get('/test', function(req, res){
	res.send('<h3>Test page <h3>')
})

app.get('/form', function(req, res){
	fs.readFile(__dirname +'/index.html', function(err, data){
		res.setHeader('Content-Type', 'text/html')
		res.send(data)
	})
});

app.post('/signup', function(req, res){
	console.log(req.body)
	var username = req.body;
	res.redirect('/success');
})


app.get('/success', function(req, res){
	res.send('<h3>You are soooo good at filling out forms!!</h3>')
})

// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
