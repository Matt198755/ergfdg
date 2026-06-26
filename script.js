/* --------------------------------------------------------------
   1️⃣ Type‑writer animation for the main heading
   -------------------------------------------------------------- */
const text = "vsrp ot";
const typingSpeed = 120; // ms per character
let i = 0;
const target = document.getElementById("typewriter");

function typeWriter() {
    if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Stop caret blink after finishing
        target.style.borderRight = "none";
    }
}
typeWriter();

/* --------------------------------------------------------------
   2️⃣ Simple particle background (canvas)
   -------------------------------------------------------------- */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

// Resize canvas to fill the viewport
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle definition
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
        this.opacity = Math.random() * 0.5 + 0.2;
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
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialise particles
function initParticles(count = 120) {
    particles = [];
    for (let j = 0; j < count; j++) particles.push(new Particle());
}
initParticles();

/* Animation loop */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();
