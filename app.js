const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const config = require('./config/datebase')
const mainR = require('./routes/main');
const userR = require("./routes/users");


app.use(express.static('public'))
app.use(express.json())

// Parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// connection
mongoose.connect(config.datebase, {useNewUrlParser: true});
let db = mongoose.connection;
db.once("open", (err) => { console.log("connected") });
db.on("error", (err)=> {console.log(err)});
mongoose.set('useFindAndModify', false);

// Routes
app.use('/', mainR);
app.use('/api', userR)


app.listen(port, () => console.log(`listening on port ${port}!`));