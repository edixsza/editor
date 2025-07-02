document.addEventListener("DOMContentLoaded", () => {
const defaultOptions = {
chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%&*",
speed: 40,
iterations: 10,
mode: "hover" // opções: 'hover', 'auto', 'view'
};

function glitchText(element, options = {}) {
const config = { ...defaultOptions, ...options };
const original = element.dataset.original || element.textContent;
const length = original.length;
let count = 0;

element.dataset.original = original;

const interval = setInterval(() => {
const newText = original
.split('')
.map((char, i) => {
if (char === ' ' || count >= config.iterations) return char;
return config.chars[Math.floor(Math.random() * config.chars.length)];
})
.join('');

element.textContent = newText;
count++;

if (count > config.iterations) {
clearInterval(interval);
element.textContent = original;
}
}, config.speed);
}

const applyEffect = (element, config) => glitchText(element, config);

document.querySelectorAll(".glitch").forEach(el => {
const mode = el.dataset.mode || defaultOptions.mode;

if (mode === "hover") {
el.addEventListener("mouseenter", () => applyEffect(el));
}

if (mode === "auto") {
applyEffect(el);
}

if (mode === "view") {
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting && !el.dataset.animated) {
el.dataset.animated = "true";
applyEffect(el);
}
});
}, { threshold: 0.2 });

observer.observe(el);
}
});
});