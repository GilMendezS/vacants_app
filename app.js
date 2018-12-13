const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());

const categoryRoutes = require('./api/routes/category');
const companyRoutes = require('./api/routes/company');
const contractRoutes = require('./api/routes/contract');
const statusRoutes = require('./api/routes/status');
const userRoutes = require('./api/routes/user');
const vacantRoutes = require('./api/routes/vacant');
const port = process.env.PORT || 3000;
app.use('/api/categories', categoryRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contracts', contractRoutes)
app.use('/api/statuses', statusRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vacants', vacantRoutes)
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/vacants',{ useNewUrlParser: true })
.then(db => {
    console.log('db connected');
    app.listen(port, () => {
        console.log('Http server running');
    })
    
})
.catch(err => console.log(err))