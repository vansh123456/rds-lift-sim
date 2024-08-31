let buttons = document.querySelectorAll(".call-lift");
const addLiftBtn = document.querySelector(".add-lift");
const addFloorBtn = document.querySelector(".add-floor");
let liftEls = document.querySelectorAll(".lift-container");
let leftDoors = document.querySelectorAll(".left-door");
let rightDoors = document.querySelectorAll(".right-door");
const floorsContainer = document.querySelector(".floors");
let floors = document.querySelectorAll(".floor");

//to perform basic operations we make use of queue DS,we add at the back and remove from the front 
//we make use of prebuilt enqueue and dequeue

class Queue {
    constructor() {
        this.items = []; //define an empty array to add elements into
      }
      enqueue(element) {
        return this.items.push(element); // add element in array
      }
    
      dequeue() {
        if (this.items.length > 0) { //check if queue is empty
          return this.items.shift();  //nuke items
        }
      }
    
      peek() {
        return this.items[this.items.length - 1]; //display the element
      }
    
      isEmpty() {
        return this.items.length == 0;
      }
    
      size() {
        return this.items.length;
      }
    
      clear() {
        this.items = [];
      } 
}
//we are using  arrow notation(es6) to get the elements child properties
const lifts = Array.from(document.querySelectorAll(".lift-container"), (el) => ({
    htmlEl: el,
    busy: false,
    currFloor: 0,
  }));