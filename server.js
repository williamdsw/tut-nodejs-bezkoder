
const express = require('express');         // Builds the Rest API
const bodyParser = require('body-parser');  // Parses the request and create the body request
const cors = require('cors');               // Middleware to enable CORS with options
const routes = require('./app/routes/tutorial.routes');
const database = require('./app/models');

const app = express();

let corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:8082',
        'https://williamdsw.github.io',
        'https://williamdsw.github.io/tut-vue-ts-crud-bezkoder',
        'https://williamdsw.github.io/tut-vue-ts-crud-bezkoder/',
        'https://williamdsw.github.io/tut-vue-ts-crud-bezkoder/*',
    ],
    default: 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

database.sequelize.sync({ force: true }).then(() => {
   console.log('Drop and re-sync database!'); 
});

app.get('/', (request, response) => { 
    response.json({ message: 'Welcome to williamdsw application!' });
});

app.all('*', (request, response, next) => {
    const header = request.header('origin').toLowerCase();
    console.log('header', header);
    const indexOf = corsOptions.origin.indexOf(header);
    console.log('indexof header', indexOf);
    const origin = (indexOf > -1 ? request.headers.origin : corsOptions.default);
    console.log('origin');
    response.header('Access-Control-Allow-Origin', origin);
    response.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accep');
    next();
});

routes(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
