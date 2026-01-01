// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle.querySelector('i');

// Check for saved user preference on load
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = htmlElement.getAttribute('data-theme');
    theme = theme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateIcon(theme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links li a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// --- Infinite Carousel Logic ---

const track = document.querySelector('.services-showcase');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Define the card width + gap (300px width + 20px gap)
const cardWidth = 320; 

// Function to update the active class (always highlights the center visible item)
const updateActive = () => {
    const cards = document.querySelectorAll('.service-item');
    cards.forEach(card => card.classList.remove('active'));
    // In this specific layout, the 2nd item (index 1) usually sits in the visual "center" 
    // after the DOM shift. You can adjust index [1] to [2] depending on screen size.
    if(cards[1]) cards[1].classList.add('active');
};

// Initial active set
updateActive();

// Move Next (Right Arrow)
nextBtn.addEventListener('click', () => {
    // 1. Animate the track moving left
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${cardWidth}px)`;

    // 2. Wait for animation to finish, then shuffle DOM
    setTimeout(() => {
        track.style.transition = "none"; // Disable transition for instant jump
        
        // Take the first item and move it to the very end
        const firstItem = track.firstElementChild;
        track.appendChild(firstItem);

        // Reset the track position instantly
        track.style.transform = "translateX(0)";
        
        // Update styling
        updateActive();
    }, 500); // 500ms matches the CSS transition time
});

// Move Prev (Left Arrow)
prevBtn.addEventListener('click', () => {
    // 1. Disable transition to instantly prep the position
    track.style.transition = "none";
    
    // 2. Move the last item to the very start
    const lastItem = track.lastElementChild;
    track.prepend(lastItem);

    // 3. Shift track to the left instantly so the user doesn't see the change yet
    track.style.transform = `translateX(-${cardWidth}px)`;

    // 4. Slight delay to allow DOM to update, then animate back to 0
    setTimeout(() => {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = "translateX(0)";
        updateActive();
    }, 10);
});

// --- Google Form Submission Handling with Loader ---
let submitted = false;
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

// Listen for the form submission
contactForm.addEventListener('submit', function() {
    submitted = true;
    
    // Disable the button to prevent multiple clicks
    submitBtn.disabled = true;
    
    // Change button text to a spinner
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Optional: Add a class to change style (opacity, etc.)
    submitBtn.classList.add('btn-loading');
});

// When the hidden iframe loads (success)
document.getElementById('hidden_iframe').onload = function() {
    if (submitted) {
        // 1. Show success alert
        alert("Thank you! Your message has been sent to Orconix.");
        
        // 2. Reset the form
        contactForm.reset();
        
        // 3. Reset the button back to normal
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit';
        submitBtn.classList.remove('btn-loading');
        
        // 4. Reset flag
        submitted = false;
    }
};


// ... [Keep your existing Theme Toggle, Mobile Menu, and Form logic here] ...

// --- Scroll Animation Logic ---

// 1. Select all elements we want to animate
// You can add more selectors here if you want other things to animate
const scrollElements = document.querySelectorAll(
    '.hero-content, .section-title, .about-main, .glass-card, .footer-grid, .section-header'
);

// 2. Add the 'hidden' class to them immediately
scrollElements.forEach((el) => el.classList.add('hidden'));

// 3. Create the Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Element entered viewport: Show it
            entry.target.classList.add('show');
        } else {
            // Element left viewport: Hide it (reset animation)
            // This creates the "vice versa" effect
            entry.target.classList.remove('show');
        }
    });
}, {
    // Threshold: How much of the item must be visible to trigger?
    // 0.1 means trigger when 10% of the item is visible
    threshold: 0.1 
});

// 4. Tell observer to track all our elements
scrollElements.forEach((el) => observer.observe(el));