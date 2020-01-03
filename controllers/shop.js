const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(result => {
      console.log(result);
      res.render('shop/product-list', {
        path: '/products',
        pageTitle: 'All products',
        prods: result
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}})
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  // Product.findByPk(prodId)
  //   .then(product => {
  //     console.log(product);
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
    
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(result => {
    console.log(result);
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'All products',
      prods: result
    });
  })
  .catch(err => console.log(err));
    
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      cart.getProducts()
      .then(products => {
        console.log('Cart products', products);
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQty = 1;
  req.user
    .getCart().then(cart => {
      fetchedCart = cart;
      return fetchedCart.getProducts({where: {id: prodId}});
    })
    .then(products => {
      let product;
      
      if(products.length > 0) {
        product = products[0];
      }

      if(product) {
        const oldQty = product.cartItem.qty;
        newQty = oldQty + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: {qty: newQty}
      });
    })
    .then(data => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart().then(cart => {
      return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
      return products[0].cartItem.destroy()
    })
    .then(product => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart().then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      req.user.createOrder().then(order => {
        return order.addProducts(
          products.map(product => {
          product.orderItem = {qty: product.cartItem.qty}; 
          return product;
        }))
      })
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
