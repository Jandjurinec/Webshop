const express = require('express');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {

    // prikaz košarice uz pomoć cart.ejs

    res.render('cart', {
        linkActive: 'cart',
        title: "Cart overview",
        user: req.session.user,
        cart: req.session.cart,
        err: undefined
    })

});


router.get('/add/:id', async function (req, res, next) {

    //dodavanje jednog artikla u košaricu
    let id = req.params.id;

    if (req.session.cart === undefined) {
        req.session.cart = cart.createCart();
    }

    await cart.addItemToCart(req.session.cart, id, 1); //adding only one item
    console.log("__________________________________________")
    console.log("User " + JSON.stringify(req.session.user));
    console.log("Cookie "+JSON.stringify(req.session.cookie));
    console.log("Cart " +JSON.stringify(req.session.cart));
    res.end();



});

router.get('/remove/:id', async function (req, res, next) {

    //brisanje jednog artikla iz košarice
    let id = req.params.id;

    await cart.removeItemFromCart(req.session.cart, id, 1); //adding only one item
    console.log("User " + JSON.stringify(req.session.user));
    console.log("Cookie " + JSON.stringify(req.session.cookie));
    console.log("Cart " + JSON.stringify(req.session.cart));
    res.end();

});

module.exports = router;