const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const categoryRoutes = require('./api/routes/category');

const port = process.env.PORT || 3000;
app.use('/api/categories', categoryRoutes);
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/vacants',{ useNewUrlParser: true })
.then(db => {
    console.log('db connected');
    app.listen(port, () => {
        console.log('Http server running');
    })
    
})
.catch(err => console.log(err))