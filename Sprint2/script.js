/* ==========================
   LOADING MESSAGES
========================== */

const loadingMessages = [
    "Anılar yükleniyor...",
    "Playlist hazırlanıyor...",
    "Chapter One açılıyor...",
    "Bugünün mesajı seçiliyor...",
    "Özel içerikler hazırlanıyor...",
    "Güzel anılar hatırlanıyor...",
    "Müzikler hazırlanıyor...",
    "Project R başlatılıyor..."
];

const loadingText = document.getElementById("loadingText");
loadingText.textContent =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

/* ==========================
   SCREENS
========================== */

const splashScreen = document.getElementById("splashScreen");
const homeScreen = document.getElementById("homeScreen");
const chapterScreen = document.getElementById("chapterScreen");

/* ==========================
   SPLASH
========================== */

setTimeout(() => {

    splashScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

}, 3000);

/* ==========================
   GREETING
========================== */

const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if (hour >= 5 && hour < 12) {

    greeting.innerHTML = "☀️ Günaydın";

} else if (hour >= 12 && hour < 18) {

    greeting.innerHTML = "🌤️ İyi Günler";

} else if (hour >= 18 && hour < 22) {

    greeting.innerHTML = "🌇 İyi Akşamlar";

} else {

    greeting.innerHTML = "🌙 İyi Geceler";

}

/* ==========================
   LOVE COUNTER
========================== */

const loveCounter = document.getElementById("loveCounter");

const startDate = new Date("2026-06-13");

const today = new Date();

const days = Math.floor(
    (today - startDate) / (1000 * 60 * 60 * 24)
);

loveCounter.innerHTML = `${days} gündür birlikte ❤️`;

/* ==========================
   CARD ANIMATION
========================== */

const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    setTimeout(() => {

        card.classList.add("show");

    }, index * 150);

});

/* ==========================
   PAGE NAVIGATION
========================== */

const chapterCard = document.getElementById("chapterCard");
const backButton = document.getElementById("backButton");

chapterCard.addEventListener("click", () => {

    homeScreen.classList.add("hidden");
    chapterScreen.classList.remove("hidden");

});

backButton.addEventListener("click", () => {

    chapterScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

});
