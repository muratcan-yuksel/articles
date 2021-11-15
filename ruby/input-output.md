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
