const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const selectedDateEl = document.getElementById("selectedDate");
const eventInput = document.getElementById("eventInput");
const eventList = document.getElementById("eventList");
let selectedDate;
let current = new Date();

function renderCalendar() {
  calendar.innerHTML = "";
  const year = current.getFullYear();
  const month = current.getMonth();
  monthYear.textContent = `${current.toLocaleString("default", {
    month: "long",
  })} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += "<div></div>";
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const div = document.createElement("div");
    div.textContent = day;
    if (new Date().toDateString() === date.toDateString()) {
      div.classList.add("today");
    }
    div.onclick = () => showEvents(`${year}-${month + 1}-${day}`);
    calendar.appendChild(div);
  }
}

function showEvents(dateStr) {
  selectedDate = dateStr;
  selectedDateEl.textContent = dateStr;
  eventInput.value = "";
  eventList.innerHTML = "";

  fetch(`event.php?action=get&date=${dateStr}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((ev) => {
        const li = document.createElement("li");
        li.textContent = ev.title;
        eventList.appendChild(li);
      });
    });
}

document.getElementById("saveEvent").onclick = () => {
  const title = eventInput.value.trim();
  if (!title || !selectedDate) return;

  fetch("event.php?action=add", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${encodeURIComponent(title)}&date=${selectedDate}`,
  }).then(() => {
    eventInput.value = "";
    showEvents(selectedDate);
  });
};

document.getElementById("prev").onclick = () => {
  current.setMonth(current.getMonth() - 1);
  renderCalendar();
};
document.getElementById("next").onclick = () => {
  current.setMonth(current.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
document.getElementById("today").onclick = () => {
  current = new Date();
  renderCalendar();
};
