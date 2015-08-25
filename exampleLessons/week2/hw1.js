db.weather_data.find(
	{"Wind Direction":{$gt:180,$lt:360}},
	{"State":1,"Temperature":1,"_id":0}).sort(
	{"Temperature":1}).pretty();