const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel')
const Address = require('../models/AddressModel')
const authHandler = require('./helpers/auth-handler');
const cartExistence = require('./helpers/cart-existence');


router.get('/', cartExistence, authHandler, function (req, res, next) {
    
    res.render('delivery-address',{
        title: 'Delivery address',
        linkActive: 'cart',
        user: req.session.user,
        cart: req.session.cart,
        data: req.session.deliveryInfo
    }) 
});

//post metoda koja sprema session podatke

router.post('/', cartExistence, authHandler, (req, res)=>{

   
    req.session.deliveryInfo = req.body; //sprema se na sesiju

    console.log("New info:", req.session.deliveryInfo);
    res.redirect('/cart');

});

router.post('/rest', cartExistence, authHandler, (req, res)=>{

   
    req.session.deliveryInfo = undefined; //sprema se na sesiju

    console.log("Info deleted:", req.session.deliveryInfo);
    res.redirect('/delivery-address');

});


module.exports = router;