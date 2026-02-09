# Scholar - Student Performance Analytics (HTML/CSS/JS Version)

A fully functional HTML/CSS/JavaScript implementation of the Scholar student performance analytics platform, converted from the original Next.js/React application.

## Features

- **Authentication System**: Login with role-based access (Student/Faculty)
- **Student Dashboard**:
  - Current GPA and target GPA tracking
  - Attendance rate monitoring
  - Assignment completion tracking
  - Performance trend visualization
  - Recent exam scores
  - Risk factors and strengths analysis
  - Personalized recommendations
- **Faculty Dashboard**:
  - Class overview with key metrics
  - At-risk student identification
  - Performance trend over time
  - Risk distribution analysis
  - Attendance and assignment completion tracking
  - Detailed at-risk students table
- **Interactive Charts**: Powered by Chart.js
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## File Structure

```
student-performance-analytics-html/
├── index.html              # Login page
├── student-dashboard.html  # Student dashboard
├── faculty-dashboard.html  # Faculty dashboard
├── styles.css             # All styling
├── app.js                 # Authentication and app logic
├── mockData.js            # Mock data for demo
├── charts.js              # Chart.js configurations
└── README.md              # This file
```

## How to Run

1. **Simple Method**: Just open `index.html` in your web browser
   - Double-click the `index.html` file
   - Or right-click and select "Open with" your preferred browser

2. **Local Server Method** (Recommended for best experience):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Python 2
   python -m SimpleHTTPServer 8000

   # Or using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```
   Then open your browser and navigate to `http://localhost:8000`

## Demo Credentials

### Faculty Login
- **Email**: prof.johnson@university.edu
- **Password**: faculty123

### Student Login
- **Email**: alex.smith@university.edu
- **Password**: student123

## Features Implemented

### Authentication
- Mock authentication system using localStorage
- Role-based routing (Student/Faculty)
- Logout functionality

### Student Dashboard
- ✅ Key metrics cards (GPA, Attendance, Assignments)
- ✅ Performance trend line chart
- ✅ GPA progress doughnut chart
- ✅ Exam scores bar chart
- ✅ Risk factors and strengths lists
- ✅ Personalized recommendations
- ✅ At-risk alert banner

### Faculty Dashboard
- ✅ Class statistics cards
- ✅ Performance trend chart with dual y-axis
- ✅ Risk distribution pie chart
- ✅ Attendance analysis bar chart
- ✅ At-risk students table
- ✅ Critical alert for at-risk students

### Design & UX
- ✅ Fully responsive layout
- ✅ Professional color scheme
- ✅ Card-based UI design
- ✅ Interactive hover effects
- ✅ Alert notifications
- ✅ Mobile-friendly navigation

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Variables, Flexbox, and Grid
- **Vanilla JavaScript**: ES6+ features
- **Chart.js 4.4.1**: Interactive data visualizations
- **LocalStorage API**: Client-side data persistence

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --color-primary: #3b82f6;
    --color-danger: #ef4444;
    --color-success: #22c55e;
    /* ... more colors */
}
```

### Modifying Data
Edit the mock data in `mockData.js`:
- User credentials in `MOCK_USERS`
- Student data in `MOCK_STUDENTS`
- Performance metrics in `MOCK_PERFORMANCE_METRICS`
- Class statistics in `CLASS_STATISTICS`

### Adding New Features
- HTML structure: Edit the respective `.html` files
- Styling: Add CSS rules in `styles.css`
- Logic: Add JavaScript functions in `app.js`
- Charts: Configure new charts in `charts.js`

## Known Limitations

- No backend server (all data is client-side)
- Authentication is mock-based (not secure for production)
- Data persistence limited to localStorage
- No real-time updates

## Future Enhancements

- Backend API integration
- Real authentication system
- Database connectivity
- Real-time notifications
- PDF report generation
- Email functionality
- Advanced filtering and search
- Dark mode toggle

## Notes

- This is a demo application with mock data
- Not intended for production use without proper backend integration
- All data is stored in browser localStorage
- Clear browser data to reset the application

## License

This is a demonstration project converted from the original Scholar application.

## Support

For issues or questions, please refer to the original project documentation or contact the development team.
