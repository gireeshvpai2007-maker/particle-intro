// ===============================
// PARTICLE INTRO
// Gireesh V Pai
// ===============================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 140
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});

// ===============================
// Mouse
// ===============================

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

// ===============================
// Particle Class
// ===============================

class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;

        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce from edges
        if (this.x <= 0 || this.x >= canvas.width)
            this.speedX *= -1;

        if (this.y <= 0 || this.y >= canvas.height)
            this.speedY *= -1;

        // Mouse interaction
        if (mouse.x !== null) {

            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                this.x += dx / 18;
                this.y += dy / 18;
            }
        }
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(125,211,252,${this.opacity})`;

        ctx.fill();
    }
}

// ===============================
// Initialize
// ===============================

function initParticles() {

    particles = [];

    let count = Math.floor((canvas.width * canvas.height) / 12000);

    for (let i = 0; i < count; i++) {

        particles.push(new Particle());

    }

}

initParticles();

// ===============================
// Connections
// ===============================

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = dx * dx + dy * dy;

            if (distance < 120 * 120) {

                let opacity = 1 - distance / (120 * 120);

                ctx.strokeStyle =
                    `rgba(125,211,252,${opacity * 0.25})`;

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

// ===============================
// Animation
// ===============================

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let particle of particles) {

        particle.update();

        particle.draw();

    }

    connectParticles();

    requestAnimationFrame(animate);

}

animate();
