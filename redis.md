## Redis

After installation, run `redis-server` to start the server. The default port is 6379.

To check it, you can run `redis-cli ping` and it should return `PONG`.

To save key/value pairs, after opening the redis server, run the `redis-cli` command to start the cli.

Then, for instance, to set a name `SET name murat` and to get it `GET name`. Note: you can use `set` and `get` commands in lowercase as well.

They're all saved in strings.

### Deleting

`del age` will delete the key/value pair. If I wanted to get the deleted value, it'll return (nil)

### checking if it exists

`exists name` will return 1 if it exists, 0 if it doesn't.

### get all keys

`KEYS *` will return all keys.

### delete all keys

`FLUSHALL` will delete all keys.

### expiration dates

`EXPIRE name 10` will set the expiration date of the key/value pair to 10 seconds. After 10 seconds, it'll be deleted.

I can check it with `TTL name` which will return the remaining time in seconds.

`setex name 10 murat` will set the key/value pair and set the expiration date to 10 seconds.

### lists

`lpush friends murat` will add `murat` to the list `friends`. `lpush friends ali` will add `ali` to the list `friends`.

To get the list, `lrange friends 0 -1` will return all the list.

you can also use `rpush` to add to the end of the list.

And `lpop` to remove the first element of the list. `rpop` to remove the last element of the list.

### sets

in sets all values are unique.

`sadd hobbies "weight lifting" ` will add `weight lifting` to the set `hobbies`. `

To get all the values inside of that hobbies set, `smembers hobbies` will return all the values.

### hashes

are like objects to some sense.

`kset person name murat` will add the key/value pair `name: murat` to the hash `person`.
`hget person name` will return `murat`.
`hgetall person` will return all the key/value pairs inside of the hash `person`.
`hset person age 31` will add the key/value pair `age: 31` to the hash `person`.
`hdel person age` will delete the key/value pair `age: 31` from the hash `person`.
`hexists person age` will return 1 if the key/value pair exists, 0 if it doesn't.

# In nodeJS app

`npm i redis`

`const redis = require('redis')`

`const client = redis.createClient()`
//if you're pushing to the production, you should use the redis url
`const client = redis.createClient(process.env.REDIS_URL)`

inside the app,
`client.set('name', 'murat')` will set the key/value pair `name: murat` to the redis server.
 