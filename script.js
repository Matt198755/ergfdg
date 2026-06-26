/* --------------------------------------------------------------
   1️⃣ Type‑writer effect – only runs on pages that have
       an element with id="typewriter"
   -------------------------------------------------------------- */
const typeTarget = document.getElementById('typewriter');
if (typeTarget) {
    const txt = "vsrp ot";
    const speed = 120;   // ms per character
    let i = 0;
    function typeWriter() {
        if (i < txt.length) {
            typeTarget.textContent += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove the blinking cursor after the text finishes
            typeTarget.style.borderRight = 'none';
        }
    }
    typeWriter();
}

/* --------------------------------------------------------------
   2️⃣ Simple particle background (canvas)
   -------------------------------------------------------------- */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const particles = [];

    // Resize canvas to fill the window
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

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

            // Wrap around screen edges
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
    function init(count = 130) {
        particles.length = 0;
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }
    init();

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
}
