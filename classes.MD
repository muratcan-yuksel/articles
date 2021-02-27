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
