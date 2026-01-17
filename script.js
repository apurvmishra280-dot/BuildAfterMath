// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Data storage
let data = {
    names: ["Rohan Kisibe", "Jotaro Kujo", "Joseph Joestar", "Ichigo Kurosaki", "Jolyne Cujoh"],
    marks: [120, 20, 500, 180, 89]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadStudents();
    updateTotalStudents();
}

// Load students from backend
async function loadStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}/students`);
        if (response.ok) {
            const students = await response.json();
            data.names = students.map(s => s.name);
            data.marks = students.map(s => s.marks);
            populateStudentSelects();
            renderStudentList();
        }
    } catch (error) {
        console.log('Using local data (server not connected)');
        populateStudentSelects();
        renderStudentList();
    }
}

// Show/Hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Hide menu if switching to another section
    const menuSection = document.querySelector('.menu-section');
    if (sectionId !== 'menu-section') {
        menuSection.classList.add('hidden');
    } else {
        menuSection.classList.remove('hidden');
    }

    // Show selected section
    if (sectionId !== 'menu-section') {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
        }
    }
}

// View Students
function renderStudentList() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    data.names.forEach((name, index) => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.innerHTML = `
            <span class="student-id">#${index}</span>
            <span class="student-name">${name}</span>
        `;
        studentList.appendChild(studentItem);
    });
}

// Add Student (Admission)
async function addStudent(event) {
    event.preventDefault();
    
    const studentName = document.getElementById('studentName').value.trim();
    const messageDiv = document.getElementById('admissionMessage');

    if (studentName === '') {
        showMessage(messageDiv, 'Please enter a valid name', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: studentName })
        });

        if (response.ok) {
            const result = await response.json();
            
            // Clear input
            document.getElementById('studentName').value = '';

            // Show success message
            showMessage(messageDiv, `✓ ${result.message}`, 'success');

            // Reload students
            loadStudents();
            updateTotalStudents();

            // Reset message after 2 seconds
            setTimeout(() => {
                messageDiv.classList.remove('success');
            }, 2000);
        } else {
            showMessage(messageDiv, 'Error adding student', 'error');
        }
    } catch (error) {
        console.log('Server not connected, adding locally');
        // Fallback to local storage
        data.names.push(studentName);
        data.marks.push(0);

        document.getElementById('studentName').value = '';
        showMessage(messageDiv, `✓ ${studentName} has been added successfully!`, 'success');

        populateStudentSelects();
        updateTotalStudents();

        setTimeout(() => {
            messageDiv.classList.remove('success');
        }, 2000);
    }
}

// Check Marks
function displayMarks() {
    const studentSelect = document.getElementById('studentSelect');
    const marksDisplay = document.getElementById('marksDisplay');
    const marksValue = document.getElementById('marksValue');

    const selectedIndex = parseInt(studentSelect.value);

    if (selectedIndex >= 0 && selectedIndex < data.marks.length) {
        marksValue.textContent = data.marks[selectedIndex];
        marksDisplay.classList.remove('hidden');
    } else {
        marksDisplay.classList.add('hidden');
    }
}

// Store Marks
async function storeMarks(event) {
    event.preventDefault();

    const marksStudent = document.getElementById('marksStudent');
    const marksValueInput = document.getElementById('marksValue');
    const messageDiv = document.getElementById('storeMessage');

    const selectedIndex = parseInt(marksStudent.value);
    const marksValue = parseInt(marksValueInput.value);

    if (selectedIndex < 0 || marksValue < 0) {
        showMessage(messageDiv, 'Please select a valid student and marks', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/students/${selectedIndex}/marks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ marks: marksValue })
        });

        if (response.ok) {
            const result = await response.json();
            
            // Clear input
            marksValueInput.value = '';
            marksStudent.value = '';

            // Show success message
            showMessage(messageDiv, `✓ ${result.message}`, 'success');

            // Reload students
            loadStudents();

            // Reset message after 3 seconds
            setTimeout(() => {
                messageDiv.classList.remove('success');
            }, 3000);
        } else {
            showMessage(messageDiv, 'Error storing marks', 'error');
        }
    } catch (error) {
        console.log('Server not connected, storing locally');
        // Fallback to local storage
        data.marks[selectedIndex] = marksValue;

        marksValueInput.value = '';
        marksStudent.value = '';

        showMessage(messageDiv, `✓ Marks stored successfully for ${data.names[selectedIndex]}!`, 'success');

        setTimeout(() => {
            messageDiv.classList.remove('success');
        }, 3000);
    }
}

// Populate select dropdowns
function populateStudentSelects() {
    populateSelect('studentSelect');
    populateSelect('marksStudent');
}

function populateSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">-- Choose a student --</option>';

    data.names.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${index}: ${name}`;
        select.appendChild(option);
    });
}

// Show message
function showMessage(messageDiv, text, type) {
    messageDiv.textContent = text;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type);
}

// Update total students count
function updateTotalStudents() {
    document.getElementById('totalStudents').textContent = data.names.length;
}

// Export data as JSON
async function exportData() {
    try {
        const response = await fetch(`${API_BASE_URL}/export`);
        if (response.ok) {
            const exportData = await response.json();
            const jsonString = JSON.stringify(exportData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `student_data_${new Date().getTime()}.json`;
            link.click();
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.log('Server not connected, exporting locally');
        // Fallback to local export
        const dataToExport = {
            students: data.names.map((name, index) => ({
                id: index,
                name: name,
                marks: data.marks[index]
            })),
            exportDate: new Date().toLocaleString()
        };

        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `student_data_${new Date().getTime()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}
