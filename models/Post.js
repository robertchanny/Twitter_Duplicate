var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	content:{type:String,default:''},
	posterId:{type:String,default:''},
	posterFirstName:{type:String,default:''},
	posterLastName:{type:String,default:''},
	timestamp:{type:Date,default:Date.now}
});

postSchema.methods.summary = function(){
	var summary = {
		content:this.content,
		posterId:this.posterId,
		posterFirstName:this.posterFirstName,
		posterLastName:this.posterLastName,
		timestamp:this.timestamp,
		id:this._id
	}
	return summary;
}

module.exports = mongoose.model('postSchema', postSchema);