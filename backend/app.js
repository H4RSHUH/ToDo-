const express= require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

const todoRoutes= require('./routes/route');

app.use('/api', todoRoutes);

app.get('/api/test', (req, res) => {
    res.send('Hello World!');
});


module.exports= app;