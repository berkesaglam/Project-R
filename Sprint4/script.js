const stats = JSON.parse(localStorage.getItem("projectRStats")) || {

    visits: 0,

    chapterReads: 0,

    playlistOpens: 0,

    memoryOpens: 0,

    bucketOpens: 0,

    easterEggFound: 0,

    firstVisit: null,

    lastVisit: null

};

function saveStats() {

    localStorage.setItem(
        "projectRStats",
        JSON.stringify(stats)
    );

}
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

// App started
stats.visits++;

if (!stats.firstVisit) {
    stats.firstVisit = Date.now();
}

stats.lastVisit = Date.now();

saveStats();

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

// İlişkinin başlangıcı
const startDate = new Date("2026-06-13T17:12:00");

const totalDays = Math.floor(
    (new Date() - startDate) / (1000 * 60 * 60 * 24)
);

function updateLoveCounter() {

    const now = new Date();

    let diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff %= (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    loveCounter.innerHTML =
        `❤️ ${days}g • ${hours}sa • ${minutes}dk • ${seconds}sn`;

}

updateLoveCounter();

setInterval(updateLoveCounter, 1000);

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

/* ==========================
   CHAPTER ONE
========================== */

const chapterCard = document.getElementById("chapterCard");

const closeLetter = document.getElementById("closeLetter");

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const tapText = document.getElementById("tapText");

let opened = false;

/* Home -> Chapter */

chapterCard.onclick = () => {

    homeScreen.classList.add("hidden");
    chapterScreen.classList.remove("hidden");

    if (localStorage.getItem("chapterOneRead")) {

        tapText.textContent = "Read again ❤️";

    } else {

        tapText.textContent = "Tap the envelope";

    }

};

/* Envelope */

envelope.onclick = () => {


    if (opened) return;

    stats.chapterReads++;

    saveStats();

    opened = true;


    localStorage.setItem("chapterOneRead", "true");

    tapText.style.opacity = "0";

    /* Açık zarf */

    envelope.src = "assets/images/envelope_open.png";

    /* Kağıt çıksın */

    setTimeout(() => {

        letter.classList.add("show");

    }, 350);

    /* Zarf kaybolsun */

    setTimeout(() => {

        envelope.classList.add("hide");

    }, 900);

    /* Blur + büyüme */

    setTimeout(() => {

        document.body.classList.add("blur");

        letter.classList.add("fullscreen");

    }, 1200);

};

/* Geri */

backButton.onclick = () => {

    if (!opened) {

        chapterScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
        return;

    }

    /* Blur kalk */

    document.body.classList.remove("blur");

    /* Kağıt küçül */

    letter.classList.remove("fullscreen");

    setTimeout(() => {

        /* Zarf geri gelsin */

        envelope.classList.remove("hide");

        envelope.src = "assets/images/envelope_open.png";

        /* Kağıt aşağı insin */

        letter.classList.remove("show");

    }, 500);

    setTimeout(() => {

        /* Zarf kapansın */

        envelope.src = "assets/images/envelope_closed.png";

    }, 1000);

    setTimeout(() => {

        tapText.style.opacity = "1";

        opened = false;

        chapterScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

    }, 1400);

};
const playlistCard = document.getElementById("playlistCard");
const playlistScreen = document.getElementById("playlistScreen");
const playlistBack = document.getElementById("playlistBack");

const hosPlaylist = document.getElementById("hosPlaylist");
const mePlaylist = document.getElementById("mePlaylist");
playlistCard.onclick = () => {

    homeScreen.classList.add("hidden");

    playlistScreen.classList.remove("hidden");

}
playlistBack.onclick = () => {

    playlistScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}
hosPlaylist.onclick = () => {
    stats.playlistOpens++;

    saveStats();

    hosPlaylist.style.transform = "scale(.96)";

    setTimeout(() => {

        window.open(
            "https://music.youtube.com/playlist?list=PLTK7rWp4bSWVNkBXRlWXfDOkDoyeryGvH",
            "_blank"
        );

        hosPlaylist.style.transform = "scale(1)";

    }, 250);

}
mePlaylist.onclick = () => {

    mePlaylist.style.transform = "scale(.96)";

    setTimeout(() => {

        window.open(
            "https://music.youtube.com/playlist?list=PL9oQ3ZnU-hYfq6x6Ooqv3gujQDhEYvB8O",
            "_blank"
        );

        mePlaylist.style.transform = "scale(1)";

    }, 250);

}
const bucketCard = document.getElementById("bucketCard");
const bucketScreen = document.getElementById("bucketScreen");
const bucketBack = document.getElementById("bucketBack");
const bucketList = document.getElementById("bucketList");

const bucketItems = [

    { text: "İlk kahvemiz", done: true },

    { text: "İlk ay dönümümüz", done: false },

    { text: "Birlikte gün doğumu izlemek", done: false },

    { text: "Aynı şehirde yaşamak", done: false },

    { text: "Beraber tatile gitmek", done: false },

    { text: "Birlikte konsere gitmek", done: false },

    { text: "İlk evimiz", done: false },

    { text: "Dünyayı birlikte gezmek", done: false }

];

bucketItems.forEach(item => {

    const div = document.createElement("div");

    div.className = "bucketItem";

    if (item.done) {

        div.innerHTML = `
            <span class="bucketIcon">☑</span>
            <span class="bucketDone">${item.text}</span>
        `;

    } else {

        div.innerHTML = `
            <span class="bucketIcon">☐</span>
            <span>${item.text}</span>
        `;

    }

    bucketList.appendChild(div);

});

bucketCard.onclick = () => {
    stats.bucketOpens++;

    saveStats();

    homeScreen.classList.add("hidden");

    bucketScreen.classList.remove("hidden");

}

bucketBack.onclick = () => {

    bucketScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}

const memoryCard = document.getElementById("memoryCard");

const memoryScreen = document.getElementById("memoryScreen");

const memoryBack = document.getElementById("memoryBack");

memoryCard.onclick = () => {
    stats.memoryOpens++;

    saveStats();

    homeScreen.classList.add("hidden");

    memoryScreen.classList.remove("hidden");

}

memoryBack.onclick = () => {

    memoryScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}

const dailyNote = document.getElementById("dailyNote");

const notes = [

    "Bugün de aklımdasın. ❤️",

    "Gülüşün bütün günümü güzelleştiriyor.",

    "İyi ki varsın.",

    "Sesini duymak bile yetiyor.",

    "Her geçen gün seni daha çok seviyorum.",

    "Seninle konuştuğum her dakika en sevdiğim an oluyor.",

    "Birlikte yaşayacağımız günleri sabırsızlıkla bekliyorum.",

    "Umarım bugün yüzünden gülümseme eksik olmaz.",

    "Bugün kendine iyi davran. ❤️",

    "Sen mutluysan ben de mutluyum."

];
const specialMessages = {

    "14-2": "💘 Mutlu Sevgililer Günü sevgilim. Seni çok seviyorum. ❤️",

    "20-6": "🎂 İyi ki doğdun sevgilim. Hayatımın en güzel insanı iyi ki doğmuş. ❤️",

    "25-3": "🎂 Bugün benim doğum günüm ama en güzel hediyem yine sensin. ❤️",

    "13-6": "🎉 Bugün hikâyemizin yıl dönümü. İyi ki o gün 'biz' olduk.",

    "24-12": "🎄 Seninle yeni bir yıla gireceğim için çok mutluyum.",

    "31-12": "🎆 Bu yılın en güzel anıları seninleydi.",

    "1-1": "🎊 Yeni yılda da ilk dileğim yine sensin."

};

const milestoneMessages = {

    30: "🌱 Bugün birlikte 30 günü geride bıraktık. ❤️",

    50: "⭐ 50 gün... Daha nice günlere.",

    100: "💯 Tam 100 gündür birlikteyiz. Her gününe değer. ❤️",

    180: "🌹 Yarım yılı birlikte geride bıraktık.",

    365: "🎉 Bugün bir yılımız doldu. Seni çok seviyorum.",

    500: "💖 500 gün... Hikâyemiz daha yeni başlıyor.",

    730: "✨ İkinci yılımız kutlu olsun sevgilim.",

    1000: "💎 Bin gün... Kelimeler yetmiyor."

};

const now = new Date();

const day = now.getDate();

const month = now.getMonth() + 1;

const key = `${day}-${month}`;

/* Önce özel gün */

if (specialMessages[key]) {

    dailyNote.textContent = specialMessages[key];

}

/* Sonra kilometre taşı */

else if (milestoneMessages[totalDays]) {

    dailyNote.textContent = milestoneMessages[totalDays];

}

/* Her ayın 13'ü */

else if (day === 13) {

    const monthsTogether =

        (now.getFullYear() - 2026) * 12 +

        (month - 6) + 1;

    dailyNote.textContent =

        `❤️ Bugün ${monthsTogether}. ayımız. İyi ki varsın.`;

}

/* Normal mesaj */

else {

    dailyNote.textContent =

        notes[Math.floor(Math.random() * notes.length)];

}
/* ==========================
   DEVELOPER MODE
========================== */

const logo = document.querySelector(".logo");

const developerModal =
    document.getElementById("developerModal");

const closeDeveloper =
    document.getElementById("closeDeveloper");

let clickCount = 0;

logo.addEventListener("click", () => {

    clickCount++;

    if (clickCount === 3) {

        stats.easterEggFound++;

        saveStats();

        developerModal.classList.remove("hidden");

        clickCount = 0;

    }

});

closeDeveloper.onclick = () => {

    developerModal.classList.add("hidden");

};
/*==========================
   DEVELOPER UTILITIES
==========================*/
window.projectR = {

    stats,

    resetStats() {

        localStorage.removeItem("projectRStats");

        location.reload();

    },

    showStats() {

        console.table(stats);

    }

};
