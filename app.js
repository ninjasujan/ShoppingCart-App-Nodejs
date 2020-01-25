
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
  User.findById('5e2714f9f5230a2020a44bad')
    .then(user => {
      req.user = user
      console.log('Req.user', req.user);
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://sujanpoojary:Jt38rgC8LeSS6UY7@cluster0-iltzc.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne()
      .then(users => {
        if(!users) {
          console.log('No user exist in DB');
          const user = new User({
            name: 'Sujan',
            email: 'sujan@gmail.com',
            cart: []
          });
          user.save();
        }
        app.listen(4000);
        console.log('Server listening to port 4000');
      })
  })
  .catch(err => console.log(err)); 









  