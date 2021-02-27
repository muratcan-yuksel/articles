Classes in Javascript

Classes are a new feature, available in ES6. Before than, devs would use object constructors, or factory functions (I like them more).
They’re done as such:

class Person {
//this constructor function immediately called as soon as we invoke it through the keyword “new”
	constructor (firstName,lastName){
	this.firstName=firstName;
	this.lastName=lastName;
	this.hasJob=false;
}
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }


}

//now let's create our person instance
const person1 = new Person ("Murat Can","Yüksel");
if we called person1, the output would be
person1;
Person {firstName: "Murat Can", lastName: "Yüksel", hasJob: false}
firstName: "Murat Can"
hasJob: false
lastName: "Yüksel"
__proto__: Object
//yeeeeyy
if we called person1.firstName, it would give:
"Murat Can"
we could even change the name since we have the set methods;
person1.setFirstName ("Mahmut");
now we would have Mahmut Yüksel
//so far it's like the same as object constructors, but we have something reeally cool in classes: 
	STATIC METHODS
	static methods create a method not for the instances, but for the class itself
	now let's add this code:
	class Person {
  static species() {
    return 'Homo sapiens';
  }

  static speciesSentence() {
    return `Humans are classified as ${this.species()}`
  }

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.hasJob = false;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }
}

and create our person1 again
const person1= new Person("Murat","Yüksel");
if we wanted to call the static method:
person1.species()
it will give the following error:
Uncaught TypeError: person1.species is not a function
    at <anonymous>:1:9
    because person1 is an instance
    and this method doesn't belong to any instances, but to the class
    so if I did Person.species()
    it would give "Homo sapiens"
    
    now let's call Person.speciesSentence()
    it will give :
    "Humans are classified as Homo sapiens"
    now, we didn't write Homo sapiens in our method, but used the this keyword
    normally, when we used the this keyword, this. would refer to a specific instance
    but, if we use the this. keyword inside a static method, it's not going to point to a specific instance, but it will point to the class
    STATIC PROPERTIES
    this too, again, a new feature of ES6
    properties are everything that are not functions, like booleans, strings, numbers...
    so let's change our code like this: 
    class Person {
  static species='Homo sapiens';
  

  static speciesSentence=
    `Humans are classified as ${this.species}`
  

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.hasJob = false;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }
}

EXTENDS AND SUPER KEYWORDS
Now, like, all workers are persons. But not all persons are workers. Following that logic, if all workers are persons, every single worker in the world would have the same properties as a person.
Like ,we can create our Worker class by copying everything we've put into the Person class, but that wouln't be really efficient, or DRY (Don't repeat yourself). SO, instead, we can use the extends keyword to inherit everything that the person class contains.
lets create our worker class
class Worker extends Person {
  constructor(firstName, lastName, job) {
    super(firstName, lastName);
    this.job = job;
    this.hasJob = true;
  }
}
now, this super, when we call it, the super, inside of any method, that means it's gonna call the method from the class it extends from. Here we're calling super inside of a construuctor method, which means it's gonna call the constructor method of the person class. o all of this constructor in Person, will be extending to the worker consturctor
but our worker has a job, so we're gonna overrid that ( we did above)

let's put this method too
 setJob(job) {
    this.job = job;
  }
  
  now let's create our worker
  let worker1= new Worker ("Murat","Yüksel","webdev");
  if we'd call worker1.hasjob;
  this time we get true :)



