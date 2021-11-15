# To convert an integer to a float:

13.to_f #=> 13.0

# To convert a float to an integer:

13.0.to_i #=> 13
13.9.to_i #=> 13

# Some Useful Number Methods

There are many useful methods for numbers built into Ruby. For example,

## even?

6.even? #=> true
7.even? #=> false

## odd?

6.odd? #=> false
7.odd? #=> true

# Concatenation

In true Ruby style, there are plenty of ways to concatenate strings.

# With the plus operator:

"Welcome " + "to " + "Odin!" #=> "Welcome to Odin!"

# With the shovel operator:

"Welcome " << "to " << "Odin!" #=> "Welcome to Odin!"

# With the concat method:

"Welcome ".concat("to ").concat("Odin!") #=> "Welcome to Odin!"

# Substrings

You can access strings inside strings inside strings. Stringception! It’s super easy, too.

"hello"[0] #=> "h"

"hello"[0..1] #=> "he"

"hello"[0, 4] #=> "hell"

"hello"[-1] #=> "o"

# Escape characters

Escape characters allow you to type in representations of whitespace characters and to include quotation marks inside your string without accidentally ending it. As a reminder, escape characters only work inside double quotation marks.

\\ #=> Need a backslash in your string?
\b #=> Backspace
\r #=> Carriage return, for those of you that love typewriters
\n #=> Newline. You'll likely use this one the most.
\s #=> Space
\t #=> Tab
\" #=> Double quotation mark
\' #=> Single quotation mark

#

Introduction
Ruby is a strongly object-oriented language, which means that absolutely everything in Ruby is an object, even the most basic data types. We’ll start here with four of Ruby’s basic data types: numbers (integers and floats), strings, symbols, and Booleans (true, false, and nil).

For all of the examples throughout this lesson, feel free to follow along in irb or repl.it (an online REPL environment) to get a better feel for how they work.

Learning Outcomes
By the end of this lesson, you should be able to do the following:

List the basic arithmetic operators and what they do.
Describe the difference between an integer and a float and how to convert between the two.
Explain string interpolation and concatenation.
Describe what escape characters are, and list several examples.
Define what a symbol is and how it differs from a string.
Explain what the Booleans true, false, and nil represent.
Numbers
You probably already know what numbers are, so there’s no need to go into elaborate metaphors here. Ruby has all the typical math operators you would expect:

# Addition

1 + 1 #=> 2

# Subtraction

2 - 1 #=> 1

# Multiplication

2 \* 2 #=> 4

# Division

10 / 5 #=> 2

# Exponent

2 ** 2 #=> 4
3 ** 4 #=> 81

# Modulus (find the remainder of division)

8 % 2 #=> 0 (8 / 2 = 4; no remainder)
10 % 4 #=> 2 (10 / 4 = 2 with a remainder of 2)
Integers and Floats
There are two main types of numbers in Ruby. Integers are whole numbers, such as 10. Floats are numbers that contain a decimal point, such as 10.5, 10.0, or 0.25.

It’s important to keep in mind that when doing arithmetic with two integers in Ruby, the result will always be an integer.

17 / 5 #=> 3, not 3.4
To obtain an accurate answer, just replace one of the integers in the expression with a float.

17 / 5.0 #=> 3.4
Converting Number Types
Ruby makes it very easy to convert floats to integers and vice versa.

# To convert an integer to a float:

13.to_f #=> 13.0

# To convert a float to an integer:

13.0.to_i #=> 13
13.9.to_i #=> 13
As shown in the last example above, when Ruby converts a float to an integer, the decimal places are simply cut off. Ruby doesn’t do any rounding in this conversion.

Some Useful Number Methods
There are many useful methods for numbers built into Ruby. For example,

#even?

6.even? #=> true
7.even? #=> false
#odd?

6.odd? #=> false
7.odd? #=> true
Strings
Strings, strings, wonderful things, use them well and…your app will…grow wings? Or something.

At first glance, you might think that strings are just a bunch of characters that aren’t very useful beyond getting user input and outputting some information to the screen, but like Burt Reynolds passing up the chance to play Han Solo, you’d be wrong. Very wrong. What were you thinking, Burt?

Double and Single Quotation Marks
Strings can be formed with either double "" or single'' quotation marks, also known as string literals. They are pretty similar, but there are some differences. Specifically, string interpolation and the escape characters that we’ll discuss soon both only work inside double quotation marks, not single quotation marks.

