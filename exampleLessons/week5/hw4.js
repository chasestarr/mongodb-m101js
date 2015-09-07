db.zips.aggregate([
    {$project:{
    	_id:0,
		first_char: {$substr : ["$city",0,1]},
		city:1,
		pop:1,
		state:1
     }},
     {$match:{
     	first_char:{$gte:"0",$lte:"9"}
     }},
     {$group:{
     	_id:null,
     	population:{$sum:"$pop"}
     }}
])