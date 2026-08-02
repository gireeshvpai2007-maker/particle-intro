// ===============================
// Gireesh Portfolio Particle Engine
// ===============================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

const mouse = {
    x: undefined,
    y: undefined,
    radius: 160
};

// ===============================
// Canvas Resize
// ===============================

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", () => {

    resizeCanvas();

    createParticles();

});

// ===============================
// Retina Support
// ===============================

const dpr = window.devicePixelRatio || 1;

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;

ctx.scale(dpr, dpr);

canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

// ===============================
// Mouse
// ===============================

window.addEventListener("mousemove", e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave", () => {

    mouse.x = undefined;
    mouse.y = undefined;

});

// ===============================
// Particle
// ===============================

class Particle {

    constructor() {

        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;

        this.size = Math.random() * 2 + 1;

        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        // Bounce

        if (this.x < 0 || this.x > window.innerWidth)
            this.vx *= -1;

        if (this.y < 0 || this.y > window.innerHeight)
            this.vy *= -1;

        // Mouse repel

        if (mouse.x !== undefined) {

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {

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

        ctx.fillStyle = "rgba(125,211,252,0.9)";

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#38bdf8";

        ctx.fill();

    }

}

// ===============================
// Create Particles
// ===============================

function createParticles() {

    particles = [];

    const count = Math.floor(

        (window.innerWidth * window.innerHeight) / 12000

    );

    for (let i = 0; i < count; i++) {

        particles.push(

            new Particle()

        );

    }

}

createParticles();

// ===============================
// Draw Connections
// ===============================

function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(125,211,252,${1 - dist / 130})`;

                ctx.lineWidth = 0.7;

                ctx.moveTo(

                    particles[i].x,
                    particles[i].y

                );

                ctx.lineTo(

                    particles[j].x,
                    particles[j].y

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
        window.innerWidth,
        window.innerHeight

    );

    for (const particle of particles) {

        particle.update();

        particle.draw();

    }

    connectParticles();

    requestAnimationFrame(

        animate

    );

}

animate();
