// Elemente HTML
const form = document.getElementById("readingForm");
const sessionsList = document.getElementById("sessionsList");
const ctx = document.getElementById("readingChart").getContext("2d");

let sessions = [];

// Încarcă datele din LocalStorage la start
if (localStorage.getItem("sessions")) {
  sessions = JSON.parse(localStorage.getItem("sessions"));
  updateList();
  updateChart();
}

// Adaugă sesiune la submit
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const minutes = Number(document.getElementById("minutes").value);
  const pages = Number(document.getElementById("pages").value);

  // Creează obiect sesiune
  const session = {
    minutes,
    pages,
    date: new Date().toLocaleDateString()
  };

  sessions.push(session);

  // Salvează în LocalStorage
  localStorage.setItem("sessions", JSON.stringify(sessions));

  // Actualizează UI
  updateList();
  updateChart();

  // Resetează formularul
  form.reset();
});

// Funcție pentru actualizarea listei de sesiuni
function updateList() {
  sessionsList.innerHTML = "";
  sessions.forEach(s => {
    const div = document.createElement("div");
    div.textContent = `${s.date}: ${s.minutes} minute, ${s.pages} pagini`;
    sessionsList.appendChild(div);
  });
}

// Grafic Line Chart
let chart;
function updateChart() {
  const labels = sessions.map(s => s.date);
  const minutesData = sessions.map(s => s.minutes);
  const pagesData = sessions.map(s => s.pages);

  // Distruge graficul vechi dacă există
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Minute citite',
          data: minutesData,
          borderColor: '#ff3385',
          backgroundColor: '#ff99cc',
          tension: 0.3
        },
        {
          label: 'Pagini citite',
          data: pagesData,
          borderColor: '#ff66b2',
          backgroundColor: '#ffccdd',
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
