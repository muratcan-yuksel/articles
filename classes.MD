For a coding newbie (such as myself), understanding classes in Javascript might prove to be quite difficult. There are many sources on the web, but most of them speak from the point of view of a senior developer, which assumes many pieces of knowledge that don't exist in the mind of a new developer. This is the reason why I'm writing this article: To present classes in Javascript in a way that's easy to understand.


Most of this knowledge is thanks to Stephen Mayeux. If it weren't for him, I'd still be having trouble understanding the concept.  So, if you like watching videos over reading, you can check his playlist on the subject, it's exceptional: https://www.youtube.com/playlist?list=PLtwj5TTsiP7uTKfTQbcmb59mWXosLP_7S

### Classes
Classes in Javascript are very, very similar to Object constructors. So if you're familiar with them, they're a piece of cake. They're still about creating a prototype of something so that we can use the same code over and over again instead of typing manually. They just present us with some new functionalities that didn't exist in the former. So, without further ado, let's create our first class:


```
class Bird {
constructor (name, age){
	this.name=name;
	this.age=age;
	this.canFly= true;
}
}
``` 
So, our class of words has a constructor method in it. The arguments shall take the name of our bird, its age, and if it can fly or nay. <br>

This constructor method will immediately be called as soon as we invoke it through the "new" keyword. We use the "new" keyword to create a class instance. Let's create an instance called birdLarry:
```
const birdLarry= new Bird ("Larry", 4);
```
You see, to create a new class instance, we define a variable (birdLarry), and after the equation mark, we write the "new" keyword followed by the name of the class we wish to invoke (Bird, in our case). Then we add the arguments: The name of the Bird instance and its age.<br>

Now, if we wrote `birdLarry.name;` to our console, the output would be "Larry". If we wrote `birdLarry.age;` we'd get the number 4 as output. And if we wrote `birdLarry.canFly`, the output would be "true". 

So far so good. <br>

Let's add some more methods to our Bird class.


```
class Bird {
constructor (name, age){
	this.name=name;
	this.age=age;
	this.canFly= true;
}
  nameAge() {
    return `${this.name} is ${this.age} years old`;
  }
}
``` 
Now, what did we do here? You see, this nameAge method will give information about our Bird instance. Like, if we wrote,<br>
`birdLarry.nameAge();` the output would be "Larry is 2 years old". Still, super simple. But what is we wanted to be able to change the name of our bird? Say, from Larry to Clumsy? and also change its age too? Because I feel like a bird named clumsy must be quite young. Let's add our methods:

```
class Bird {
constructor (name, age){
	this.name=name;
	this.age=age;
	this.canFly= true;
}
  nameAge() {
    return `${this.name} is ${this.age} years old`;
  }
  setName(name) {
    this.name = name;
  }

  setAge(age) {
    this.age = age;
  }
}
``` 
With this newly added code, we can modify the name and the age of our bird. So, if we were to write `birdLarry.setName("Clumsy");` and call `birdLarry.name;` the output would be "Clumsy" since we modified the original name of our class instance. Also, since Clumsy must be a bit younger, we'd want to modify its age too by writing `birdLarry.setAge(2)` into our console. Now, whenever we call `birdLarry.age;` the out put would be 2. 

Huff, glad we covered that, because what comes next is much more interesting than these basics :) 
### Static Methods
What if we wanted to add methods **not for the instances ** but **for the class itself?** Well, with ES6 classes feature, we can do that super easy! So, let's take our Bird class and see what we can do with it using static methods (I'm not going to write the additional methods for the sake of simplicity and space):

