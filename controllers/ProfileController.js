var Profile = require('../models/Profile'),
	bcrypt = require('bcrypt');

module.exports = {

	get: function(params, completion){
		Profile.find(params, function(err, profiles){
			if (err){
				completion(err, null);
				return;
			}

			var list = [];
			for (var i=0; i<profiles.length;i++){
				list.push(profiles[i].summary());
			}

			completion(null, list);
			return;
		});
		return;
	},

	//CREATE
	register: function(params, completion){
		var hashedPassword = bcrypt.hashSync(params['password'],10);
		params['password'] = hashedPassword;

		Profile.create(params, function(err, profile){
			if (err){
				completion(err, null);
				return;
			}
			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			sendgrid.send({
				to: profile.email,
				from: 'robertchanny@gmail.com',
				fromname: 'Ribber',
				subject: 'WECOME TO MY APP',
				text: 'This is the welcome message!'
			}, function(err, json){
				if(err){
					completion(err,null);
					return;
				}
				completion(null, profile.summary());
				return;
			});
			return;
		});
		return;
	},

	login: function(params, completion){
		Profile.findOne({email: params.email}, function(err, profile){
			if (err){
				completion(err.message, null);
				return;
			}

			if (profile == null){
				completion('Profile with specified email not found', null);
				return;
			}

			var passwordCorrect = bcrypt.compareSync(params.password, profile.password); //second param is the hash - this returns a Boolean

			if (!passwordCorrect){
				completion('Invalid password', null);
				return;
			}
			completion(null, profile.summary());
			return;
		});
		return;
	},

	//SHOW
	getById: function(params, completion){
		Profile.findById(params, function(err, profile){
			if (err){
				completion(err.message, null);
				return;
			}

			if (profile==null){
				completion('Weird MongoDB error sorry my bad', null);
				return;
			}

			completion(null, profile.summary());
			return;
		});
		return;
	},

	update: function(id, params, completion){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if(err){
				completion(err.message, null);
				return;
			}
			completion(null, profile.summary());
			return;
		});
		return;
	}

}