const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Data storage (in-memory, synced with file)
let data = {
    names: ["Rohan Kisibe", "Jotaro Kujo", "Joseph Joestar", "Ichigo Kurosaki", "Jolyne Cujoh"],
    marks: [120, 20, 500, 180, 89]
};

const dataFile = path.join(__dirname, 'data.json');

// Load data from file if it exists
function loadData() {
    try {
        if (fs.existsSync(dataFile)) {
            const fileData = fs.readFileSync(dataFile, 'utf8');
            data = JSON.parse(fileData);
            console.log('Data loaded from file');
        }
    } catch (error) {
        console.log('Using default data');
    }
}

// Save data to file
function saveData() {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Initialize data
loadData();

// Routes

// Get all students
app.get('/api/students', (req, res) => {
    const students = data.names.map((name, index) => ({
        id: index,
        name: name,
        marks: data.marks[index]
    }));
    res.json(students);
});

// Add new student (Admission)
app.post('/api/students', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required' });
    }

    data.names.push(name.trim());
    data.marks.push(0); // Default marks

    saveData();

    res.status(201).json({
        success: true,
        message: `${name} has been added successfully!`,
        id: data.names.length - 1,
        student: {
            id: data.names.length - 1,
            name: name,
            marks: 0
        }
    });
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= data.names.length) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: id,
        name: data.names[id],
        marks: data.marks[id]
    });
});

// Check marks for a student
app.get('/api/students/:id/marks', (req, res) => {
    const id = parseInt(req.params.id);

    if (id < 0 || id >= data.marks.length) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: id,
        name: data.names[id],
        marks: data.marks[id]
    });
});

// Store/Update marks for a student
app.put('/api/students/:id/marks', (req, res) => {
    const id = parseInt(req.params.id);
    const { marks } = req.body;

    if (id < 0 || id >= data.marks.length) {
        return res.status(404).json({ error: 'Student not found' });
    }

    if (marks === undefined || marks === null || isNaN(marks)) {
        return res.status(400).json({ error: 'Valid marks value is required' });
    }

    data.marks[id] = marks;
    saveData();

    res.json({
        success: true,
        message: `Marks for ${data.names[id]} have been updated!`,
        student: {
            id: id,
            name: data.names[id],
            marks: data.marks[id]
        }
    });
});

// Export all data
app.get('/api/export', (req, res) => {
    const exportData = {
        students: data.names.map((name, index) => ({
            id: index,
            name: name,
            marks: data.marks[index]
        })),
        exportDate: new Date().toLocaleString(),
        totalStudents: data.names.length
    };

    res.json(exportData);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        totalStudents: data.names.length,
        timestamp: new Date().toLocaleString()
    });
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║  Student Management System Running    ║
║  ✓ Server: http://localhost:${PORT}        ║
║  ✓ API: http://localhost:${PORT}/api     ║
╚═══════════════════════════════════════╝
    `);
});
