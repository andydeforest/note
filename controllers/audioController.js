const path = require('path');
const fs = require('fs');
const mm = require('music-metadata');
const async = require('async');

const validExtensions = ['.mp3'];

module.exports = {

	list: function(req, res, next) {
		let files = fs.readdirSync('./music/');
		let songs = [];

		async.each(files, (file, cb) => {
			if(validExtensions.includes(path.extname(file))) {
				mm.parseFile(path.resolve('./music/' + file)).then(metadata => {
					metadata.filename = file;
					songs.push(metadata);
					cb();
				});
			}
		}, (err) => {
			if(err) {
				return res.send({success: false, message: err.message});
			}
			return res.send({success:true, songs: songs});
		});


	},

	play: function(req, res, next) {
		let filepath = req.body.filepath;
		return res.send({test: req.body.filepath})
	},

	update: function(req, res, next) {
		
		return res.send({test: "hi"});
	}

};
