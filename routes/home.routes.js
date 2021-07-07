const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log("Session user", req.session.user);
    console.log("DeliveryInfo ", req.session.deliveryInfo);
    
    res.render('home', {
        title: 'Home',
        user: req.session.user,
        linkActive: 'home'
    });
});

module.exports = router;