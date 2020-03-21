const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/userData");

// @route POST api/register
// @desc Register user
router.post("/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			// See if user exists
			let userExists = await User.findOne({ email });
			if (userExists) {
				return res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}
			user = new User({
				name,
				email,
				password
			});

			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			// SEND RESPONSE
			res.status(200).json({ successMsg: "Registered successfully. Please login...!" });
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;