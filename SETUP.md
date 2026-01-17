# Student Management System

A web-based student management system with a Node.js backend and modern frontend interface, integrated with C++ backend capabilities.

## 📁 Project Structure

```
BuildAfterMath/
├── index.html          # Frontend UI
├── styles.css          # Styling
├── script.js           # Frontend logic (now connected to backend)
├── server.js           # Node.js Express backend
├── package.json        # Dependencies
├── data.json           # Persistent data storage
├── Apurv-1/
│   ├── student.cpp     # Original C++ program
│   └── AP.Cpp
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   cd /workspaces/BuildAfterMath
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## ✨ Features

### Frontend
- **View Student IDs** - Display all students in database
- **New Admission** - Add new students
- **Check Marks** - View marks for any student
- **Store Marks** - Update student marks
- **Export Data** - Download all student data as JSON
- Responsive design that works on all devices
- Real-time data synchronization with backend

### Backend API
The backend provides RESTful API endpoints:

- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `GET /api/students/:id` - Get specific student
- `GET /api/students/:id/marks` - Get student marks
- `PUT /api/students/:id/marks` - Update student marks
- `GET /api/export` - Export all data
- `GET /api/health` - Server health check

### Data Persistence
- All data is automatically saved to `data.json`
- Data persists between server restarts
- Fallback to local storage if server is unavailable

## 🔗 Integration with C++

The Node.js backend can be further integrated with the C++ program:

### Option 1: Direct Integration
- Modify `student.cpp` to output JSON format
- Execute it from the Node.js backend
- Parse and handle the output

### Option 2: Compile to WebAssembly
- Compile C++ to WASM using Emscripten
- Run directly in the browser

### Option 3: Create Shared Library
- Compile C++ to a .so/.dll library
- Use Node.js bindings (node-ffi, node-gyp)
- Call C++ functions directly from Node.js

## 📝 Example Usage

### Add a Student
```javascript
fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'New Student' })
})
```

### Update Marks
```javascript
fetch('http://localhost:3000/api/students/0/marks', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ marks: 95 })
})
```

### Get All Students
```javascript
fetch('http://localhost:3000/api/students')
    .then(res => res.json())
    .then(students => console.log(students))
```

## 🎨 Features Highlights

✅ Modern, responsive UI with gradient design
✅ Real-time data synchronization
✅ Automatic data persistence
✅ Graceful fallback to local storage
✅ RESTful API architecture
✅ CORS enabled for cross-origin requests
✅ Export functionality for data backup
✅ Health check endpoint

## 📱 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Development

### Running in development mode:
```bash
npm run dev
```

### Project Files Explained

| File | Purpose |
|------|---------|
| `index.html` | Main HTML structure and UI elements |
| `styles.css` | All styling and responsive layouts |
| `script.js` | Frontend logic with API integration |
| `server.js` | Express backend with API endpoints |
| `data.json` | Persistent storage of student records |

## 🔄 How It Works

1. **Frontend** displays the UI and collects user input
2. **JavaScript** sends requests to the backend API
3. **Backend** (server.js) processes requests and manages data
4. **Data persistence** saves changes to data.json
5. **Response** is sent back to frontend and displayed

## 🚀 Future Enhancements

- [ ] Integrate C++ computation engine
- [ ] Add user authentication
- [ ] Add database (MongoDB/PostgreSQL)
- [ ] Add data validation rules
- [ ] Add search and filtering
- [ ] Add edit student functionality
- [ ] Add delete student functionality

## 📄 License

This project is part of BuildAfterMath.

## 👨‍💻 Author

Created for the Student Management System project.
