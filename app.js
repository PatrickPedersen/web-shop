const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
const User = require('./models/user')


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(((req, res, next) => {
    User.findById('605270320db311170833f265')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
}))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose
    .connect(
        process.env.DATABASE_URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Patrick',
                    email: 'patrick@example.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000)
        console.log(`Listening on PORT ${3000}`)
    })
    .catch(err => {
        console.error(err)
})
