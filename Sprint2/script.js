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

/* ==========================
   CHAPTER ONE
========================== */

const chapterCard = document.getElementById("chapterCard");

const closeLetter=document.getElementById("closeLetter");

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const tapText = document.getElementById("tapText");

let opened = false;

/* Home -> Chapter */

chapterCard.onclick = () => {

    homeScreen.classList.add("hidden");
    chapterScreen.classList.remove("hidden");

};

/* Envelope */

envelope.onclick = () => {

    if (opened) return;

    opened = true;

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
playlistCard.onclick=()=>{

    homeScreen.classList.add("hidden");

    playlistScreen.classList.remove("hidden");

}
playlistBack.onclick=()=>{

    playlistScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}
hosPlaylist.onclick=()=>{

    hosPlaylist.style.transform="scale(.96)";

    setTimeout(()=>{

        window.open(
            "https://music.youtube.com/playlist?list=PLTK7rWp4bSWVNkBXRlWXfDOkDoyeryGvH",
            "_blank"
        );

        hosPlaylist.style.transform="scale(1)";

    },250);

}
mePlaylist.onclick=()=>{

    mePlaylist.style.transform="scale(.96)";

    setTimeout(()=>{

        window.open(
            "https://music.youtube.com/playlist?list=PL9oQ3ZnU-hYfq6x6Ooqv3gujQDhEYvB8O",
            "_blank"
        );

        mePlaylist.style.transform="scale(1)";

    },250);

}
const bucketCard = document.getElementById("bucketCard");
const bucketScreen = document.getElementById("bucketScreen");
const bucketBack = document.getElementById("bucketBack");
const bucketList = document.getElementById("bucketList");

const bucketItems = [

    { text:"İlk kahvemiz", done:true },

    { text:"İlk ay dönümümüz", done:false },

    { text:"Birlikte gün doğumu izlemek", done:false },

    { text:"Aynı şehirde yaşamak", done:false },

    { text:"Beraber tatile gitmek", done:false },

    { text:"Birlikte konsere gitmek", done:false },

    { text:"İlk evimiz", done:false },

    { text:"Dünyayı birlikte gezmek", done:false }

];

bucketItems.forEach(item=>{

    const div=document.createElement("div");

    div.className="bucketItem";

    if(item.done){

        div.innerHTML=`
            <span class="bucketIcon">☑</span>
            <span class="bucketDone">${item.text}</span>
        `;

    }else{

        div.innerHTML=`
            <span class="bucketIcon">☐</span>
            <span>${item.text}</span>
        `;

    }

    bucketList.appendChild(div);

});

bucketCard.onclick=()=>{

    homeScreen.classList.add("hidden");

    bucketScreen.classList.remove("hidden");

}

bucketBack.onclick=()=>{

    bucketScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}

const memoryCard=document.getElementById("memoryCard");

const memoryScreen=document.getElementById("memoryScreen");

const memoryBack=document.getElementById("memoryBack");

memoryCard.onclick=()=>{

    homeScreen.classList.add("hidden");

    memoryScreen.classList.remove("hidden");

}

memoryBack.onclick=()=>{

    memoryScreen.classList.add("hidden");

    homeScreen.classList.remove("hidden");

}


