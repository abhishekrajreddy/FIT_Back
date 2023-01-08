const express = require("express");
const router = express.Router();
const Users = require("./../models/Users");
const jwt = require("jsonwebtoken");
const privateKey = require("./../config/keys").privateKey;
const bcryptjs = require("bcryptjs");

////////////////////// REGISTER  //////////////////////////////
router.post("/register", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((data) => {
      console.log(data);
      if (data) {
        console.log(data);
        res.status(400).json({ msg: "User Already Exist" });
      } else {
        console.log("else register");
        let user = new Users({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            user.password = hash;
            user
              .save()
              .then(() => {
                res.status(200).json({ msg: "User Registered Succesfully" });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

////////////////////// LOGIN  //////////////////////////////

router.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ msg: "User Invalid" });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              const payload = {
                id: user._id,
                email: user.email,
                password: user.password,
              };

              jwt.sign(payload, privateKey, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              });
            } else {
              res.status(400).json({ msg: "Password Invalid" });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
