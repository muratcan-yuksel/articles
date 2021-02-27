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
	

