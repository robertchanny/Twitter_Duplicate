var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	firstName:{type:String, default:''},
	lastName:{type:String, default:''},
	email:{type:String, default:''},
	password:{type:String, default:''},
	timestamp:{type:Date, default:Date.now}
});

ProfileSchema.methods.summary = function(){
	var summary = {
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		timestamp: this.timestamp,
		id: this._id
	}

	return summary;
};

module.exports = mongoose.model('ProfileSchema', ProfileSchema);