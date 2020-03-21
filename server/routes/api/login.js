const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/userAuth");
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/userData");

// @route GET api/login
// @access Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("_id name email transactions");
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

// @route POST api/login
// @desc Authenticate user & get token
// @access Public
router.post(
	"/",
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password is required").exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			// Check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}
			// Match the password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid credentials" }] });
			}

			// Return jsonwebtoken
			const payload = {
				user: {
					id: user.id
				}
			};
			jsonwebtoken.sign(
				payload,
				config.get("JWTKEY"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;