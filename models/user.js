

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true}, 
      quantity: {type: Number, required: true}}]
  }
})

UserSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    console.log('cart item', cp.productId, product._id);
    return product._id.toString() === cp.productId.toString();
   });
  console.log('Existing product Index', cartProductIndex);
  let newQty = 1;
  const updatedCartItems = [...this.cart.items];
  if(cartProductIndex >= 0) {
    newQty = updatedCartItems[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQty;
  } else {
    updatedCartItems.push(
      { productId: product._id,
        quantity: newQty        
      }
    );
  }
  const updatedCart = {items: updatedCartItems};
  this.cart = updatedCart;
  return this.save();
}

module.exports = mongoose.model('User', UserSchema);

/*
const getDb = require('../util/database').getDB;
const mongodb = require('mongodb');
const objectId = mongodb.ObjectID;

class User {
  constructor(username, email, cart, _id) {
    this.name = username,
    this.email = email
    this._id = _id;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection('users')
      .insertOne(this);
  }

  static findById(userid) {
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new objectId(userid)})
      .then(user => {
        console.log('user', user);
        return user;
      })
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      console.log('cart item', cp.productId, product._id);
      return product._id.toString() === cp.productId.toString();
    });
    console.log('Existing product Index', cartProductIndex);
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0) {
      newQty = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push(
        { productId: new objectId(product._id), 
          quantity: newQty
        }
      );
    }
    const updatedCart = {items: updatedCartItems};
    const db = getDb();
    console.log('cart model product', updatedCart);
    return db.collection('users') 
      .updateOne(
        {_id: new objectId(this._id)}, 
        {$set: {cart: updatedCart}}
      );
  }

  getCarts() {
    const db = getDb();
    const productIds = this.cart.items.map(p => {
      return p.productId;
    })
    return db.collection('products')
      .find({_id: {$in: productIds}})
      .toArray()
      .then(products => {
        return products.map(p => {
          return {...p, 
                  quantity: this.cart.items.find(i => {
                return p._id.toString() === i.productId.toString();
              }).quantity
            };
        });
      });
  }

  addOrders() {
    const db = getDb();
    return this.getCarts()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new objectId(this._id),
            name: this.name,
          }
        };
        return db.collection('orders')
          .insertOne(order)
      })
      .then(result => {
        this.cart = {items: []};
        return db.collection('users')
          .updateOne(
            {_id: new mongodb.ObjectID(this._id)},
            {$set: {cart: {items: []}}}
          );
      })
      .catch(err => console.log(err));
  }

  

  deleteItemFromCart(productid) {
    const updatedCartItems = this.cart.items.filter(p => {
      return p.productId.toString() !== productid.toString(); 
    });
    const db = getDb();
    return db.collection('users')
      .updateOne(
        {_id: new objectId(this._id)},
        {$set: {cart: {items: updatedCartItems}}}
      )
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders')
      .find({'user._id': new objectId(this._id)})
      .toArray(); 
  }

}

module.exports = User;
*/