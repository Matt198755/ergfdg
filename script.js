/* --------------------------------------------------------------
   1️⃣ Type‑writer effect for the hero heading
   -------------------------------------------------------------- */
const typeWriterText = "vsrp ot";
const typeSpeed = 120;               // ms per character
let i = 0;

function typeWriter() {
    if (i < typeWriterText.length) {
        document.getElementById("typewriter").textContent += typeWriterText.charAt(i);
        i++;
        setTimeout(typeWriter, typeSpeed);
    } else {
        // Remove the cursor after finishing
        document.getElementById("typewriter").style.borderRight = "none";
    }
}
typeWriter();

/* --------------------------------------------------------------
   2️⃣ Particle background (very lightweight)
   -------------------------------------------------------------- */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

// Resize canvas to match the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialise particles
function initParticles(count = 120) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();
