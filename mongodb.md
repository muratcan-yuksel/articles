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

every document must have a unique underscore + id like so => {"\_id":}
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
