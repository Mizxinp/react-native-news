const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let collectioniSchema = new Schema({
	'user_id':String,
	'type':String,
	'nationalCollection':[
		{
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
		}
	],
	"foreignCollection":[
		{
			"source": {
        "id": String,
        "name": String
      },
      "author": String,
      "title": String,
      "description": String,
      "url": String,
      "urlToImage": String,
      "publishedAt": String,
      "content": String
		}
	]
})

module.exports = mongoose.model('Collection',collectioniSchema);

