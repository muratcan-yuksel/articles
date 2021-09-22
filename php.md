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

////

<!-- document.getElementByName("sth") equals to $_GET["sth"] -->

array.length equals to echo count(array)

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

### getting user input
<form action ="index.php" method="get">
Name: <input type="text" name="nameInput">
<input type="submit">
</form>

<?php
echo $_GET["nameInput"] => get's and writes the given name of the input.

?>

### URL parameters

are used to get a state of information, like the saved user input. You could've used this logic in your CV app, to save and redisplay the user input.
get is used for that

### POST method

<form  method="post">
echo $_POST["theName of the input"]

to get info securely
with post, the url doesn't show the user input
with info gathering, generally post is used

### Arrays

<?php
 $myArr= array("Kevin", false, "Karen", 12, "47agent");
?>

## Associative arrays

are basically objects with key/value pairs.
e.g.

<?php
$grades=array("Jim" => "A+", "Pam" => "B-", );
//to change a key's value:
$grades ["Jim"] = "F";
echo $grades["Jim"];
?>

## Functions

<?php


?>

## While loops

<?php

$index=1;

while($index <= 5){
echo "$index <br>";
$index++;

};

?>

## For loops

<?php
$nums= array(4,8,14,16,23,42);
for ($i = 0; $i <= count($nums); $i++){
    echo "$nums[$i] <br>";
};

?>