Concatenation
In true Ruby style, there are plenty of ways to concatenate strings.

# With the plus operator:

"Welcome " + "to " + "Odin!" #=> "Welcome to Odin!"

# With the shovel operator:

"Welcome " << "to " << "Odin!" #=> "Welcome to Odin!"

# With the concat method:

"Welcome ".concat("to ").concat("Odin!") #=> "Welcome to Odin!"
Classic Ruby!

# Substrings

You can access strings inside strings inside strings. Stringception! It’s super easy, too.

"hello"[0] #=> "h"

"hello"[0..1] #=> "he"

"hello"[0, 4] #=> "hell"

"hello"[-1] #=> "o"
Escape characters
Escape characters allow you to type in representations of whitespace characters and to include quotation marks inside your string without accidentally ending it. As a reminder, escape characters only work inside double quotation marks.

\\ #=> Need a backslash in your string?
\b #=> Backspace
\r #=> Carriage return, for those of you that love typewriters
\n #=> Newline. You'll likely use this one the most.
\s #=> Space
\t #=> Tab
\" #=> Double quotation mark
\' #=> Single quotation mark

# Interpolation

String interpolation allows you to evaluate a string that contains placeholder variables. This is a very useful and common technique, so you will likely find yourself using this often. Be sure to use double quotes so that string interpolation will work!

name = "Odin"

puts "Hello, #{name}" #=> "Hello, Odin"
puts 'Hello, #{name}' #=> "Hello, #{name}"

# some cool string methods

"he77o".sub("7", "l") #=> "hel7o"

"he77o".gsub("7", "l") #=> "hello"

"hello".insert(-1, " dude") #=> "hello dude"

"hello world".delete("l") #=> "heo word"

"!".prepend("hello, ", "world") #=> "hello, world!"

# Converting other objects to strings

Using the to_s method, you can convert pretty much anything to a string. Here are some examples:

5.to_s #=> "5"

nil.to_s #=> ""

:symbol.to_s #=> "symbol"

# symbols

Strings can be changed, so every time a string is used, Ruby has to store it in memory even if an existing string with the same value already exists. Symbols, on the other hand, are stored in memory only once, making them faster in certain situations.
One common application where symbols are preferred over strings are the keys in hashes.

## Create a Symbol

To create a symbol, simply put a colon at the beginning of some text:

:my_symbol

# Getting Data from a User

assign "gets" into a variable and that'll wait for user to write sth and press enter.
Gets stands for get string.
irb :001 > name = gets
Bob
=> "Bob\n"
After the code, name = gets, the computer waited for us to type in some information. We typed "Bob" and then pressed enter and the program returned "Bob\n". The \n at the end is the "newline" character and represents the enter key. But we don't want that as part of our string. We'll use chomp chained to gets to get rid of that - you can put .chomp after any string to remove the carriage return characters at the end.

irb :001 > name = gets.chomp
Bob
=> "Bob"

# Method (function) scope

DIFFERENT FROM JS

In terms of variable scope, methods have self-contained scope. That means that you can't refer to or modify any variables that aren't initialized inside the method's body, and none of the variables initialized by the method are available outside the method's body.

# blocks

A block is a piece of code that follows a method's invocation, delimited by either curly braces {} or do/end:

total= 0
[1,2,3, 5].each {|number| total += number}
puts total

### or

total = 0
[1, 2, 3].each do |number|
total += number
end
puts total # 6

THEY ARE SIMILAR TO JS FUNCTIONS IN SCOPE SENSE
. In both cases, the code can access and modify variables that are defined outside of the block. Thus, both blocks can access and modify total. However, any variables initialized inside the block (such as number) can't be accessed by the outer code.

## for ...do/end

arr = [1, 2, 3]

for i in arr do
a = 5 # a is initialized here
end

puts a # is it accessible here?
The answer is yes. The reason is because the for...do/end code did not create a new inner scope, since for is part of Ruby language and not a method invocation. When we use each, times and other method invocations, followed by {} or do/end, that's when a new block is created.

# variable type

## constants

MY_CONSTANT = 'I am available throughout your app.'

## class variables

@@instances = 0

## globals

`$var = 'I am also available throughout your app.'`

## instance variables

@var = 'I am available throughout the current instance of this class.'

## local variables

var = 'I must be passed around to cross scope boundaries.'
