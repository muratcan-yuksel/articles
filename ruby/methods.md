are functions

## creatinga method

def my_name
"Joe Smith"
end

puts my_name #=> "Joe Smith"

## parameters and arguments

def greet(name)
"Hello, " + name + "!"
end

puts greet("John") #=> Hello, John!

in the example above, name is a parameter and "John" is an argument.

## default parameters

def greet(name = "stranger")
"Hello, " + name + "!"
end

puts greet("Jane") #=> Hello, Jane!
puts greet #=> Hello, stranger!

## implicit return

Ruby is one of the few languages that offers implicit return for methods, which means that a Ruby method will return the last expression that was evaluated even without the return keyword. The last expression that was evaluated may or may not be the last line in the code, as you can see in the following example:

def even_odd(number)
if number % 2 == 0
"That is an even number."
else
"That is an odd number."
end
end

puts even_odd(16) #=> That is an even number.
puts even_odd(17) #=> That is an odd number.

## nice example

def even_odd(number)
unless number.is_a? Numeric
return "A number was not entered."
end

if number % 2 == 0
"That is an even number."
else
"That is an odd number."
end
end

puts even_odd(20) #=> That is an even number.
puts even_odd("Ruby") #=> A number was not entered.

## Predicate Methods

You will sometimes encounter built-in Ruby methods that have a question mark (?) at the end of their name, such as even?, odd?, or between?. These are all predicate methods, which is a naming convention that Ruby uses for methods that return a Boolean, that is, they return either true or false.

puts 5.even? #=> false
puts 6.even? #=> true
puts 17.odd? #=> true

puts 12.between?(10, 15) #=> true
