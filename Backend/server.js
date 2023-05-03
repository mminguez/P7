const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { mongoUri } = require('./config')
const cors = require('cors')
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/api/login')
const exempleRoutes = require('./routes/api/exemple')
var { expressjwt: jwt } = require("express-jwt");
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://'
  }),
  audience: 'https://',
  issuer: 'https://',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(cors({
    origin: 'https://'
}))
app.use(bodyParser.json())
  
mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/login', loginRoutes)
app.use('/api/exemple', exempleRoutes)
app.get('/', (req, res) => res.send('Seems to work... :)'))

app.listen(4000, () => console.log(`App en cours : http://localhost:${4000}`))