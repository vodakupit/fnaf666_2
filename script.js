const timeEl = document.getElementById('time');
const energyEl = document.getElementById('energy');
const nightEl = document.getElementById('night');
const leftDoorBtn = document.getElementById('leftDoor');
const rightDoorBtn = document.getElementById('rightDoor');

let minutes = 0;
let energy = 100;
let leftClosed = false;
let rightClosed = false;

function updateDoor(button, closed, side) {
  button.classList.toggle('closed', closed);
  button.textContent = `${side}: ${closed ? 'ЗАКРЫТА' : 'ОТКРЫТА'}`;
}

function tick() {
  minutes += 1;
  const hours = Math.min(6, Math.floor(minutes / 10));
  const mins = (minutes % 10) * 6;

  timeEl.textContent = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

  const loss = 0.3 + (leftClosed ? 0.4 : 0) + (rightClosed ? 0.4 : 0);
  energy = Math.max(0, energy - loss);
  energyEl.textContent = `Энергия: ${energy.toFixed(0)}%`;

  if (hours >= 6 || energy <= 0) {
    nightEl.textContent = energy > 0 ? 'Смена пройдена!' : 'Свет вырубился...';
    clearInterval(loop);
  }
}

leftDoorBtn.addEventListener('click', () => {
  leftClosed = !leftClosed;
  updateDoor(leftDoorBtn, leftClosed, 'Левая дверь');
});

rightDoorBtn.addEventListener('click', () => {
  rightClosed = !rightClosed;
  updateDoor(rightDoorBtn, rightClosed, 'Правая дверь');
});

const loop = setInterval(tick, 1000);
