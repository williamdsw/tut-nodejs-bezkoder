
const express = require('express');         // Builds the Rest API
const bodyParser = require('body-parser');  // Parses the request and create the body request
const cors = require('cors');               // Middleware to enable CORS with options
const database = require('./app/models');

const app = express();

let corsOptions = {
    origin: 'http://localhost:8082'
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

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});
