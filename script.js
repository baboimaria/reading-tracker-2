const form = document.getElementById("readingForm");
const sessionsList = document.getElementById("sessionsList");

let sessions = []; // array cu sesiunile

// inițializare Chart.js
const ctx = document.getElementById("readingChart").getContext("2d");
const readingChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
        datasets: [
            {
                label: 'Minute citite',
                data: [0,0,0,0,0,0,0],
                borderColor: '#ff3385',
                backgroundColor: 'rgba(255, 51, 133, 0.2)',
                fill: true,
                tension: 0.3
            },
            {
                label: 'Pagini citite',
                data: [0,0,0,0,0,0,0],
                borderColor: '#ff66b2',
                backgroundColor: 'rgba(255, 102, 178, 0.2)',
                fill: true,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Progres săptămânal citit'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// funcție pentru a adăuga sesiune
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const minutes = parseInt(document.getElementById("minutes").value);
    const pages = parseInt(document.getElementById("pages").value);

    const today = new Date();
    const dayIndex = today.getDay(); // 0 = Duminică, 1 = Luni, etc.
    const chartDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // ajustăm săptămâna Luni-Duminică

    // actualizăm graficul
    readingChart.data.datasets[0].data[chartDayIndex] += minutes;
    readingChart.data.datasets[1].data[chartDayIndex] += pages;
    readingChart.update();

    // stocăm sesiunea și afișăm lista
    sessions.push({ date: today.toLocaleDateString("ro-RO"), minutes, pages });
    renderSessions();

    form.reset();
});

// afișare sesiuni sub formular
function renderSessions() {
    sessionsList.innerHTML = "";
    sessions.forEach(s => {
        const div = document.createElement("div");
        div.textContent = `${s.date}: ${s.minutes} minute, ${s.pages} pagini`;
        sessionsList.appendChild(div);
    });
}
