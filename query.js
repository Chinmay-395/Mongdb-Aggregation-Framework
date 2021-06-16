/** Chapter-1 Homework */
var pipeline = [
  {
    $match: {
      'imdb.rating': { $gte: 7 },
      $nor: [{ genres: 'Crime' }, { genres: 'Horror' }],
      $or: [{ rated: 'PG' }, { rated: 'G' }],
      $and: [{ languages: 'English' }, { languages: 'Japanese' }],
    },
  },
]
// Chapter-1 Quiz-2
var pipeline = [
  {
    $match: {
      'imdb.rating': { $gte: 7 },
      $nor: [{ genres: 'Crime' }, { genres: 'Horror' }],
      $or: [{ rated: 'PG' }, { rated: 'G' }],
      $and: [{ languages: 'English' }, { languages: 'Japanese' }],
    },
  },
  { $project: { title: 1, rated: '$imdb.rating', _id: 0 } },
]

// Chapter-1 Lab
var exp_temp = [
  {
    $project: {
      _id: 0,
      title: 1,
      splitTitleSize: { $size: { $split: ['$title', ' '] } },
    },
  },
  {
    $match: {
      splitTitleSize: 1,
    },
  },
]
// chapter-1 practice
var x = [
  {
    $project: {
      _id: 1,
      title: 1,
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' ('],
              },
              0,
            ],
          },
        },
      },
      cast: 1,
      _id: 0,
    },
  },
  {
    $match: {
      title: 'Life Is Beautiful',
    },
  },
]

// Chapter-1: Optional Lab - Expressions with $project
/**
 * step-1: get a list of all the casts directors and writers
 * step-2: find out common names in those 3 arrays for a particular movie
 * step-3:
 */

// initially I need to figure out get the writers

db.movies.aggregate([
  {
    $match: {
      cast: { $elemMatch: { $exists: true } },
      directors: { $elemMatch: { $exists: true } },
      writers: { $elemMatch: { $exists: true } },
    },
  },
  {
    $project: {
      _id: 0,
      cast: 1,
      directors: 1,
      writers: {
        $map: {
          input: '$writers',
          as: 'writer',
          in: {
            $arrayElemAt: [
              {
                $split: ['$$writer', ' ('],
              },
              0,
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      labor_of_love: {
        $gt: [
          { $size: { $setIntersection: ['$cast', '$directors', '$writers'] } },
          0,
        ],
      },
    },
  },
  {
    $match: { labor_of_love: true },
  },
  {
    $count: 'labors of love',
  },
])

// Chapter 2: Basic Aggregation - Utility Stages

/**
 * step-1: FILTERING 
   ------> country 👉 USA
   ------> ratings 👉 >=3
 * step-2: calculating the number of favourites in cast
   ------> num_favs 👉 ["Sandra Bullock","Tom Hanks","Julia Roberts","Kevin Spacey","George Clooney"]
 * step-3: SORTING
   ------> num_favs, tomatoes.viewer.rating, and title in descending order  
 * 
 */
var favorites = [
  'Sandra Bullock',
  'Tom Hanks',
  'Julia Roberts',
  'Kevin Spacey',
  'George Clooney',
]
db.movies.aggregate([
  {
    $match: {
      cast: { $in: favorites },
      countries: 'USA',
      'tomatoes.viewer.rating': { $gte: 3 },
    },
  },
  {
    $project: {
      fav_cast: {
        $setIntersection: ['$cast', favorites],
      },
      num_favs: {
        $size: {
          $setIntersection: ['$cast', favorites],
        },
      },
      title: 1,
      'tomatoes.viewer.rating': 1,
    },
  },
  { $match: { num_favs: { $gte: 1 } } },
  { $sort: { num_favs: -1, 'tomatoes.viewer.rating': -1, title: -1 } },
  { $skip: 20 },
  {
    $project: {
      title: 1,
      fav_cast: 1,
      num_favs: 1,
      'tomatoes.viewer.rating': 1,
      _id: 0,
    },
  },
])

// { $match: { num_favs: { $gte: 1 } } },
// { $skip: 24 },
// title: -1
