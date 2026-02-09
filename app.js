// ===== Utility Functions =====
function showToast(title, message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
        success: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    toast.innerHTML = `
        <div class="toast-icon">${iconMap[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ===== Authentication Functions =====
function validateCredentials(email, password) {
    // Check mock users
    if (email === MOCK_USERS.faculty.email && password === 'faculty123') {
        return MOCK_USERS.faculty;
    }
    if (email === MOCK_USERS.student.email && password === 'student123') {
        return MOCK_USERS.student;
    }

    // Check registered users
    const users = JSON.parse(localStorage.getItem('scholar_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    return user || null;
}

function logout() {
    localStorage.removeItem('scholar_user');
    showToast('Logged Out', 'You have been successfully logged out', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function checkAuth() {
    const userStr = localStorage.getItem('scholar_user');
    if (!userStr) {
        if (!window.location.pathname.endsWith('index.html') &&
            !window.location.pathname.endsWith('signup.html') &&
            window.location.pathname !== '/' &&
            !window.location.pathname.endsWith('/')) {
            window.location.href = 'index.html';
        }
        return null;
    }
    return JSON.parse(userStr);
}

// ===== Login Page Logic =====
if (window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/')) {

    const user = checkAuth();
    if (user) {
        if (user.role === 'faculty') {
            window.location.href = 'faculty-dashboard.html';
        } else {
            window.location.href = 'student-dashboard.html';
        }
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorAlert = document.getElementById('errorAlert');
            const errorMessage = document.getElementById('errorMessage');
            const loginBtnText = document.getElementById('loginBtnText');

            loginBtnText.textContent = 'Logging in...';
            errorAlert.classList.add('hidden');

            setTimeout(() => {
                const user = validateCredentials(email, password);

                if (!user) {
                    errorMessage.textContent = 'Invalid email or password';
                    errorAlert.classList.remove('hidden');
                    loginBtnText.textContent = 'Log In';
                    return;
                }

                localStorage.setItem('scholar_user', JSON.stringify(user));

                if (user.role === 'faculty') {
                    window.location.href = 'faculty-dashboard.html';
                } else {
                    window.location.href = 'student-dashboard.html';
                }
            }, 500);
        });
    }
}

// ===== Student Dashboard Logic =====
if (window.location.pathname.endsWith('student-dashboard.html')) {
    const user = checkAuth();

    if (!user || user.role !== 'student') {
        window.location.href = 'index.html';
    } else {
        // Populate user info
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userStudentId').textContent = user.studentId;

        // Populate metrics
        document.getElementById('currentGPA').textContent = MOCK_STUDENT_PROFILE.currentGPA.toFixed(2);
        document.getElementById('targetGPA').textContent = MOCK_STUDENT_PROFILE.targetGPA.toFixed(2);
        document.getElementById('attendanceRate').textContent = MOCK_STUDENT_PROFILE.attendanceRate + '%';
        document.getElementById('assignments').textContent =
            `${MOCK_STUDENT_PROFILE.assignmentsCompleted}/${MOCK_STUDENT_PROFILE.totalAssignments}`;

        // Show risk alert if at risk
        if (MOCK_STUDENT_PROFILE.currentGPA < 2.5) {
            document.getElementById('riskAlert').classList.remove('hidden');
        }

        // Populate risk factors
        const riskFactorsList = document.getElementById('riskFactorsList');
        MOCK_STUDENT_PROFILE.riskFactors.forEach(factor => {
            const li = document.createElement('li');
            li.textContent = factor;
            riskFactorsList.appendChild(li);
        });

        // Populate strengths
        const strengthsList = document.getElementById('strengthsList');
        MOCK_STUDENT_PROFILE.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });

        // Show welcome toast
        setTimeout(() => {
            showToast('Welcome Back!', `Good to see you, ${user.name}`, 'success');
        }, 500);
    }
}

// Export student progress
function exportMyProgress() {
    const data = {
        name: MOCK_STUDENT_PROFILE.name,
        currentGPA: MOCK_STUDENT_PROFILE.currentGPA,
        targetGPA: MOCK_STUDENT_PROFILE.targetGPA,
        attendanceRate: MOCK_STUDENT_PROFILE.attendanceRate,
        assignmentsCompleted: MOCK_STUDENT_PROFILE.assignmentsCompleted,
        totalAssignments: MOCK_STUDENT_PROFILE.totalAssignments,
        exams: MOCK_STUDENT_PROFILE.exams,
        riskFactors: MOCK_STUDENT_PROFILE.riskFactors,
        strengths: MOCK_STUDENT_PROFILE.strengths,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `progress-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Export Successful', 'Your progress report has been downloaded', 'success');
}

// ===== Faculty Dashboard Logic =====
let allStudents = [];
let filteredStudents = [];

