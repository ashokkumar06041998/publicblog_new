document.addEventListener('DOMContentLoaded', () => {
    function toggleTheme() {
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
      let currentTheme = localStorage.getItem('theme');
  
      if (currentTheme === 'dayLight') {
        // Switch to dark theme
        localStorage.setItem('theme', 'dayNight');
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.className = 'fa-regular fa-sun'; // Update to moon icon
      } else {
        // Switch to light theme
        localStorage.setItem('theme', 'dayLight');
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIcon.className = 'fa-regular fa-moon'; // Update to sun icon
      }
    }
  
    function initializeTheme() {
      const storedTheme = localStorage.getItem('theme');
      const body = document.body;
      const themeIcon = document.getElementById('theme-icon');
  
      if (storedTheme === 'dayNight') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        themeIcon.className = 'fa-regular fa-sun'; // Set moon icon
      } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.className = 'fa-regular fa-moon'; // Set sun icon
      }
    }
  
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  
    initializeTheme();
  });
  