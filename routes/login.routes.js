const express = require('express');
const { fetchByUsername } = require('../models/UserModel');
const router = express.Router();
const User = require('../models/UserModel')

router.get('/', function (req, res, next) {

    //vrati login stranicu
    let err = req.session.err; 
    req.session.err=undefined;

    res.render('login', {
        linkActive: 'login',
        user: req.session.user,
        err: err
    });
});

router.post('/', function (req, res, next) {

    //postupak prijave korisnika
    // console.log(req.body.user);
    (async () => {
        let newUser = await fetchByUsername(req.body.user);
        let password = req.body.password;

        // console.log(JSON.stringify(newUser));
        if (newUser.isPersisted()) {
            // console.log("persisted");

            if (newUser.checkPassword(password)) {
                req.session.user = newUser;
                res.redirect('./');
            } 
        }
        res.render('login', {
            linkActive: 'login',
            user: req.session.user,
            err: "User does not exist or incorrect password."
        })
        return;
    })();
});

module.exports = router;