

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }, 
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('product', productSchema);






































/*
const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product {
  constructor(title, price, description, imageUrl, id, userid) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? mongodb.ObjectID(id) : null;
    this.userid = userid
  }

  save() {
    const db = getDB();
    let dbOne;
    if(!this._id) {
      dbOne = db.collection('products').insertOne(this);
    } else {
      console.log('Product model update method called');
      dbOne = db.collection('products')
        .updateOne({_id: this._id}, {$set: this });
    }
    return dbOne
      .then(result => {
        console.log('Record inserted', result);
      })
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products').find().toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDB();
    return db.collection('products').find({_id: new mongodb.ObjectID(prodId)})
      .next()
      .then(product => {
        return product;
        console.log(product);
      })
      .catch(err => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDB();
    return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectID(prodId)})
      .then(result => {
          console.log('Product deleted...');
      })
      .catch(err => console.log(err));
  }

}


module.exports = Product;

*/