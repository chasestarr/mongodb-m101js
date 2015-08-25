var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err,db){
	if (err) throw err;

	var cursor = db.collection("students").find({});

	// var count = 1;
	var index = 10;

	cursor.each(function(err,doc){
		if(err) throw err;
		if(doc == null) return db.close();
		
		var min = 100;
		
		var scoreList = doc.scores;

		for(var i=0;i<scoreList.length;i++){
			if(scoreList[i].type == "homework"){

				var scoreNum = scoreList[i].score;
				if(scoreNum < min){
					min = scoreNum;
					index = i;
				}
				if(i == scoreList.length -1){
					// console.log(min);
					console.log(index);
					// console.log(doc._id);
					// db.collection("students").update(doc,{$pull:{scores:index}});
					db.collection('students').update(doc,{$pull:{scores:scoreList[index]}});
					
				}
				// count++;
				// console.log(count);
			}
			
			
		}
		// db.collection("students").update(doc,{$pull:{"scores":index}});

	});
});




