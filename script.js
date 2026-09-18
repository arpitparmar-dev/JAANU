console.log("❤️ Birthday website loaded successfully.");

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- First page ---------- */
    const beginBtn = document.getElementById("beginBtn");

    if (beginBtn) {
        beginBtn.addEventListener("click", () => {
            beginBtn.disabled = true;
            createHeartExplosion();

            setTimeout(() => {
                window.location.href = "welcome.html";
            }, 750);
        });
    }

    /* ---------- Floating hearts ---------- */
    if (document.getElementById("heartContainer")) {
        setInterval(createFloatingHeart, 900);
    }

    /* ---------- Memory lightbox ---------- */
    const modal = document.getElementById("photoModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const closePhoto = document.getElementById("closePhoto");

    document.querySelectorAll(".photo-card").forEach(card => {
        card.addEventListener("click", () => {
            const image = card.querySelector("img");

            modalImage.src = image.src;
            modalCaption.textContent = card.dataset.caption || "";

            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (closePhoto) {
        closePhoto.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeModal();
    });

    /* ---------- Reason cards ---------- */
    document.querySelectorAll(".reason-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    /* ---------- Story reveal ---------- */
    const revealItems = document.querySelectorAll(".reveal");

    if (revealItems.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(item => observer.observe(item));
    }

    /* ---------- Cake ---------- */
    const flame = document.getElementById("flame");
    const wishMessage = document.getElementById("wishMessage");
    const continueBtn = document.getElementById("continueBtn");

    if (flame) {
        flame.addEventListener("click", () => {
            flame.classList.add("out");

            if (wishMessage) {
                wishMessage.classList.add("show");
            }

            createHeartExplosion();

            if (continueBtn) {
                setTimeout(() => {
                    continueBtn.classList.remove("hidden");
                }, 1000);
            }
        });
    }

    /* ---------- Final gift ---------- */
    const giftBtn = document.getElementById("giftBtn");
    const finalMessage = document.getElementById("finalMessage");

    if (giftBtn && finalMessage) {
        giftBtn.addEventListener("click", () => {
            giftBtn.classList.add("hidden");
            finalMessage.classList.remove("hidden");
            createHeartExplosion();
            createHeartExplosion();
        });
    }
});


function createFloatingHeart() {
    const container = document.getElementById("heartContainer");
    if (!container) return;

    const heart = document.createElement("div");
    heart.className = "floating-heart";

    const symbols = ["♡", "♥", "❤", "💕", "💗"];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 22) + "px";

    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), (duration + 1) * 1000);
}


function createHeartExplosion() {
    const symbols = ["❤️", "💕", "💗", "💖", "💘", "♥"];

    for (let i = 0; i < 35; i++) {
        const heart = document.createElement("div");
        heart.className = "explosion-heart";
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 350;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        heart.style.fontSize = (15 + Math.random() * 20) + "px";

        document.body.appendChild(heart);

        const animation = heart.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );

        animation.onfinish = () => heart.remove();
    }
}
