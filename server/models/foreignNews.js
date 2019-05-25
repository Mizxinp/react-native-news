const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ForeignnewsListSchema = new Schema({
	"general":[
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
	],
	"science":[
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
	],
	"sports":[
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
	],
	"technology":[
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
	],
	"entertainment":[
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

module.exports = mongoose.model('Foreign_news',ForeignnewsListSchema);
