/* --------------------------------------------------------------
   1️⃣ Type‑writer effect – runs only if an element
       with ID "typewriter" exists (home page)
   -------------------------------------------------------------- */
const typeWriterTarget = document.getElementById('typewriter');
if (typeWriterTarget) {
    const txt = "vsrp ot";
    const speed = 120;               // ms per character
    let i = 0;

    function typeWriter() {
        if (i < txt.length) {
            typeWriterTarget.textContent += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // remove the cursor once typing is finished
            typeWriterTarget.style.borderRight = 'none';
        }
    }
    typeWriter();
}

/* --------------------------------------------------------------
   2️⃣ Particle background – draws tiny moving dots
   -------------------------------------------------------------- */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Resize canvas to full window size
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
            // wrap around screen edges
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

    function initParticles(count = 110) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
}
