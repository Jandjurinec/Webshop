const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.user === undefined) {
        res.render('login', {
            linkActive: 'login',
            user: req.session.user,
            err: "Please login to view requested page!"
        });
        return;
    }
    req.session.user=req.session.cart = undefined;
    req.session.destroy(error => {
        if(error) console.error(error);
        else res.redirect('./');
    })
});

module.exports = router;