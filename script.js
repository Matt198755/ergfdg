/* --------------------------------------------------------------
   1️⃣ Particle background (runs on every page)
   -------------------------------------------------------------- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

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
        // wrap around edges
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

// create a pool of particles
let particles = [];
function initParticles(count = 120) {
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

/* --------------------------------------------------------------
   2️⃣ Type‑writer effect – only runs on pages that have
       an element with id="typewriter" (i.e., the home page)
   -------------------------------------------------------------- */
const twElement = document.getElementById('typewriter');
if (twElement) {
    const txt = "vsrp ot";
    let idx = 0;
    const speed = 120; // ms per character

    function type() {
        if (idx < txt.length) {
            twElement.textContent += txt.charAt(idx);
            idx++;
            setTimeout(type, speed);
        } else {
            // after typing, hide the cursor
            twElement.style.borderRight = 'none';
        }
    }
    type();
}
