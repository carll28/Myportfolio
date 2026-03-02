// PROJECT IMAGE DATA

const projectData = {
    portfolio: ["portfolio1.png","portfolio2.png","portfolioHome.png"],
    robot: ["robot.1.jpg","robot.2.jpg","robot.3.jpg"]
};


// SELECT ELEMENTS
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalImages = document.getElementById("modalImages");
const profile = document.querySelector('.profile-img'); // PROFILE IMAGE

// MODAL FUNCTIONALITY

// OPEN modal dynamically based on clicked project
cards.forEach(card => {
    card.addEventListener("click", () => {
        const projectKey = card.getAttribute("data-project");
        const images = projectData[projectKey];

        // Clear old images
        modalImages.innerHTML = "";

        // Add new images
        images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = projectKey;
            modalImages.appendChild(img);
        });

        modal.classList.add("show");
    });
});

// CLOSE modal (X button)
closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

// CLOSE modal when clicking outside modal-box
modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});

// PROFILE IMAGE 3D / STRONG GLOW EFFECT
profile.addEventListener('mousemove', (e) => {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX; // -1 to 1
    const deltaY = (y - centerY) / centerY; // -1 to 1

    // Rotate profile
    const rotateX = deltaY * 10; 
    const rotateY = deltaX * 10; 
    profile.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Dynamic strong shadow/glow
    const shadowX = deltaX * 30;
    const shadowY = deltaY * 30;
    profile.style.boxShadow = `${-shadowX}px ${-shadowY}px 60px rgba(14,118,214,0.9)`;
});

// Reset profile on mouse leave
profile.addEventListener('mouseleave', () => {
    profile.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    profile.style.boxShadow = '0 0 50px rgba(14,118,214,0.8)'; 
});

// SELECT CANVAS
const canvas = document.getElementById('starBg');
const ctx = canvas.getContext('2d');

// SET CANVAS SIZE
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// CREATE STARS
const stars = [];
const numStars = 200; // number of stars

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random()  // for twinkle
    });
}

// ANIMATE STARS
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();

        // Move star downward
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.05;
        if(star.opacity < 0) star.opacity = 0;
        if(star.opacity > 1) star.opacity = 1;
    });

    requestAnimationFrame(animateStars);
}

animateStars();