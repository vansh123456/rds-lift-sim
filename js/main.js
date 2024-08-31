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
  function getLifts() {
    return lifts;
  }
  
  function getClosestEmptyLift(destFloor) {
    const lifts = getLifts();
  
    const emptyLifts = lifts.reduce(
      (result, value, i) =>
        result.concat(
            //here used ternary operators
          value.busy === false
            ? {
                i,
                currFloor: value.currFloor,
                distance: Math.abs(destFloor - value.currFloor),//get the nearest value in absolute whole digits
              }
            : []
        ),
      []
    );
  
    if (emptyLifts.length <= 0) {
      return { lift: {}, index: -1 };
    }
  
    const closestLift = emptyLifts.reduce((result, value, index) =>
      value.distance < result.distance ? value : result
    );
  
    const index = closestLift.i;
  
    return { lift: lifts[index], index };
  }
  const getMaxLifts = () => {
    const viewportwidth = document.getElementsByTagName("body")[0].clientWidth;
    return Math.floor(((viewportwidth - 100)/120));
  };
  
  const callLift = () => {
    //destructured values added 
    const { lift, index } = getClosestEmptyLift(requests.peek());
  
    if (index >= 0) {
      lifts[index].busy = true;
      moveLift(lift.htmlEl, requests.dequeue(), index);
    }
  };
  /**
   * Lift animations defined hereon now
   */
  const openLift = (index) => {
    buttons.disabled = true;
    rightDoors[index].classList.add("right-door-open");
    leftDoors[index].classList.add("left-door-open");
  
    rightDoors[index].classList.remove("right-door-close");
    leftDoors[index].classList.remove("left-door-close");
  };
  
  const closeLift = (index) => {
    rightDoors[index].classList.add("right-door-close");
    leftDoors[index].classList.add("left-door-close");
  
    rightDoors[index].classList.remove("right-door-open");
    leftDoors[index].classList.remove("left-door-open");
    buttons.disabled = false;
  
    setTimeout(() => {
      lifts[index].busy = false;
      dispatchliftIdle();
    }, 2500);
  };
  
  const openCloseLift = (index) => {
    openLift(index);
    setTimeout(() => {
      closeLift(index);
    }, 3000);
  };
  const moveLift = (lift, destFloor, index) => {
    const distance = Math.abs(destFloor - lifts[index].currFloor);
    lift.style.transform = `translateY(${destFloor * 100 * -1}%)`;
    lift.style.transition = `transform ${1500 * distance}ms ease-in-out`;
  
    setTimeout(() => {
      openCloseLift(index);
    }, distance * 1500 + 1000);
  
    lifts[index].currFloor = destFloor;
  };
  function addRequest(destFloor) {
    requests.enqueue(destFloor);
    dispatchRequestAdded();
  }
  
  function removeRequest() {
    requests.dequeue();
  }
  const requestAddedEvent = new Event("requestAdded");
  const liftIdleEvent = new Event("liftIdle");
  
  function dispatchRequestAdded() {
    document.dispatchEvent(requestAddedEvent);
  }
  
  function dispatchliftIdle() {
    document.dispatchEvent(liftIdleEvent);
  }
  
  document.addEventListener("requestAdded", () => {
    callLift(); //call  the function which animates the lift back to floor
  });
  
  document.addEventListener("liftIdle", () => {
    if (!requests.isEmpty()) {
      callLift();
    }
  });