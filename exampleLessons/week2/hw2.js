// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/test', function(err,db){
// if (err) throw err;
	
// 	var weather = db.collection("weather_data");
// 	// var cursor = weather.find({});
// 	var query = {};

// 	// cursor.sort([{"State":1},{"Temperature":-1}]);
// 	// var sort = {"State":1,"Temperature":-1}

// 	weather.find(query, function (err,data){
// 		if(err) throw err;
// 		console.dir(data);
// 		db.close();
// 	});
// });



var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err,db){
	if (err) throw err;

	var cursor = db.collection("data").find({});
	var operator = {$set:{"month_high":true}};
	cursor.sort([{"State":1},{"Temperature":-1}])

	// db.collection('weather_data').find(query, function(err,doc){
	// 	if(err) throw err;

	// 	console.dir(doc);
	// 	db.close;
	// })
	var prevState = null;

	cursor.each(function(err,doc){
		if(err) throw err;
		if(doc == null) return db.close();
		if(doc.State != prevState){
			// console.log("helloWorld");
			prevState = doc.State;
			console.log(doc);
			db.collection("data").update({"_id":doc._id},operator);
			// doc.update({"_id"{$exists:true}},$set{"month_high":true});
		}
		// console.dir(doc);
	})
})