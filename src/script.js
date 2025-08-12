let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentMonth, currentYear);
  document.getElementById("prevMonth").onclick = () => changeMonth(-1);
  document.getElementById("nextMonth").onclick = () => changeMonth(1);
  setInterval(updateDigitalClock, 1000);
  updateDigitalClock();
});

function updateDigitalClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('digitalClock').textContent = `${hours}:${minutes}:${seconds}`;
}

function renderCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  monthYear.textContent = `${months[month]} ${year}`;
  calendar.innerHTML = "";

  // Add weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    dayCell.classList.add("weekday");
    calendar.appendChild(dayCell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const cell = document.createElement("div");
    cell.textContent = date;
    cell.classList.add("calendar-date");

    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    calendar.appendChild(cell);
  }
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}