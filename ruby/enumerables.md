## are like array methods in JS

imagine you have the following code:

```
friends = ['Sharon', 'Leo', 'Leila', 'Brian', 'Arun']
invited_list = []
//note that this "do" is optional in ruby
for friend in friends do
  if friend != 'Brian'
  invited_list.push(friend)
  end
end

invited_list #=> ["Sharon", "Leo", "Leila", "Arun"]
```

## select method

this can be written as follows with the select method:

```
friends = ['Sharon', 'Leo', 'Leila', 'Brian', 'Arun']
friends.select{|friend| friend!= "Brian"}
```

## reject method

the same code can be written as follows:

```
friends.reject{|friend| friend== "Brian"}
```

## the eact method

friends = ['Sharon', 'Leo', 'Leila', 'Brian', 'Arun']

friends.each { |friend| puts "Hello, " + friend }

#=> Hello, Sharon
#=> Hello, Leo
#=> Hello, Leila
#=> Hello, Brian
#=> Hello, Arun

#=> ["Sharon", "Leo", "Leila", "Brian" "Arun"]

## do...end instead of {...}

if the logic require more lines, we use do...end instead of {...}

```
my_array = [1, 2]

my_array.each do |num|
  num *= 2
  puts "The new number is #{num}."
end

#=> The new number is 2.
#=> The new number is 4.

#=> [1, 2]
```

## each with hashes

```
my_hash = { "one" => 1, "two" => 2 }

my_hash.each { |key, value| puts "#{key} is #{value}" }

one is 1
two is 2
#=> { "one" => 1, "two" => 2}

my_hash.each { |pair| puts "the pair is #{pair}" }

the pair is ["one", 1]
the pair is ["two", 2]
#=> { "one" => 1, "two" => 2}
```

## The each_with_index Method

```
fruits = ["apple", "banana", "strawberry", "pineapple"]

fruits.each_with_index { |fruit, index| puts fruit if index.even? }

#=> apple
#=> strawberry
#=> ["apple", "banana", "strawberry", "pineapple"]
```

## map method

like in JS
The #map method (also called #collect) transforms each element from an array according to whatever block you pass to it and returns the transformed elements in a new array.

the following code wouldn't work in #each method as #each does not return a new array but the original array that it was called upon. So:

```
friends = ['Sharon', 'Leo', 'Leila', 'Brian', 'Arun']

friends.map { |friend| friend.upcase }
#=> `['SHARON', 'LEO', 'LEILA', 'BRIAN', 'ARUN']`
```

another e.g.

```
salaries = [1200, 1500, 1100, 1800]

salaries.map { |salary| salary - 700 }
#=> [500, 800, 400, 1100]
```
