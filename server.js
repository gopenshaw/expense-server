var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var cors        = require('cors');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var auth   = require('./app/auth.js');
var config = require('./config');
var User   = require('./app/models/user');
var routes = require('./app/routes.js');

// config
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('tokenSecret', config.tokenSecret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('dev'));

apiRoutes = express.Router();

apiRoutes.post('/users', routes.postUsers)
apiRoutes.post('/authenticate', routes.postAuthenticate)

apiRoutes.post('/expenses', auth.authenticate)
apiRoutes.post('/expenses', routes.postExpenses)

app.use('/api', apiRoutes)

app.listen(port);
console.log('Server listening at port ' + port);
