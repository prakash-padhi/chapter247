const express = require("express");
const router = express.Router();
const auth = require("../../middleware/userAuth");
const stripe = require("stripe")("sk_test_9ySfWg1N0OCnh6LnJ9Lllv5l00xVsvDWEG");
const { v4: uuidv4 } = require('uuid');


const User = require("../../models/userData");


// @route POST api/checkout
// @desc Authenticate user & get token
// @access Private
router.post("/", auth, async (req, res) => {
  
    let error;
    let status;
    try {
      const { cartData, token } = req.body;
      console.log("From middleware" + " " + req.user.id);
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: cartData.cartAmount * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the multiple Products`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
            idempotencyKey
        }
      );
      status = "success";
        var query = { _id: req.user.id };
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd;
        } 
        if(mm<10) {
            mm='0'+mm;
        }
        var TodayDate = mm+'-'+dd+'-'+yyyy;
        var newvalues = { $push: { transactions: { finalAmount: cartData.cartAmount, transactionDate: TodayDate, paymentDetails: token.card, cartData: cartData.cart } } };
        User.updateOne(query, newvalues, function (err, res) {
            if (err) console.log(err);
        });  

    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
    res.json({ error, status });
  });

module.exports = router;