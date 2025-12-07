# Productivity App

A modern, feature-rich productivity application that combines task management and note-taking capabilities in a clean, intuitive interface with full dark mode support.

## Features

### Task Management
- Create, edit, and delete tasks with a streamlined interface
- Mark tasks as complete with visual feedback
- Track active and completed tasks in real-time
- Persistent storage using browser localStorage

### Note Taking
- Create detailed notes with titles and content
- Edit existing notes through a modal interface
- Delete notes with a single click
- Organized card-based layout for easy scanning

### User Interface
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent preferences
- **Live Statistics**: Real-time counters for total tasks, completed tasks, and notes
- **Smooth Interactions**: Hover effects and transition animations for enhanced user experience
- **Custom Scrollbars**: Styled scrollbars that match the application theme

## Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling with Tailwind CSS framework
- **JavaScript (ES6+)**: Vanilla JavaScript for application logic
- **Bootstrap Icons**: Icon library for visual elements
- **LocalStorage API**: Client-side data persistence

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No additional dependencies or build tools required

### Installation

1. Clone or download the project files
2. Ensure all three files are in the same directory:
   - `index.html`
   - `script.js`
   - (Styles are included via CDN)
3. Open `index.html` in your web browser

## Usage

### Managing Tasks
1. Enter a task description in the input field
2. Click "Add" or press Enter to create the task
3. Click the checkbox to mark tasks as complete
4. Hover over tasks to reveal edit and delete buttons
5. Click the edit icon to modify a task
6. Click the delete icon to remove a task

### Creating Notes
1. Click the "New Note" button in the Notes section
2. Enter a title and content in the modal dialog
3. Click "Save Note" to store the note
4. Click on edit or delete icons (visible on hover) to modify or remove notes

### Theme Switching
- Click the "Dark" button to enable dark mode
- Click the "Light" button to return to light mode
- Your preference is saved automatically

## Data Persistence

All tasks and notes are stored locally in your browser using the localStorage API. Data persists across browser sessions but is specific to the domain and browser being used.

## Browser Compatibility

The application is compatible with all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- LocalStorage API
- CSS custom properties (variables)

## Support

For issues, questions, or suggestions regarding the application, please ensure your browser's localStorage is enabled and that you're using an up-to-date browser version for optimal performance.

---

**Built with modern web technologies for a seamless productivity experience.**
