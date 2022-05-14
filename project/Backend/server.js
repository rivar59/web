const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const config = require('./app/config/auth.config');


// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://rivar:5fZWgrCWLm1DRzK8@cluster0.js52b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// noinspection JSVoidFunctionReturnValueUsed,JSUnresolvedFunction
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Database Connected');
  console.log("Successfully connected to MongoDB.");
}).catch(err => {
  console.log(err);
  console.log('Could not connect to MongoDB.');
});

const corsOptions = {
  origin: ["http://127.0.0.1:8080", "http://localhost:8080", "http://192.168.137.13:8080", "http://10.204.2.21:8080"]
};

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (
    req.headers
    && req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      config.secret,
      {},
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
  } else {
    req.user = undefined;
    next();
  }
});

// simple route
require('./app/routes/comment.routes.js')(app);
require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.listen(5000, () => {
  console.log("Server has started!")
})
