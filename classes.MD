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

