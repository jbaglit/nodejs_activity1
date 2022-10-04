const express = require('express');
const app = express();
const usersRoute = require('./routes/users');

//Test routing to PORT
app.get('/', (req, res) => {
    res.send({
        msg: 'Hello World! from Index.js'
    });
});

app.use('/users', usersRoute)

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
});