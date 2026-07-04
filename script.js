/*=========================================
            ELEMENTS
=========================================*/

const loader = document.getElementById("loader");

const openBtn = document.getElementById("openBtn");

const leftDoor = document.getElementById("leftDoor");

const rightDoor = document.getElementById("rightDoor");

const hero = document.getElementById("hero");

const opening = document.getElementById("opening");

const music = document.getElementById("music");

const typing = document.getElementById("typing");

const goldLight = document.getElementById("goldLight");

const petals = document.getElementById("petals");

const fireworks = document.getElementById("fireworks");

const doorWrapper = document.getElementById("doorWrapper");
const openLetter = document.getElementById("openLetter");

const letter = document.getElementById("letter");

const envelope = document.getElementById("envelope");

const letterPaper = document.getElementById("letterPaper");

const gallery = document.getElementById("gallery");

const timeline = document.getElementById("timeline");

const proposal = document.getElementById("proposal");

const celebration = document.getElementById("celebration");

const ending = document.getElementById("ending");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");


/*=========================================
            LOADER
=========================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1800);

});


/*=========================================
        MESSAGE
=========================================*/

const message =

`Thank you for filling my life with endless love,
laughter, and unforgettable memories.

Happy Anniversary,
My Beautiful Allu ❤️

I Love You More Every Day.`;



/*=========================================
        TYPING EFFECT
=========================================*/

let typeIndex = 0;

function typeMessage() {

    if (typeIndex < message.length) {

        typing.innerHTML += message.charAt(typeIndex);

        typeIndex++;

        setTimeout(typeMessage, 45);

    }

}


/*=========================================
        OPEN DOOR
=========================================*/

openBtn.addEventListener("click", () => {

    music.play();

    openDoor();

});


/*=========================================
        DOOR FUNCTION
=========================================*/

function openDoor() {

    goldLight.style.opacity = "1";

    goldLight.style.transform = "translate(-50%,-50%) scaleX(10)";

    leftDoor.style.transformOrigin = "left";

    rightDoor.style.transformOrigin = "right";

    leftDoor.style.transform =

        "perspective(1200px) rotateY(-105deg)";

    rightDoor.style.transform =

        "perspective(1200px) rotateY(105deg)";

    createPetals();

    setTimeout(showHero, 1800);

}


/*=========================================
        SHOW HERO
=========================================*/

function showHero() {

    opening.style.display = "none";

    hero.classList.remove("hiddenSection");

    hero.classList.add("show");

    window.scrollTo({

        top: hero.offsetTop,

        behavior: "smooth"

    });

    typeMessage();

}

openLetter.addEventListener("click", () => {

    letter.classList.remove("hiddenSection");
    letter.classList.add("show");

    window.scrollTo({
        top: letter.offsetTop,
        behavior: "smooth"
    });

});


/*=========================================
        OPEN LETTER PAPER
        (FIX: envelope previously had no
        click handler at all, so the actual
        letter text never appeared)
=========================================*/

envelope.addEventListener("click", () => {

    letterPaper.classList.add("paper-show");

    setTimeout(() => {

        letterPaper.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, 300);

});


/*=========================================
        SCROLL REVEAL FOR GALLERY,
        TIMELINE & PROPOSAL
        (FIX: CSS classes existed but no
        JS ever added "show" to trigger them,
        so these sections stayed invisible
        forever)
=========================================*/

const revealTargets = document.querySelectorAll(".reveal-section");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.15 });

revealTargets.forEach((target) => revealObserver.observe(target));


/*=========================================
        PETALS
=========================================*/

function createPetals() {

    for (let i = 0; i < 40; i++) {

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.innerHTML =

            ["🌹", "🌸", "💮", "❤️"][Math.floor(Math.random() * 4)];

        petal.style.left =

            Math.random() * 100 + "vw";

        petal.style.fontSize =

            (20 + Math.random() * 20) + "px";

        petal.style.animationDuration =

            (4 + Math.random() * 3) + "s";

        petals.appendChild(petal);

        setTimeout(() => {

            petal.remove();

        }, 7000);

    }

}


/*=========================================
        FIREWORKS
        (FIX: #fireworks container existed
        in HTML but was never populated by
        any JS)
=========================================*/

function spawnFireworks() {

    const colors = ["#ffd76b", "#ff6b9d", "#d4af37", "#ffffff"];

    for (let i = 0; i < 35; i++) {

        const fw = document.createElement("div");

        fw.className = "firework";

        const color = colors[Math.floor(Math.random() * colors.length)];

        fw.style.left = Math.random() * 100 + "vw";

        fw.style.top = Math.random() * 70 + "vh";

        fw.style.background = color;

        fw.style.boxShadow = `0 0 14px 4px ${color}`;

        fireworks.appendChild(fw);

        setTimeout(() => {

            fw.remove();

        }, 1300);

    }

}


/*=========================================
        PROPOSAL: YES / NO
        (FIX: neither button had any
        listener before, so the proposal
        screen was a dead end)
=========================================*/

yesBtn.addEventListener("click", () => {

    dodgeActive = false;

    proposal.classList.remove("show");

    proposal.classList.add("hiddenSection");

    celebration.classList.remove("hiddenSection");

    celebration.classList.add("show");

    window.scrollTo({

        top: celebration.offsetTop,

        behavior: "smooth"

    });

    spawnFireworks();

    setTimeout(spawnFireworks, 600);

    setTimeout(() => {

        celebration.classList.remove("show");

        celebration.classList.add("hiddenSection");

        ending.classList.remove("hiddenSection");

        ending.classList.add("show");

        window.scrollTo({

            top: ending.offsetTop,

            behavior: "smooth"

        });

    }, 4000);

});

/*=========================================
        NO BUTTON: INFINITE DODGE
        (FIX: this is the part you asked to
        change. The old version only reacted
        on mouseenter, so it dodged a couple
        of times and then stopped working
        once it left its box. This version
        tracks the live cursor position, so
        no matter how many times the cursor
        moves toward it, it teleports to a
        new random spot on the page, a safe
        distance away, forever)
=========================================*/

let dodgeActive = true;

const DODGE_THRESHOLD = 110;

function escapeNoBtn(cursorX, cursorY) {

    if (!dodgeActive) return;

    if (proposal.classList.contains("hiddenSection")) return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(cursorX - centerX, cursorY - centerY);

    if (distance < DODGE_THRESHOLD) {

        const margin = 20;

        const maxX = window.innerWidth - rect.width - margin;

        const maxY = window.innerHeight - rect.height - margin;

        const newX = margin + Math.random() * (maxX - margin);

        const newY = margin + Math.random() * (maxY - margin);

        noBtn.style.position = "fixed";

        noBtn.style.left = newX + "px";

        noBtn.style.top = newY + "px";

        noBtn.style.transform = "none";

    }

}

document.addEventListener("mousemove", (e) => {

    escapeNoBtn(e.clientX, e.clientY);

});

document.addEventListener("touchmove", (e) => {

    const touch = e.touches[0];

    if (touch) escapeNoBtn(touch.clientX, touch.clientY);

}, { passive: true });

document.addEventListener("touchstart", (e) => {

    const touch = e.touches[0];

    if (touch) escapeNoBtn(touch.clientX, touch.clientY);

});


/*=========================================
        HERO FLOAT
=========================================*/

setInterval(() => {

    hero.style.transform =

        "translateY(" +

        Math.sin(Date.now() / 800) * 4 +

        "px)";

}, 30);
