let techChart, radarChart;

function initCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#9fb3a8' : '#78716c';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    // Tech Chart
    const ctxTechEl = document.getElementById('techChart');
    if (ctxTechEl) {
        const ctxTech = ctxTechEl.getContext('2d');
        techChart = new Chart(ctxTech, {
            type: 'doughnut',
            data: {
                labels: ['Word/LaTeX', 'Excel', 'GeoGebra', 'PowerPoint'],
                datasets: [{
                    data: [30, 25, 25, 20],
                    backgroundColor: ['#1a3d2b', '#2e6b4e', '#52b788', '#fbbf24'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: textColor, font: { size: 10, family: 'Inter' } } }
                },
                cutout: '70%'
            }
        });
    }

    // Radar Chart
    const ctxRadarEl = document.getElementById('radarChart');
    if (ctxRadarEl) {
        const ctxRadar = ctxRadarEl.getContext('2d');
        radarChart = new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Pure Math', 'Applied Math', 'Teaching', 'Tech Skills', 'Languages', 'Research'],
                datasets: [{
                    label: 'Competency',
                    data: [90, 85, 92, 80, 75, 70],
                    backgroundColor: 'rgba(82, 183, 136, 0.2)',
                    borderColor: '#52b788',
                    pointBackgroundColor: '#1a3d2b',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: { color: textColor, font: { size: 11, family: 'Inter' } },
                        ticks: { display: false, stepSize: 20 },
                        suggestedMin: 0, suggestedMax: 100
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
}

function updateChartsTheme(theme) {
    if(!techChart || !radarChart) return;
    const isDark = theme === 'dark';
    const textColor = isDark ? '#9fb3a8' : '#78716c';
    const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

    techChart.options.plugins.legend.labels.color = textColor;
    techChart.update();

    radarChart.options.scales.r.pointLabels.color = textColor;
    radarChart.options.scales.r.angleLines.color = gridColor;
    radarChart.options.scales.r.grid.color = gridColor;
    radarChart.update();
}
