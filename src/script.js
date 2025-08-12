let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let eventsData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchEvents().then(() => {
    renderCalendar(currentMonth, currentYear);
  });
  document.getElementById("prev").onclick = () => changeMonth(-1);
  document.getElementById("next").onclick = () => changeMonth(1);
});

function fetchEvents() {
  return fetch("event.json")
    .then((res) => res.json())
    .then((data) => {
      eventsData = data;
    });
}

function renderCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  const monthYear = document.getElementById("monthYear");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYear.textContent = `${months[month]} ${year}`;
  calendar.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  for (let date = 1; date <= daysInMonth; date++) {
    const cell = document.createElement("div");
    cell.textContent = date;
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;

    if (
      date === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add("today");
    }

    if (eventsData.some((e) => e.date === fullDate)) {
      cell.classList.add("has-event");
    }

    cell.classList.add("calendar-date");
    cell.onclick = () => selectDate(year, month, date);
    calendar.appendChild(cell);
  }
}

function selectDate(year, month, day) {
  const selected = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
  document.getElementById("selectedDate").textContent = selected;
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";
  const found = eventsData.find((e) => e.date === selected);
  if (found && found.events.length) {
    found.events.forEach((ev) => {
      const li = document.createElement("li");
      li.textContent = ev;
      eventList.appendChild(li);
    });
  } else {
    eventList.innerHTML = "<li>No events</li>";
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
