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