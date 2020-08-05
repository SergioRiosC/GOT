const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000)

//Settings


//Middlewares 
app.use(express.json());

//Routes
app.use(require('./Routes/employees'));

// Start the Server
app.listen(app.get('port') ,() => {
    console.log("Server on port", app.get('port'));
});