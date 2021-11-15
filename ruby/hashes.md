are like objects

my_hash = {
"a random word" => "ahoy",
"Dorothy's math test score" => 94,
"an array" => [1, 2, 3],
"an empty hash within a hash" => {}
}

## fetch method

shoes.fetch("hiking") #=> KeyError: key not found: "hiking"

## Adding and Changing Data

You can add a key-value pair to a hash by calling the key and setting the value, just like you would with any other variable.

shoes["fall"] = "sneakers"

## removing data

shoes.delete("summer") #=> "flip-flops"

## methods

books = {
"Infinite Jest" => "David Foster Wallace",
"Into the Wild" => "Jon Krakauer"
}

books.keys #=> ["Infinite Jest", "Into the Wild"]
books.values #=> ["David Foster Wallace", "Jon Krakauer"]
