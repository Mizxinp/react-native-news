const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
	/* 'user':{'type':String, 'require':true},
	'pwd':{'type':String, 'require':true},
	'type':{'type':String, 'require':true},
	'avatar':{'type':String},
	'desc':{'type':String},
	'title':{'type':String},
	'company':{'type':String},
	'money':{'type':String} */
	"single_mode": Boolean,
	"abstract": String,
	"middle_mode": Boolean,
	"more_mode": Boolean,
	"tag": String,
	"has_gallery": Boolean,
	"tag_url": String,
	"title": String,
	"has_video": Boolean,
	"chinese_tag": String,
	"source": String,
	"group_source": Number,
	"comments_count": Number,
	"media_url": String,
	"media_avatar_url": String,
	"video_duration_str": String,
	"source_url": String,
	"article_genre": String,
	"is_stick": Boolean,
	"item_id": String,
	"is_feed_ad": Boolean,
	"video_id": String,
	"behot_time": Number,
	"image_url": String,
	"video_play_count": Number,
	"group_id": String,
	"middle_image": String
})

module.exports = mongoose.model('User',userSchema);

/* {
	"_id" : ObjectId("5ca3075d14b08f261450a965"),
	"user" : "admin",
	"pwd" : "facea44ae73be1feda341d13ebfa5004",
	"type" : "genius",
	"__v" : 0
} */