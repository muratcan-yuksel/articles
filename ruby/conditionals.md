puts, print and gets(with .chomp) you know already.

## putc

putc can be used to output one character at a time.
e.g.
str= "hello ruby"
putc str => h
putc str[1]=> e

## print

The print statement is similar to the puts statement. The only difference is that the puts statement goes to the next line after printing the contents, whereas with the print statement the cursor is positioned on the same line.

## conditional statements

if statement_to_be_evaluated == true

# do something awesome...

end

if 1 < 2
puts "Hot diggity, 1 is less than 2!"
end

## one-liner conditional

puts "Hot diggity damn, 1 is less than 2" if 1 < 2

## else and elsif

if attack_by_land == true
puts "release the goat"
elsif attack_by_sea == true
puts "release the shark"
else
puts "release Kevin the octopus"
end

## <=> spaceship operator

<=> (spaceship operator) returns the following:

-1 if the value on the left is less than the value on the right;
0 if the value on the left is equal to the value on the right; and
1 if the value on the left is greater than the value on the right.
5 <=> 10 #=> -1
10 <=> 10 #=> 0
10 <=> 5 #=> 1

## case statements

grade = 'F'

did_i_pass = case grade #=> create a variable `did_i_pass` and assign the result of a call to case with the variable grade passed in
when 'A' then "Hell yeah!"
when 'D' then "Don't tell your mother."
else "'YOU SHALL NOT PASS!' -Gandalf"
end

If you need to do some more complex code manipulation, you can remove the then keyword and instead place the code to be executed on the next line.

grade = 'F'

case grade
when 'A'
puts "You're a genius"
future_bank_account_balance = 5_000_000
when 'D'
puts "Better luck next time"
can_i_retire_soon = false
else
puts "'YOU SHALL NOT PASS!' -Gandalf"
fml = true
end

## Unless Statements

An unless statement works in the opposite way as an if statement: it only processes the code in the block if the expression evaluates to false. There isn’t much more to it.
age = 18
unless age < 17
puts "Get a job."
end

Just like with if statements, you can write a simple unless statement on one line, and you can also add an else clause.

age = 18
puts "Welcome to a life of debt." unless age < 17

unless age < 17
puts "Down with that sort of thing."
else
puts "Careful now!"
end

## ternary operator

same as JS
age = 18
response = age < 17 ? "You still have your entire life ahead of you." : "You're all grown up."
puts response #=> "You're all grown up."