if (window.location.pathname.endsWith('faculty-dashboard.html')) {
    const user = checkAuth();

    if (!user || user.role !== 'faculty') {
        window.location.href = 'index.html';
    } else {
        // Populate user info
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userDepartment').textContent = user.department;

        // Populate metrics
        document.getElementById('totalStudents').textContent = CLASS_STATISTICS.totalStudents;
        document.getElementById('atRiskStudents').textContent = CLASS_STATISTICS.atRiskCount;
        document.getElementById('avgGPA').textContent = CLASS_STATISTICS.avgGPA.toFixed(2);
        document.getElementById('withdrawalRate').textContent = CLASS_STATISTICS.withdrawalRate.toFixed(1) + '%';

        // Show critical alert if there are at-risk students
        const atRiskStudents = MOCK_STUDENTS.filter(s => s.status === 'at-risk');
        if (atRiskStudents.length > 0) {
            const criticalAlert = document.getElementById('criticalAlert');
            const criticalAlertText = document.getElementById('criticalAlertText');
            criticalAlertText.innerHTML = `<strong>${atRiskStudents.length} students</strong> are at high risk of withdrawal. Immediate intervention recommended.`;
            criticalAlert.classList.remove('hidden');
        }

        // Initialize students
        allStudents = [...MOCK_STUDENTS];
        filteredStudents = [...MOCK_STUDENTS];

        // Setup event listeners
        document.getElementById('searchInput').addEventListener('input', filterStudents);
        document.getElementById('statusFilter').addEventListener('change', filterStudents);
        document.getElementById('sortBy').addEventListener('change', filterStudents);

        // Initial render
        renderStudentsTable();

        // Show welcome toast
        setTimeout(() => {
            showToast('Welcome Back!', `${atRiskStudents.length} students need attention`, 'info');
        }, 500);
    }
}

function filterStudents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // Filter by search and status
    filteredStudents = allStudents.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.studentId.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || student.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Sort
    switch (sortBy) {
        case 'risk-desc':
            filteredStudents.sort((a, b) => b.withdrawalRisk - a.withdrawalRisk);
            break;
        case 'risk-asc':
            filteredStudents.sort((a, b) => a.withdrawalRisk - b.withdrawalRisk);
            break;
        case 'gpa-asc':
            filteredStudents.sort((a, b) => a.gpa - b.gpa);
            break;
        case 'gpa-desc':
            filteredStudents.sort((a, b) => b.gpa - a.gpa);
            break;
    }

    renderStudentsTable();
}

function renderStudentsTable() {
    const atRiskTable = document.getElementById('atRiskTable');
    atRiskTable.innerHTML = '';

    if (filteredStudents.length === 0) {
        atRiskTable.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">No students found</td></tr>';
        return;
    }

    filteredStudents.forEach(student => {
        const tr = document.createElement('tr');

        const statusBadge = student.status === 'at-risk' ? 'table-badge' :
                           student.status === 'warning' ? 'badge' : '';
        const statusColor = student.status === 'at-risk' ? 'danger' :
                           student.status === 'warning' ? 'warning' : 'success';

        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.gpa.toFixed(2)}</td>
            <td>${student.attendanceRate}%</td>
            <td><span class="${statusBadge}" style="background: var(--color-${statusColor})">${student.withdrawalRisk}%</span></td>
            <td><span style="text-transform: capitalize; color: var(--color-${statusColor})">${student.status}</span></td>
            <td><button class="btn btn-outline btn-sm" onclick="viewStudent('${student.id}')">View Details</button></td>
        `;
        atRiskTable.appendChild(tr);
    });
}

function viewStudent(studentId) {
    const student = MOCK_STUDENTS.find(s => s.id === studentId);
    if (!student) return;

    // Populate modal
    document.getElementById('modalStudentName').textContent = student.name;
    document.getElementById('modalStudentId').textContent = student.studentId;
    document.getElementById('modalStatus').textContent = student.status.toUpperCase();
    document.getElementById('modalLastActive').textContent = student.lastActive;
    document.getElementById('modalEngagement').textContent = student.engagement + '%';
    document.getElementById('modalGPA').textContent = student.gpa.toFixed(2);
    document.getElementById('modalAttendance').textContent = student.attendanceRate + '%';
    document.getElementById('modalAssignments').textContent = student.assignmentCompletion + '%';
    document.getElementById('modalWithdrawalRisk').textContent = student.withdrawalRisk + '%';
    document.getElementById('modalFailureRisk').textContent = student.failureRisk + '%';

    // Set progress bars
    document.getElementById('modalAttendanceBar').style.width = student.attendanceRate + '%';
    document.getElementById('modalAssignmentsBar').style.width = student.assignmentCompletion + '%';
    document.getElementById('modalWithdrawalBar').style.width = student.withdrawalRisk + '%';

    // Color code progress bars
    const attendanceBar = document.getElementById('modalAttendanceBar');
    attendanceBar.className = 'progress-bar ' + (student.attendanceRate >= 80 ? 'success' : student.attendanceRate >= 60 ? 'warning' : 'danger');

    const assignmentsBar = document.getElementById('modalAssignmentsBar');
    assignmentsBar.className = 'progress-bar ' + (student.assignmentCompletion >= 80 ? 'success' : student.assignmentCompletion >= 60 ? 'warning' : 'danger');

    // Show modal
    document.getElementById('studentModal').classList.remove('hidden');
}

function closeModal(event) {
    if (event && event.target.className !== 'modal-overlay') return;
    document.getElementById('studentModal').classList.add('hidden');
}

function sendNotificationToStudent() {
    showToast('Notification Sent', 'Student has been notified via email', 'success');
    closeModal();
}

function exportStudentData() {
    const data = {
        classStatistics: CLASS_STATISTICS,
        students: filteredStudents,
        exportDate: new Date().toISOString(),
        exportedBy: JSON.parse(localStorage.getItem('scholar_user')).name
    };

    const csvContent = [
        ['Name', 'Student ID', 'GPA', 'Attendance', 'Assignment Completion', 'Withdrawal Risk', 'Status'],
        ...filteredStudents.map(s => [
            s.name,
            s.studentId,
            s.gpa.toFixed(2),
            s.attendanceRate + '%',
            s.assignmentCompletion + '%',
            s.withdrawalRisk + '%',
            s.status
        ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student-data-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Export Successful', `${filteredStudents.length} students exported to CSV`, 'success');
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('studentModal');
        if (modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    }
});
