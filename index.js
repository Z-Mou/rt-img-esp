const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(bodyParser.json()) // for parsing application/json
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/*', (req, res) => res.render('pages/index'))
  .post('/', (req, res, next) =>  {
    console.log("POST!!!", req.body);
    res.json(req.body);
    /*var f = fs.createWriteStream('out.jpeg');
    req.on('data', function (data) {
        f.write(data);
    });
    req.on('end', function () {
        f.end();
    });*/
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
