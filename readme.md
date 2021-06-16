The query evaluation in chapter-1 needs us to load the "validation lab" files

```
var pipeline = [
  {
    $match: {
      "imdb.rating": { $gte: 7 },
      $nor: [{“genres”: “Crime”}, {“genres”: “Horror”}],
      $or:[{"rated":"PG"},{"rated":"G"}],
      $or:[{"languages":"English" },{"languages":"Japanese" }]
    },
  },
]
```

```
db.movies.aggregate([
  {
    "$match": {
      "imdb.rating": { "$gte": 7 },
      $nor: [{“genres”: “Crime”}, {“genres”: “Horror”}],
      $or:[{"rated":"PG"},{"rated":"G"}],
      $or:[{"languages":"English" },{"languages":"Japanese" }]
    },
  },
])
```

```
var pipeline = [{
	"$match":{
		“imdb.rating”: {"$gte": 7},
		“genres”: {"$nin": [“Horror”, “Crime”]},
		“rated”: {"$in": [“PG”, “G”]},
		“languages”: {"$in": [“English”, “Japanese”]} }}]
```

db.movies.aggregate([{
$match: {
		{“imdb.rating”: {$gte: 7}},
{“genres”: {$nin: [“Horror”, “Crime”]}},
		{“rated”: {$in: [“PG”, “G”]}},
{“languages”: {$in: [“English”, “Japanese”]}}
}
}])

db.movies.aggregate([{
"imdb.rating":{$gte:7},
$nor:[{genres:"Crime"},{genres:"Horror"}]
}])

db.movies.find({
"imdb.rating":{$gte:7},
  $nor:[{genres:"Crime"},{genres:"Horror"}],
  “rated”: {$in: [“PG”, “G”]},
“languages”: {$in: [“English”, “Japanese”]}
}).count()

```
db.movies.aggregate([{
	"$match":{
		“imdb.rating”: {"$gte": 7},
		“genres”: {"$nin": [“Horror”, “Crime”]},
		“rated”: {"$in": [“PG”, “G”]},
		“languages”: {"$in": [“English”, “Japanese”]} }}]).itcount()
```

var pipeline = [{"$match":{“imdb.rating”: {"$gte": 7}}}]

var pipeline = [{
$match : {
		'imdb.rating':{$gte: 7},
'genres': {$nin': ['Horror', 'Crime']}
}
}]

'rated': {$in: ['PG', 'G']},
		'languages': {$in: [“English”, “Japanese”]}

var pipeline = [{ $match : { 'imdb.rating':{$gte: 7}, 'genres': {$nin': ['Horror', 'Crime']}}}]
