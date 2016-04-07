var Post = require('../models/Post');

module.exports = {
	get: function(params,completion){
		Post.find(params, function(err, posts){
			if(err){
				completion(err,null);
				return;
			}
			var list = [];
			for(var i=0;i<posts.length;i++){
				list.push(posts[i].summary());
			}
			completion(null,list);
			return;
		});
		return;
	},
	getById: function(params,completion){
		Post.findById(params, function(err,post){
			if(err){
				completion(err.message,null);
				return;
			}
			if(posts == null){
				completion('Post not found',null);
				return;
			}
			completion(null,post.summary());
			return;
		});
		return;
	},
	post: function(params,completion){
		Post.create(params, function(err,post){
			if(err){
				completion(err.message,null);
				return;
			}
			completion(null,post.summary());
			return;
		});
		return;
	}
}