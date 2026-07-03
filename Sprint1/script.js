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

const randomIndex = Math.floor(Math.random() * loadingMessages.length);

loadingText.textContent = loadingMessages[randomIndex];

const splashScreen = document.getElementById("splashScreen");

const homeScreen = document.getElementById("homeScreen");

setTimeout(() => {

    splashScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}, 3000);
// ==============================
// Saat Bazlı Karşılama
// ==============================

const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

if (hour >= 5 && hour < 12) {

    greeting.innerHTML = "☀️ Günaydın";

}

else if (hour >= 12 && hour < 18) {

    greeting.innerHTML = "🌤️ İyi Günler";

}

else if (hour >= 18 && hour < 22) {

    greeting.innerHTML = "🌇 İyi Akşamlar";

}

else {

    greeting.innerHTML = "🌙 İyi Geceler";

}
// ==============================
// Gün Sayacı
// ==============================

const loveCounter = document.getElementById("loveCounter");

// Tanışma / Sevgili olma tarihi
const startDate = new Date("2026-06-13");

const today = new Date();

// Milisaniye farkı
const diff = today - startDate;

// Gün hesabı
const days = Math.floor(diff / (1000 * 60 * 60 * 24));

loveCounter.innerHTML = `${days} gündür birlikte ❤️`;

// ==============================
// Kart Animasyonu
// ==============================

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

    setTimeout(()=>{

        card.classList.add("show");

    },index*150);

});

const chapterCard = document.getElementById("chapterCard");

chapterCard.addEventListener("click",()=>{

    alert("Chapter One yakında açılıyor ❤️");

});
