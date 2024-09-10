const form = document.querySelector('.form');
const floorsContainer = document.querySelector('.floors-container');
const mainContainer = document.querySelector('.main-container');
const lifts = [];
const pendingQueue = [];

form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const numFloorsInput = document.getElementById('floors');
    const numLiftsInput = document.getElementById('lifts');
    const numFloors = Number(numFloorsInput.value);
    const numLifts = Number(numLiftsInput.value);
  
    if (!numLifts || !numFloors || numFloors < 1 || numLifts < 1) {
      alert(
        'Please enter valid values for both number of floors and number of lifts.'
      );
      return;
    }
    if (numLifts > numFloors) {
        alert(
          'Number of lifts should be less than or equal to the number of floors.'
        );
        return;
      }
    
      mainContainer.style.display = 'none';
      generateFloors(numFloors);
      generateLifts(numLifts);
    });
    function generateFloors(numFloors) {
        for (let floor = numFloors; floor >= 1; floor--) {
          const floorDiv = document.createElement('div');
          const floorContent = document.createElement('div');
          floorContent.classList.add('floor-content');
      
          if (floor !== numFloors) {
            const upButton = document.createElement('button');
            upButton.textContent = 'UP';
            upButton.classList.add('lift-button', 'up-button');
            floorContent.appendChild(upButton);
          }
      
          if (floor !== 1) {
            const downButton = document.createElement('button');
            downButton.textContent = 'DOWN';
            downButton.classList.add('lift-button', 'down-button');
            floorContent.appendChild(downButton);
          }
      
          const floorLabel = document.createElement('div');
          floorLabel.textContent = `Floor ${floor}`;
          floorLabel.classList.add('floor-label');
          // floorDiv.classList.add('floor')
          floorDiv.id = `floor-${floor}`;
          floorDiv.appendChild(floorContent);
          floorDiv.appendChild(floorLabel);
          floorsContainer.appendChild(floorDiv);
        }
      }
      function generateLifts(numLifts) {
        const firstFloor = document.getElementById('floor-1');
        for (let lift = 1; lift <= numLifts; lift++) {
          const liftElement = document.createElement('div');
          liftElement.classList.add('lift');
          liftElement.id = `lift-${lift}`;
      
          const liftDoorOpening = document.createElement('div');
          liftDoorOpening.classList.add('lift-door', 'left-door');
          liftElement.appendChild(liftDoorOpening);
      
          const liftDoorClosing = document.createElement('div');
          liftDoorClosing.classList.add('lift-door', 'right-door');
          liftElement.appendChild(liftDoorClosing);
          liftElement.style.position = 'relative';
          firstFloor.appendChild(liftElement);
      
          lifts.push({
            liftId: `lift-${lift}`,
            currentFloor: 1,
            moving: false,
            direction: null,
            stops: [],
          });
        }
      
        addLiftButtonListeners();
      }
      function addLiftButtonListeners() {
        const liftButtons = document.querySelectorAll('.lift-button');
      
        liftButtons.forEach((button) => {
          button.addEventListener('click', handleLiftButtonClick);
        });
      }
      function handleLiftButtonClick() {
        const floorElement = this.closest('.floor-content');
        const floorNo = parseInt(floorElement.parentNode.id.split('-')[1]);
      
        const ifLiftAlreadyHeading = lifts.find((lift) =>
          lift.stops.includes(floorNo)
        );
        // if undefined that means no lift is going to that particular floor
        if (!ifLiftAlreadyHeading) {
          const requiredLift = findNearestIdleLift(floorNo);
          if (requiredLift) {
            moveLift(floorNo, requiredLift);
          } else {
            if (!pendingQueue.includes(floorNo)) {
              pendingQueue.push(floorNo);
            }
          }
        }
      }
      function findNearestIdleLift(floorNo) {
        const idleLifts = lifts.filter((lift) => !lift.moving);
      
        if (idleLifts.length > 0) {
          const nearestLift = idleLifts.reduce((nearest, currentLift) => {
            const distance = Math.abs(floorNo - currentLift.currentFloor);
            if (!nearest || distance < Math.abs(floorNo - nearest.currentFloor)) {
              return currentLift;
            }
            return nearest;
          }, null);
          return nearestLift;
        } else {
          return null;
        }
      }
      function moveLift(floorNo, lift) {
        const liftElement = document.getElementById(lift.liftId);
        const currentFloor = lift.currentFloor;
        const totalDuration = Math.abs(floorNo - currentFloor) * 2;
        lift.moving = true;
        lift.stops.push(floorNo);
        liftElement.style.transition = `all ${totalDuration}s`;
        liftElement.style.transform = `translateY(-${(floorNo - 1) * 122}px)`;
      
        setTimeout(() => {
          openAndCloseDoors(floorNo, lift);
        }, totalDuration * 1000);
      }
