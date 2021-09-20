## JS syntax and its equivalents in php

let myVar = 1 equals to <?php $myVar=1 ?> // Yes, every bit of php code must be inside of its tag: <?php (code goes here) ?>
return equals to echo. For instance:
return myVar equals to echo myVar.

// echo "hello, world";
//let's create a variable
//we define the variable with a dollar sign on the beginning
$name= "Yoshi";
//define a variable and log it (echo it)
$my_var = 1;
echo $my_var;

# Concepts

## Variables

e.g. $name= "John";

## data types

-strings => $phrase="this is a string";
-booleans => false;
-integers => $numb= 127;
-floating numbers => $floatingNumb= 12.7;
-null => stands for no value

## Working with strings

<?php
//create a string:
echo "this is a string";


?>

## functions

<?php?
$phrase= "a strin";
echo strtolower($phrase)
//or
echo strtoupper($phrase)



>
### some methods
let phrase = "string"; => $phrase="string";
console.log(phrase.toLowerCase() ) equals to strtolower($phrase);

Uppercase => strtoupper($phrase);

phrase.length euals to echo strlen($phrase)

//get the first character of the string
$phrase="string";
echo $phrase[0]=> "s"
or 
echo $phrase[1]=> "t"
//change the index 1
$phrase[1]="ö" => "söring"

#### change a string variable
it's much easier to do than in JS

$phrase = "Giraffe academy";
echo str_replace ("Odin", "Project", $phrase);

### Working with numbers
