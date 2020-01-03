
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const cartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
  User.findByPk(1)
  .then(user => { 
    console.log('User in the request object', user);
    req.user = user
    next(); 
  })
  .catch(err => console.log(err)); 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Association of tables
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product, {as: 'products'});

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, {through: cartItem});
Product.belongsToMany(Cart, {through: cartItem});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderItem});
/* inverse not necessary */

//{force: true} to overide 
sequelize.sync()
  .then(result => {
    return User.findByPk(1)  
  })
  .then(user => {
    if(!user) return User.create({id: 1, name: 'Sujan', email: 'sujan@gmail.com'});
    return Promise.resolve(user);
  })
  .then(user => {
    console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(4000, () => {
      console.log('server running in port 4000');
    });
  })
  .catch(err => console.log(err));



  