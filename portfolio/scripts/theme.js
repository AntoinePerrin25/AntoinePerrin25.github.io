function updateThemeIcons() {
    const moonIcon = document.querySelector('[data-icon="moon"]');
    const sunIcon = document.querySelector('[data-icon="sun"]');
    
    if (!moonIcon || !sunIcon) return;

    if (document.documentElement.classList.contains('dark')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

function initializeTheme() {
    // Check for saved theme preference or use system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Initialize theme icons
    updateThemeIcons();

    // Add click event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            updateThemeIcons();
        });
    }
}