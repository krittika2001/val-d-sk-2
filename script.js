// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the button element
    const clickBtn = document.getElementById('clickBtn');
    
    // Add click event listener
    clickBtn.addEventListener('click', function() {
        alert('Button clicked! 🎉');
        console.log('Button was clicked at:', new Date().toLocaleTimeString());
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Log a message when the page loads
    console.log('Website loaded successfully!');
    
});