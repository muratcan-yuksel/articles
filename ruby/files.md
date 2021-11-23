## writing files

File.open("sample2.txt", "w"){ |somefile| somefile.puts "Hello file!"}

## reading files

Reading a file uses the same File.open method as before. However, the second argument is an "r" instead of "w".

contents = File.open("sample.txt", "r"){ |file| file.read }
puts contents
#=> Lorem ipsum etc.

## Using readlines

When dealing with delimited files, such as comma-delimited text files, it's more convenient to read the file line by line. The readlines method can draw in all the content and automatically parse it as an array, splitting the file contents by the line breaks.

File.open("sample.txt").readlines.each do |line|
puts line
end
