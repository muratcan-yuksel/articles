## Mongoose

Install via `npm install mongoose`

## Mongodb locally

Follow this =>

```
Here is what I did to install.

As the package is not available in the official Arch repositories and can't be installed using pacman, you need to follow a few steps to install it.

First, you need to get the URL for the repo of prebuilt binaries from AUR. It can be found here and by the time of writing this it was https://aur.archlinux.org/mongodb-bin.git

Simply clone the repo in your home directory or anywhere else. Do git clone https://aur.archlinux.org/mongodb-bin.git, then head to the cloned directory, cd mongodb-bin.

Now, all you need to do is to run makepkg -si command to make the package. the -s flag will handle the dependencies for you and the -i flag will install the package.

After makepkg finishes its execution, don't forget to systemctl start mongodb.service. Run systemctl start mongodb and if needed enable it with systemctl enable mongodb.

Type mongo in the terminal and if the Mongo Shell runs you are all set.
```

### BUT THERE'A AN IMPORTANT DETAIL THAT COST ME HOURS! =>

`mongo` command doesn't work anymore, `mongosh` does.

## Q & A

Murat
I'm following a tutorial that uses mongodb atlas. I don't want to use that. I want to use local mongodb I've installed. I will follow that tutorial but use the local version of the db. Now, how do I create a new mongodb database and a collection to it?

AI=>
To create a new MongoDB database and a collection within it, you will need to connect to the MongoDB server using the mongo shell. You can do this by running the mongo command in your terminal or command prompt. Once you are connected to the server, you can use the following steps to create a new database and collection:

To create a new database, you can use the use command followed by the name of the database you want to create. For example, to create a database named "my_database", you would run the following command:
Copy code
use my_database
Once you have created the database, you can create a new collection within it using the db.createCollection() method. This method takes the name of the collection as its argument. For example, to create a collection named "my_collection" within the "my_database" database, you would run the following command:
Copy code
db.createCollection("my_collection")
You can verify that the database and collection were created successfully by running the show dbs command, which will display a list of all the databases on the server. You should see the "my_database" database listed in the output.

To switch to the "my_database" database and access the "my_collection" collection, you can use the use command again, followed by the name of the database. Then, you can access the collection using the db variable, followed by the name of the collection. For example:

Copy code
use my_database
db.my_collection
Once you have created the database and collection, you can use the db variable to insert, update, and query documents within the collection. For more information and examples of working with MongoDB collections, you can refer to the MongoDB documentation.

## Mongodb compass

Install it via aur

open the application and connect to the local mongodb server

the default server is => "localhost:27017" in the "Hostname" field.

Now, I can see the databases and collections I created in the terminal. It's crazy.

## Virtual properties

Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage. The example in the documentation constructs (and deconstructs) a full name virtual property from a first and last name field, which is easier and cleaner than constructing a full name every time one is used in a template.
