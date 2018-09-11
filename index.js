const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bytes = require('bytes');
const { Pool } = require('pg'); // PostgreSQL

//const connectionString = process.env.DATABASE_URL;
//const connectionString = process.env.DATABASE_LOCAL_URL;
const connectionString = "postgresql://my_new_user:secretpassword@localhost:5432/my_new_database";

const pool = new Pool({
  connectionString: connectionString,
  ssl: true
});

const PORT = process.env.PORT || 5000;
const QUERY = 'SELECT * FROM test_table';

express()
  .use(bodyParser.raw({ type: 'image/jpeg', limit: bytes('1MB') }))// parse some custom thing into a Buffer
  //.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  //.use(bodyParser.json({ type: 'application/*+json' }))// parse various different custom JSON types as JSON
  //.use(bodyParser.text({ type: 'text/html' }))// parse an HTML body into a string
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query(QUERY);
      res.render('pages/db', {data: result.rows});
      client.release();
    } catch (err) {
      console.error(err);
      return res.end(`error: ${er.message}`);
    }
  })
  .post('/*', (req, res, next) =>  {
      
    /*if (req.body.length > 1e6) {
      console.warn("Error: POST TOO BIG!");
      req.connection.destroy();
    }*/
    
    let f = fs.createWriteStream('out.jpeg');
    let body = '';
    
    // Get the data as utf8 strings.
    req.setEncoding('utf8');

    // Readable streams emit 'data' events once a listener is added
    req.on('data', (chunk) => {
      body += chunk;
    });
    console.log("POSTED!!");
    // the 'end' event indicates that the entire body has been received
    req.on('end', () => {
      try {
        f.write(body);
        res.write("Msg Saved!\n");
        res.end();
      } catch (er) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


