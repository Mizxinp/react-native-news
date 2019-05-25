const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ForeignDetailSchema = new Schema({
	"detail_source": String,
	"media_user": {
		"screen_name": String,
		"no_display_pgc_icon": Boolean,
		"avatar_url": String,
		"id": String,
		"user_auth_info": {
			"auth_type": String,
			"auth_info": String
		}
	},
	"publish_time": Number,
	"hotwords": Array,
	"title": String,
	"url": String,
	"labels": Array,
	"impression_count": String,
	"is_original": Boolean,
	"is_pgc_article": Boolean,
	"content": String,
	"source": String,
	"comment_count": Number,
	"logo_show_strategy": String,
	"creator_uid": Number,
	"content_id":Number,
	"comments":Array
	
})

module.exports = mongoose.model('Foreign_details',ForeignDetailSchema);

/* {
	"_id" : ObjectId("5ca3075d14b08f261450a965"),
	"user" : "admin",
	"pwd" : "facea44ae73be1feda341d13ebfa5004",
	"type" : "genius",
	"__v" : 0
} */