## loop

i = 0
loop do
puts "i is #{i}"
i += 1
break if i == 10
end

## while loops

i = 0
while i < 10 do
puts "i is #{i}"
i += 1
end

You can also use while loops to repeatedly ask a question of the user until they give the desired response:

while gets.chomp != "yes" do
puts "Will you go to prom with me?"
end

## until loops

i = 0
until i >= 10 do
puts "i is #{i}"
i += 1
end

or----

until gets.chomp == "yes" do
puts "Will you go to prom with me?"
end

## for loop

### uses ranging

#### like 0..5 or a..g

for i in 0..5
puts "#{i} zombies incoming!"
end

## times loop

5.times do
puts "Hello, world!"
end

## Upto and Downto Loops

5.upto(10) {|num| print "#{num} " } #=> 5 6 7 8 9 10

10.downto(5) {|num| print "#{num} " } #=> 10 9 8 7 6 5
