const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	transactions : { 
		type : Array, 
		default : []
	},
	password: {
		type: String,
		required: true
	},
	resetPasswordToken: {
        type: String,
        required: false
    },
    resetPasswordExpires: {
        type: Date,
        required: false
    }
});

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.resetPasswordExpires = Date.now() + 172800000; //expires in two days
};

module.exports = User = mongoose.model("user", UserSchema);