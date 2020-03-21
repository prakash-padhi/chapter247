const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { check, validationResult } = require("express-validator");
const User = require("../../models/userData");

const dotenv = require("dotenv");
dotenv.config();


// @route GET api/login
// @access Private
router.get("/reset/:token", async (req, res) => {
	try {
		User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
        .then((user) => {
            if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

            //Redirect user to form with the email address
            res.json({ successMsg: 'Success' });
        })
        .catch(err => res.status(500).json({message: err.message}));
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});


// @route POST api/resetPassword
// @desc Authenticate user & get token
// @access Public
router.post(
	"/",
	[
		check("email", "Please enter a valid email").isEmail(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email } = req.body;
		try {
			// Check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User doesn't exists" }] });
            }
            user.generatePasswordReset();
            await user.save();
            let link = "http://" + req.headers.host + "/resetPassword/" + user.resetPasswordToken;
            //Send mail using sendgrid
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msgOptions = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: 'Reset Password',
            html: `<p>Hi <strong>${user.name}</strong></p><br>
            <p>Please click on the following link ${link} to reset your password.</p><br>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
            };
            //ES8
            (async () => {
                try {
                    await sgMail.send(msgOptions);
                    res.status(200).json({ successMsg: 'A reset link has been sent to ' + user.email + '.' });
                } 
                catch (err) {
                    console.error(err.toString());
                }
            })();
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;