```
class Bird {
static kingdom(){
return "Animalia";
}
static kingdomSentence () {
return `Birds belong to the kingdom ${this.kingdom()}`;
}

constructor (name, age){
	this.name=name;
	this.age=age;
	this.canFly= true;
}
}
``` 
Wowowowow, slow down mate, what's going on there? Well, what we did was to add two static methods: The first one returns to which biological kingdom birds belong to (Animalia, because they are indeed animals), and the second one returns a sentence using the kingdom. You see that I used the "this" keyword here. This is an interesting part of the static method: Whilst the "this" keyword would normally refer to the class instance if it were in an ordinary method, inside a static method, it refers to the class itself. Wait, what does that mean? Bear with me a bit.

Now if we wrote the input `birdLarry.kingdom()`, the output would be something like `Uncaught TypeError: birdLarry.kingdom is not a function at <anonymous>:1:11` Uf. Why tho'?

As I mentioned in the opening sentence of this section, static methods work with the class itself, not with its instances. And our `birdLarry` is an instance of the class `Bird`. So, the static method wouldn't work with it. Instead, the static method would work only with the class `Bird`. Like this:<br>
`Bird.kingdom()` would return `"Animalia"`. And if we wrote `Bird.kingdomSentence()` it would return `"Birds belong to the kingdom Animalia"`. Pretty cool eh?<br>
Now, there's another way of writing these static methods. They are called static properties. Let's see how they work.
### Static Properties
Properties, basically, are anything but a function. Like, they are strings, numbers, booleans etc. We can write the above static methods as such:

```
class Bird {
static kingdom= "Animalia";

static kingdomSentence=`Birds belong to the kingdom ${this.kingdom}`;

constructor (name, age){
	this.name=name;
	this.age=age;
	this.canFly= true;
}
}
``` 
See what we did there? We took away all kinds of brackets, and the return keyword. We also took the brackets that indicate the function calling when using `this.kingdom`. This way works just like the above, but it's cleaner. Now, what would happen if we wrote `Bird.kingdom()`?

Well, we'd get an error like this: `Uncaught TypeError: Bird.kingdom is not a function at <anonymous>:1:6`, because now they're properties, not functions! So, we'd be calling them like : 
`Bird.kingdom;` which would return `"Animalia"`, and <br>
`Bird.kingdomSentence` which would return `"Birds belong to the kingdom Animalia"`.

Okay, if we're okay with this one, let's go to the final, and the handiest method we got on our sleeve. 
###Extends and Super
It's all cool now. We can write just one chunk of code and create many, many different instances of it. But, what if we're faced with a situation we wish to create another class that's almost the same as our Bird class? And obviously, we don't want to repeat ourselves, type another chunk of code over and over again. What would we do?

Well, we'd use the extends keyword to overcome this annoying difficulty. 
###extends and super keywords
 Now, say that we want to create a new Penguin class. Since Penguins are birds, they'd share almost all properties with other birds. I say almost, because penguins can't fly, and I'm not goint go be fooled by BBC :) https://www.youtube.com/watch?v=9dfWzp7rYR4&ab_channel=BBC 

Anyway, with the following code, our new Penguin class will take everything that Bird class has. You see the super keyword there? It takes the name and age methods from the original class. I also made sure that canFly points to "false" :) 

```
class Penguin extends Bird {
  constructor (name,age){
      super(name,age);
      this.canFly=false;
     
  }
}
``` 
Now, what happened? To see what's going on, let's create a new instance of the Penguin class, and call it coldFeet:

`const coldFeet= new Penguin("ColdFeet",3);`

So, our new Penguin, Coldfeet can access anything our birdLarry can! If we logged `coldFeet.age`, the output would be 3. If we wrote `coldFeet.canFly`, the output would be **false**. Why? Obviously, because we made it clear that penguins can't fly :) 

Now, our Penguin instance shares everything with our Bird instance. But, what about the Penguin class itself? Will it share the same static methods with the Bird class? 

As you can see from my choice of wording, it does :) 

Say that we used static properties when defining our Bird class. If we wrote `Penguin.kingdom`, the output would be `"Animalia"`

And if we wrote `Penguin.kingdomSentence`, the output would be `"Birds belong to the kingdom Animalia"` (because penguins are birds silly!)





	

