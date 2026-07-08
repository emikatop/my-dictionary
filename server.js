const express = require('express');
const cors = require('cors'); 
const app = express();

//Middleware
app.use(cors()); // дозволяє фронтенду звертатись до сервера
app.use(express.json()); //allows the server to parse(converts json->js object)incoming JSON data in the request body.



//Listen to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});