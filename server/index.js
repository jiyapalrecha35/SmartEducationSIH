const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./routes/routes');
const { connectToDB } = require('./db/db');
const PORT = 8080;
const URL = 'mongodb://127.0.0.1:27017/sih2023';

app.use(cors());
app.use(bodyParser.json());
app.use('/',router);

(async function (){
    await connectToDB(URL);
    console.log('Connected to sih2023 database');
    app.listen(PORT, function(){
        console.log(`Listening on port ${PORT}`);
    });
})();

