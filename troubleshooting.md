## UI CONFIG

# DB PostgreSQL CONFIG

Main link https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database
More info on https://devcenter.heroku.com/articles/heroku-postgresql //postgresql obviously
```
$ heroku addons:create heroku-postgresql:hobby-dev
$ npm install pg
$ sudo apt-get install postgresql
$ sudo -u postgres createuser -s my_new_user
$ sudo -u postgres createdb my_new_database

$ heroku pg:psql
    "Inside" heroku psql server, your remote heroku db:
    => create table pictures_table (id_picture integer, text_picture text, image_picture bytea, time_picture timestamp);
    => insert into pictures_table values (1, 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', null, now());

$ psql my_new_database          
    "Inside" local psql server, do the same thing if you want to work locally:
    => create table pictures_table (id_picture integer, text_picture text, image_picture bytea, time_picture timestamp);
    => insert into pictures_table values (1, 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', null, now());

$ edit your index.js ... check the main link above to add a few code lines
$ heroku local

```
Troubleshooting - If you want to work local you should exec the comands below and avoid the following errors
Error error: password authentication failed for user ... and Error Error: connect ECONNREFUSED 127.0.1.1:5432 ... 
More info https://node-postgres.com/features/connecting

Set a password for the postgres user
```
$ sudo -u postgres psql postgres        //Run the psql command from the postgres user
$ \password postgres                    //Set the password, after setting the password close te connection with the comand "\q"
 ```

Allow local connections to PostgreSQL
```
$ sudo vi /etc/postgresql/YOUR_PG_VERSION/main/pg_hba.conf //Go to the line that describe local socket connections "about line 90"
    modify the line from "local   all             all                                      peer"
                    to   "local   all             all                                      md5"
$ sudo service postgresql restart

/*Define environment variables*/     
$ vi ~/.profile             //add the following string with your correct data at the end of file
    export DATABASE_LOCAL_URL="postgresql://my_new_user:secretpassword@localhost:5432/my_new_database"

After having edited the file, you should re-login in order to initialize the variables. 
```




