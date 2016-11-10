var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

// HomePage
app.get('/',function(req, res){
  res.render('home');
});


////////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb://admin:1a2s3d4f5g@ds041939.mlab.com:41939/weather_app', function(err, database) {
  if (err) return console.log(err);
    app.listen(3000,function(){
      console.log('Server Running');
  });
});