// Chart.js configuration and initialization

// Default chart options
const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom'
        }
    }
};

// ===== Student Dashboard Charts =====
if (window.location.pathname.endsWith('student-dashboard.html')) {

    // Performance Trend Chart
    const performanceData = [
        { week: 'Week 1', performance: 72, target: 80 },
        { week: 'Week 2', performance: 68, target: 80 },
        { week: 'Week 3', performance: 65, target: 80 },
        { week: 'Week 4', performance: 70, target: 80 },
        { week: 'Week 5', performance: 68, target: 80 }
    ];

    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: performanceData.map(d => d.week),
                datasets: [
                    {
                        label: 'Your Performance',
                        data: performanceData.map(d => d.performance),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Target Score',
                        data: performanceData.map(d => d.target),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                ...defaultOptions,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100
                    }
                }
            }
        });
    }

    // GPA Progress Chart (Doughnut)
    const gpaCtx = document.getElementById('gpaChart');
    if (gpaCtx) {
        const currentGPA = MOCK_STUDENT_PROFILE.currentGPA;
        const targetGPA = MOCK_STUDENT_PROFILE.targetGPA;
        const gap = Math.max(0, targetGPA - currentGPA);

        new Chart(gpaCtx, {
            type: 'doughnut',
            data: {
                labels: ['Current GPA', 'Gap to Target'],
                datasets: [{
                    data: [currentGPA, gap],
                    backgroundColor: ['#ef4444', '#e5e7eb'],
                    borderWidth: 0
                }]
            },
            options: {
                ...defaultOptions,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Exam Scores Chart
    const examCtx = document.getElementById('examChart');
    if (examCtx) {
        new Chart(examCtx, {
            type: 'bar',
            data: {
                labels: MOCK_STUDENT_PROFILE.exams.map(e => e.name),
                datasets: [{
                    label: 'Score',
                    data: MOCK_STUDENT_PROFILE.exams.map(e => e.score),
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                ...defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// ===== Faculty Dashboard Charts =====
if (window.location.pathname.endsWith('faculty-dashboard.html')) {

    // Performance Trend Chart
    const performanceTrendCtx = document.getElementById('performanceTrendChart');
    if (performanceTrendCtx) {
        new Chart(performanceTrendCtx, {
            type: 'line',
            data: {
                labels: MOCK_PERFORMANCE_METRICS.map(m => m.date),
                datasets: [
                    {
                        label: 'Avg GPA',
                        data: MOCK_PERFORMANCE_METRICS.map(m => m.avgGPA),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'At-Risk Count',
                        data: MOCK_PERFORMANCE_METRICS.map(m => m.riskCount),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                ...defaultOptions,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'GPA'
                        },
                        min: 2.5,
                        max: 3.5
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'At-Risk Count'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    // Risk Distribution Chart
    const riskDistributionCtx = document.getElementById('riskDistributionChart');
    if (riskDistributionCtx) {
        new Chart(riskDistributionCtx, {
            type: 'pie',
            data: {
                labels: ['At-Risk', 'Warning', 'Healthy'],
                datasets: [{
                    data: [
                        CLASS_STATISTICS.atRiskCount,
                        CLASS_STATISTICS.warningCount,
                        CLASS_STATISTICS.healthyCount
                    ],
                    backgroundColor: ['#ef4444', '#f97316', '#22c55e'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                ...defaultOptions,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Attendance Analysis Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        const topStudents = MOCK_STUDENTS.slice(0, 6);

        new Chart(attendanceCtx, {
            type: 'bar',
            data: {
                labels: topStudents.map(s => s.name),
                datasets: [
                    {
                        label: 'Attendance %',
                        data: topStudents.map(s => s.attendanceRate),
                        backgroundColor: '#3b82f6',
                        borderRadius: 6
                    },
                    {
                        label: 'Assignment %',
                        data: topStudents.map(s => s.assignmentCompletion),
                        backgroundColor: '#10b981',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                ...defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}
