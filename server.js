'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');

// require and use "multer"...

var app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

app.post("/api/fileanalyse", function(req, res){
  
  if(!req.files) {
    res.send({ error: 'No file uploaded' });
  } else {
    var file = req.files.upfile;
    res.json({name: file.name, type: file.mimetype, size: file.size})
  }
})