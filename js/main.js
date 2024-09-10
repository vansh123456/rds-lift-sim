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