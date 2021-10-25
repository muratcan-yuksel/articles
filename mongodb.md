### documents

in mongodb are basically objects in JS

### what is Atlas?

Atlas is:
-my database in the cloud for this course and beyond
-Mongodb is used at the core of atlas for data storage and retrieval
-database as a service

#### atlas services

-manage cluster creation
-run and maintain database deployment
-use cloud service provider of your choice

### clusters

Atlas users can deploy clusters, that are groyps of servers that store data

### replica set

a few connected mongodb instances that store the same data

### Instance

is a single machine locally or in the cloud, running a certain software

## in the terminal

### show dbs

shows the list of databases in the cluster

### choose a database

by
1)use name-of-the-db
2)show collections
collections listed

3- db.collectionName.find({"state":"somewhere})

### next page

with the 'it' command (from iterate

### how many from a query?

by adding count() method to the end of db.collectionName.find({"state":"somewhere})

### to make it readable

add .pretty() to the end of your query

## adding an empty query

would result on the display of the first 20 objects, unorgonized

## inserting documents

every document must have a unique underscore + id like so => {`_id`:}
there's this ObjectId() thing, dunno what's it exactly. Check this out => https://docs.mongodb.com/manual/reference/method/ObjectId/#objectid

## inserting documents via mongo shell

insert() method

### steps to insert doc via mongo shell

1. connect to atlas
2. choose the collection via => use collectionName
3. db.documentName.findOne() => I guess it gives a random one. It's usually useless tho'.
4. copy this random document
5. db.documentName.insert(copied_document)

## inserting docs with order (inserting multiple docs)

e.g.
after insert, we use an array to insert multiple docs
db.documentName.insert([{"test":1},{"test":2},{"test":3}], {"ordered": false})=> see that, ordered key is added AFTER the array
this ordered key works in such a way: if there's a duplicate `_id` in the process of the array, the default behavior is that the insertion halts. With the ordered:false, everything else except the duplicate `_id` gets added.
-to create a database or collection, just write the name of the new collection or database, it'll be automatically created

## updating documents via mongo shell

we call the Mongodb query language MQL
-to update one => updateOne()
-to update many=> updateMany()
we use "$inc" command, I have a SS for it. ıt's long to write
that increments. But we can use another method too: we can use "$set" method which sets the value as we've specified.
"$push" operator will add a section to the array.

- $inc e.g. => db.zips.updateMany({ "city": "HUDSON" }, { "$inc": { "pop": 10 } })

-$set e.g.=> db.zips.updateOne({ "zip": "12534" }, { "$set": { "pop": 17630 } })

## deleting documents

-deleteOne()
-deleteMany()
work in a similar way to update values.

## delete collection

-show collections
-db.collectionName.drop()

# username and pass for the course at hand

username: m001-student
password: m001-mongodb-basics

## query operators

### comparison operators

$eq=> equal to
$ne => not equal to
$gt=> greater than
$lt => less than
$gte=> greater than or equal to
$lte=> less than or equal to
e.g. {"tripduration": {"$lte":70}}
so it is => {field: {operator:value}}

### a wholesome query example

-use sample_training
db.trips.find({"tripduration":{"$lte" : 70}, "usertype": {"$ne": "Subscriber"}})

e.g. => db.trips.find({"birth year":{"$eq": 1998}}).count() => 12
db.trips.find({"birth year":{"$gt": 1998}}).count()=> 18

## logic operators

$and => math ALL of the specified query clauses
$or at least one of the query clauses is matched
$nor fail to match both given clauses
=>=> template=> {poperator: [{statement1}, {statement2}, ...]}
$not negates the query requirement
//$not is a bit different than the others in terms of its template
=>=> template=> {$not: {statement}}

## implicit $and operator

$and is used as the default operator when an operator is not specified

## explicit $and operator

is used when you need to include the same operator more than once
{"$and": [{queries divided by a comma}]}

### through example with explicit $and operator

db.routes.find({ "$and": [ { "$or" :[ { "dst_airport": "KZN" },
{ "src_airport": "KZN" }
] },
{ "$or" :[ { "airplane": "CR2" },
{ "airplane": "A81" } ] }
]}).pretty()

## expressive $expr operator

$expr allows the use of aggreation expressions within the query language
the syntax=> {$expr:{expressions}}
can be used to compare stuff.

### $ sign

-can denote the use of an operator
-can address the field value, like $end station. It directly takes the value of that field.

#### continuing with $expr

e.g. db.trips.find({ "$expr": { "$eq": [ "$end station id", "$start station id"] }
}).count()

another e.g.
db.trips.find({ "$expr": { "$and": [ { "$gt": [ "$tripduration", 1200 ]},
{ "$eq": [ "$end station id", "$start station id" ]}
]}}).count()

## array operators

we already know `$push`operator
-now we have `$all`
-and `$size` . it retuns a cursor with all docs where the specified array field is exactly the given length
e.g.
db.listingsAndReviews.find({ "amenities": {
"$size": 20,
                                  "$all": [ "Internet", "Wifi", "Kitchen",
"Heating", "Family/kid friendly",
"Washer", "Dryer", "Essentials",
"Shampoo", "Hangers",
"Hair dryer", "Iron",
"Laptop friendly workspace" ]
}
}).pretty()

## array operators and projection

In the case of a data having many fields, I can specify exactly wich fields I want to see with projection.
The syntax=> db.collection.find({query}, {projection})

1- includes the field
0- excludes the field
you cannot mix 0s and 1s. i.e. use only 1s or 0s in a query

---

e.g. db.listingsAndReviews.find({ "amenities":
{ "$size": 20, "$all": [ "Internet", "Wifi", "Kitchen", "Heating",
"Family/kid friendly", "Washer", "Dryer",
"Essentials", "Shampoo", "Hangers",
"Hair dryer", "Iron",
"Laptop friendly workspace" ] } },
{"price": 1, "address": 1}).pretty()

---

another e.g.
db.listingsAndReviews.find({ "amenities": "Wifi" },
{ "price": 1, "address": 1, "\_id": 0 }).pretty()

### $elemMatch

is used to get elements from an array.
e.g.
db.grades.find({ "scores": { "$elemMatch": { "type": "extra credit" } }
}).pretty()

## querying arrays and subdocuments

we use a dot notation. Very basic, like getting a key in JS objects.
e.g.
db.trips.findOne({ "start station location.type": "Point" })

## aggregation framework

is an another way to query data in mongodb
there's $match and $group and $sum
THERE'S A WHOLE MONGODB UNI COURSE ON THIS. IT'S SUPER COOL.
e.g.
Using the aggregation framework find all documents that have Wifi as one of the amenities``*. Only include* ``price and address in the resulting cursor.
db.listingsAndReviews.aggregate([
                                  { "$match": { "amenities": "Wifi" } },
{ "$project": { "price": 1,
"address": 1,
"\_id": 0 }}]).pretty()

another e.g.
Project only the address field value for each document, then group all documents into one document per address.country value.
db.listingsAndReviews.aggregate([ { "$project": { "address": 1, "_id": 0 }},
{ "$group": { "_id": "$address.country" }}])

## sort() and limit()

e.g.
db.zips.find().sort({"pop":-1}).limit(10).pretty()
means => sort the ones with the most population and get the first 10 items (with limit)
see that we use a negative 1. That reverses the order.
Normal order is an ascending one.

## indexes

db.trips.createIndex({ "birth year": 1 })

db.trips.createIndex({ "start station id": 1, "birth year": 1 })

## data modeling

rule: data is stored in the way that it is used.

## upsert

everything in MQL that is used to LOCATE a document in a collection can also be used to modify this document.
db.collection.updateOne({query to locate}, {update})
=> upsert = update + insert
upsert's value is default to false, you can change it to true
if there's a match, it'll update
if not, it'll insert
