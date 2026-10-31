console.count("SCRIPT START");
console.log("SCRIPT START", Date.now());
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
const coupleSetupScreen = document.getElementById("coupleSetupScreen");
const coupleManagementScreen = document.getElementById("coupleManagementScreen");
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



/*setTimeout(() => {

    // splashScreen.classList.add("hidden");
    // homeScreen.classList.remove("hidden");
    // console.log(homeScreen.className);
 
     //console.log("Splash classes:", splashScreen.className);
     //console.log("Home classes:", homeScreen.className);

    splashScreen.classList.add("hidden");
    authScreen.classList.remove("hidden");



}, 3000);*/
setTimeout(async () => {
    const supabase = window.projectRSupabase;

    splashScreen.classList.add("hidden");
    authScreen.classList.add("hidden");
    homeScreen.classList.add("hidden");
    coupleSetupScreen.classList.add("hidden");
    coupleManagementScreen.classList.add("hidden");

    if (!supabase) {
        authScreen.classList.remove("hidden");
        authMessage.textContent = "Sunucu bağlantısı kurulamadı.";
        return;
    }

    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        if (!data.session) {
            authScreen.classList.remove("hidden");
            return;
        }

        await routeUserAfterLogin(data.session.user);

    } catch (error) {
        console.error("Oturum yönlendirme hatası:", error);

        authScreen.classList.remove("hidden");
        authMessage.textContent =
            "Oturum kontrol edilirken bir hata oluştu.";
    }
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
const nicknames = [



    "Aşkım ❤️",

    "Güzelim 🥰",

    "Çiçeğim 🌸",

    "Hayatım 🫶",

    "Canım 🤍",

    "Yavrum 🤗",

    "Aşk ❤️",

    "Bitanem 💖",

    "Sevgilim 💘",

];

const nickname = document.getElementById("nickname");

let lastNickname = localStorage.getItem("lastNickname");

let randomNickname;

do {

    randomNickname = nicknames[Math.floor(Math.random() * nicknames.length)];

} while (randomNickname === lastNickname && nicknames.length > 1);

nickname.textContent = randomNickname;

localStorage.setItem("lastNickname", randomNickname);

/* ==========================
   LOVE COUNTER
========================== */

const loveCounter = document.getElementById("loveCounter");

// İlişkinin başlangıcı
const startDate = new Date("2026-06-13T00:00:00");

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

        tapText.textContent = "Tekrar oku ❤️";


    } else {

        tapText.textContent = "Zarfa dokun ";


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
const bucketInput = document.getElementById("bucketInput");
const addBucketButton = document.getElementById("addBucketButton");

const defaultBucketItems = [
    {
        text: "İlk ayımız",
        done: true,
        completedAt: new Date("2026-07-13").toLocaleDateString("tr-TR"),
        locked: true
    },
    { text: "Sakura zamanı Japonya tatili", done: false, completedAt: null },
    { text: "Balkan turu", done: false, completedAt: null },
    { text: "Tekrar aynı şehirde yaşamaya başlamak", done: false, completedAt: null },
    { text: "Doğu ekspresi turu", done: false, completedAt: null },
    { text: "Birlikte Yalın konsere gitmek", done: false, completedAt: null }
];

let bucketItems = [];
let bucketLoading = false;

function getBucketSupabase() {
    return window.projectRSupabase;
}

async function loadBucketItems() {
    const supabase = getBucketSupabase();

    if (!supabase) {
        bucketList.textContent = "Sunucu bağlantısı kurulamadı.";
        return;
    }

    const { data: userData, error: userError } =
        await supabase.auth.getUser();

    if (userError || !userData.user) {
        bucketList.textContent = "Listeyi görmek için giriş yapmalısın.";
        return;
    }

    const { data: memberships, error: membershipError } = await supabase
        .from("couple_members")
        .select("couple_id")
        .eq("user_id", userData.user.id)
        .limit(1);

    if (membershipError || !memberships?.length) {
        console.error("Çift bilgisi alınamadı:", membershipError);
        bucketList.textContent = "Henüz bir çifte bağlı değilsin.";
        return;
    }

    const coupleId = memberships[0].couple_id;

    const { data, error } = await supabase
        .from("bucket_items")
        .select("id, couple_id, created_by, title, is_completed, completed_at, created_at")
        .eq("couple_id", coupleId)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Bucket List yüklenemedi:", error);
        bucketList.textContent = "Liste yüklenemedi. Tekrar deneyebilirsin.";
        return;
    }

    bucketItems = (data || []).map(item => ({
        id: item.id,
        text: item.title,
        done: item.is_completed,
        completedAt: item.completed_at
            ? new Date(item.completed_at).toLocaleDateString("tr-TR")
            : null,
        locked: false
    }));

    // İlk ayımız maddesini mevcut listede yoksa başlangıçta göster.
    if (!bucketItems.some(item => item.text === "İlk ayımız")) {
        bucketItems.unshift({
            text: "İlk ayımız",
            done: true,
            completedAt: new Date("2026-07-13").toLocaleDateString("tr-TR"),
            locked: true
        });
    }

    renderBucket();
}

function renderBucket() {
    bucketList.innerHTML = "";

    bucketItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "bucketItem";

        const icon = document.createElement("span");
        icon.className = "bucketIcon";
        icon.textContent = item.done ? "☑" : "☐";

        const content = document.createElement("div");
        content.style.flex = "1";

        const title = document.createElement("div");
        title.textContent = item.text;
        if (item.done) title.className = "bucketDone";

        content.appendChild(title);

        if (item.completedAt) {
            const date = document.createElement("small");
            date.style.opacity = "0.6";
            date.textContent = `❤️ Gerçekleştirilme Tarihi: ${item.completedAt}`;
            content.appendChild(date);
        }

        div.append(icon, content);

        div.addEventListener("click", async () => {
            if (item.locked || bucketLoading) return;

            const supabase = getBucketSupabase();
            if (!supabase) return;

            bucketLoading = true;

            try {
                const nextDone = !item.done;
                const completedAt = nextDone ? new Date().toISOString() : null;

                const { error } = await supabase
                    .from("bucket_items")
                    .update({
                        is_completed: nextDone,
                        completed_at: completedAt
                    })
                    .eq("id", item.id);

                if (error) throw error;

                await loadBucketItems();
            } catch (error) {
                console.error("Madde güncellenemedi:", error);
                alert("Madde güncellenemedi. Tekrar deneyebilirsin.");
            } finally {
                bucketLoading = false;
            }
        });

        bucketList.appendChild(div);
    });
}

addBucketButton.onclick = async () => {
    const text = bucketInput.value.trim();
    if (!text || bucketLoading) return;

    const supabase = getBucketSupabase();
    if (!supabase) {
        alert("Sunucu bağlantısı kurulamadı.");
        return;
    }

    bucketLoading = true;
    addBucketButton.disabled = true;

    try {
        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError || !userData.user) {
            throw userError || new Error("Önce giriş yapmalısın.");
        }

        const { data: memberships, error: membershipError } = await supabase
            .from("couple_members")
            .select("couple_id")
            .eq("user_id", userData.user.id)
            .limit(1);

        if (membershipError) throw membershipError;
        if (!memberships?.length) {
            throw new Error("Henüz bir çifte bağlı değilsin.");
        }

        const { error } = await supabase
            .from("bucket_items")
            .insert({
                couple_id: memberships[0].couple_id,
                created_by: userData.user.id,
                title: text,
                is_completed: false
            });

        if (error) throw error;

        bucketInput.value = "";
        await loadBucketItems();
    } catch (error) {
        console.error("Madde eklenemedi:", error);
        alert(error.message || "Madde eklenemedi.");
    } finally {
        bucketLoading = false;
        addBucketButton.disabled = false;
    }
};

bucketInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addBucketButton.click();
});

bucketCard.onclick = async () => {
    stats.bucketOpens++;
    saveStats();

    homeScreen.classList.add("hidden");
    bucketScreen.classList.remove("hidden");

    await loadBucketItems();
};

bucketBack.onclick = () => {
    bucketScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
};

renderBucket();
// ================================
// NOTES SYSTEM
// ================================

const notesCard = document.getElementById("notesCard");
const notesScreen = document.getElementById("notesScreen");
const notesBack = document.getElementById("notesBack");
const noteInput = document.getElementById("noteInput");
const sendNoteButton = document.getElementById("sendNoteButton");
const notesContainer = document.getElementById("notesContainer");
const notesMessage = document.getElementById("notesMessage");

let notesLoading = false;

async function getNotesContext() {
    const supabase = window.projectRSupabase;

    if (!supabase) {
        throw new Error("Sunucu bağlantısı kurulamadı.");
    }

    const { data: userData, error: userError } =
        await supabase.auth.getUser();

    if (userError) throw userError;
    if (!userData.user) {
        throw new Error("Not bırakmak için giriş yapmalısın.");
    }

    const { data: memberships, error } = await supabase
        .from("couple_members")
        .select("couple_id")
        .eq("user_id", userData.user.id)
        .limit(1);

    if (error) throw error;

    if (!memberships?.length) {
        throw new Error("Henüz bir çifte bağlı değilsin.");
    }

    return {
        supabase,
        user: userData.user,
        coupleId: memberships[0].couple_id
    };
}
async function loadUnreadNoteCount() {
    const badge = document.getElementById("unreadNotesBadge");

    if (!badge) return;

    try {
        const { supabase, user, coupleId } = await getNotesContext();

        const { count, error } = await supabase
            .from("notes")
            .select("id", { count: "exact", head: true })
            .eq("couple_id", coupleId)
            .eq("recipient_id", user.id)
            .is("read_at", null);

        if (error) throw error;

        badge.textContent = count || 0;
        badge.classList.toggle("hidden", !count);

    } catch (error) {
        console.error("Okunmamış not sayısı alınamadı:", error);
        badge.classList.add("hidden");
    }
}

async function loadNotes() {
    notesContainer.textContent = "Notlar yükleniyor...";

    try {
        const { supabase, coupleId, user } = await getNotesContext();

        const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("couple_id", coupleId)
            .order("created_at", { ascending: false });

        if (error) throw error;

        notesContainer.innerHTML = "";

        const senderIds = [...new Set(data.map(note => note.sender_id))];

        const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("id, display_name")
            .in("id", senderIds);

        if (profileError) throw profileError;

        const profileMap = new Map(
            (profiles || []).map(profile => [profile.id, profile.display_name])
        );
        // Gelen okunmamış notları otomatik okundu işaretle
        const unreadNoteIds = (data || [])
            .filter(note => note.recipient_id === user.id && !note.read_at)
            .map(note => note.id);

        if (unreadNoteIds.length > 0) {
            const { error: updateError } = await supabase
                .from("notes")
                .update({ read_at: new Date().toISOString() })
                .in("id", unreadNoteIds)
                .eq("recipient_id", user.id);

            if (updateError) throw updateError;

            // Arayüzde de hemen okundu olarak göster
            data.forEach(note => {
                if (unreadNoteIds.includes(note.id)) {
                    note.read_at = new Date().toISOString();
                }
            });
        }

        if (!data?.length) {
            notesContainer.innerHTML = "<p class='empty-message'>Henüz bir not yok.</p>";
            await loadUnreadNoteCount();
            return;
        }

        data.forEach(note => {
            const card = document.createElement("div");
            card.className = "noteItem";

            const isReceived = note.recipient_id === user.id;
            const isUnread = isReceived && !note.read_at;

            if (isUnread) {
                card.classList.add("unreadNote");
            }

            const heading = document.createElement("strong");

            const senderName = profileMap.get(note.sender_id) || "Bilinmeyen kullanıcı";

            heading.textContent = `❤️ ${senderName} bıraktı`;
            const message = document.createElement("p");
            message.textContent = note.content;

            const date = document.createElement("small");
            date.textContent = new Date(note.created_at)
                .toLocaleString("tr-TR");

            const status = document.createElement("small");

            if (isReceived) {
                status.textContent = isUnread
                    ? "● Okunmadı"
                    : "✓ Okundu";
            } else {
                status.textContent = "Gönderildi";
            }

            card.append(heading, message, date, status);

            if (isUnread) {
                card.addEventListener("click", async () => {
                    try {
                        const { error } = await supabase
                            .from("notes")
                            .update({
                                read_at: new Date().toISOString()
                            })
                            .eq("id", note.id)
                            .is("read_at", null);

                        if (error) throw error;

                        await loadNotes();

                    } catch (error) {
                        console.error("Not okundu olarak işaretlenemedi:", error);
                    }
                });
            }

            notesContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Notlar yüklenemedi:", error);
        notesContainer.textContent =
            error.message || "Notlar yüklenemedi.";
    }
    await loadUnreadNoteCount();
}
async function getRecipientId(supabase, coupleId, currentUserId) {
    const { data, error } = await supabase
        .from("couple_members")
        .select("user_id")
        .eq("couple_id", coupleId)
        .neq("user_id", currentUserId)
        .limit(1);

    if (error) throw error;

    if (!data?.length) {
        throw new Error("Henüz diğer kullanıcı hesabı çifte katılmamış.");
    }

    return data[0].user_id;
}

sendNoteButton.onclick = async () => {
    const content = noteInput.value.trim();

    if (!content || notesLoading) return;

    notesLoading = true;
    sendNoteButton.disabled = true;
    notesMessage.textContent = "Not gönderiliyor...";

    try {
        const { supabase, user, coupleId } = await getNotesContext();

        const recipientId = await getRecipientId(
            supabase,
            coupleId,
            user.id
        );

        const { error } = await supabase
            .from("notes")
            .insert({
                couple_id: coupleId,
                sender_id: user.id,
                recipient_id: recipientId,
                content: content
            });

        if (error) throw error;

        noteInput.value = "";
        notesMessage.textContent = "Notun bırakıldı. ❤️";

        await loadNotes();

    } catch (error) {
        console.error("Not gönderilemedi:", error);
        notesMessage.textContent = error.message || "Not gönderilemedi.";
    } finally {
        notesLoading = false;
        sendNoteButton.disabled = false;
    }
};
notesCard.onclick = async () => {
    homeScreen.classList.add("hidden");
    notesScreen.classList.remove("hidden");

    await loadNotes();
    await loadUnreadNoteCount();
};

notesBack.onclick = async () => {
    notesScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    await loadUnreadNoteCount();
};


const memoryCard = document.getElementById("memoryCard");
const memoryScreen = document.getElementById("memoryScreen");
const memoryBack = document.getElementById("memoryBack");

const memoryPhotoInput = document.getElementById("memoryPhotoInput");
const memoryGrid = document.getElementById("memoryGrid");
const memoryMessage = document.getElementById("memoryMessage");

memoryCard.onclick = async () => {
    stats.memoryOpens++;
    saveStats();

    homeScreen.classList.add("hidden");
    memoryScreen.classList.remove("hidden");

    await loadMemoryPhotos();
};

memoryBack.onclick = () => {
    memoryScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
};

async function loadMemoryPhotos() {
    memoryGrid.textContent = "Anılarımız yükleniyor... 💙";

    try {
        const { supabase, coupleId } = await getNotesContext();

        const { data, error } = await supabase
            .from("memory_photos")
            .select("*")
            .eq("couple_id", coupleId)
            .order("created_at", { ascending: false });

        if (error) throw error;

        memoryGrid.innerHTML = "";

        if (!data || data.length === 0) {
            memoryGrid.textContent = "Henüz fotoğraf eklenmemiş. 💙";
            return;
        }

        for (const photo of data) {
            const { data: imageData, error: imageError } =
                await supabase.storage
                    .from("couple-photos")
                    .createSignedUrl(photo.storage_path, 3600);

            if (imageError) {
                console.error("Fotoğraf açılamadı:", imageError);
                continue;
            }

            const image = document.createElement("img");
            image.className = "memoryPhoto";
            image.src = imageData.signedUrl;
            image.alt = "Birlikte bir anımız";
            image.loading = "lazy";

            memoryGrid.appendChild(image);
        }

        if (!memoryGrid.children.length) {
            memoryGrid.textContent = "Fotoğraflar görüntülenemedi.";
        }

    } catch (error) {
        console.error("Memory Box yüklenemedi:", error);
        memoryGrid.textContent = error.message || "Fotoğraflar yüklenemedi.";
    }
}

memoryPhotoInput.addEventListener("change", async () => {
    const files = Array.from(memoryPhotoInput.files || []);

    if (!files.length) return;

    memoryMessage.textContent = "";

    try {
        const { supabase, coupleId, user } = await getNotesContext();

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                throw new Error("Yalnızca fotoğraf dosyaları yükleyebilirsin.");
            }

            if (file.size > 10 * 1024 * 1024) {
                throw new Error("Fotoğraf boyutu 10 MB'ı geçemez.");
            }

            const extension = file.name.split(".").pop().toLowerCase();
            const filePath = `${coupleId}/${crypto.randomUUID()}.${extension}`;

            const { error: uploadError } = await supabase.storage
                .from("couple-photos")
                .upload(filePath, file, {
                    contentType: file.type,
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { error: insertError } = await supabase
                .from("memory_photos")
                .insert({
                    couple_id: coupleId,
                    uploaded_by: user.id,
                    storage_path: filePath
                });

            if (insertError) {
                await supabase.storage
                    .from("couple-photos")
                    .remove([filePath]);

                throw insertError;
            }
        }

        memoryMessage.textContent = "Fotoğraflarımız eklendi! 💙";
        await loadMemoryPhotos();

    } catch (error) {
        console.error("Fotoğraf yüklenemedi:", error);
        memoryMessage.textContent = error.message || "Fotoğraf yüklenemedi.";
    } finally {
        memoryPhotoInput.value = "";
    }
});


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

    "Sen mutluysan ben de mutluyum.",

    "Sana her zaman destek olacağım.",

    "Seninle geçirdiğim her an çok değerli.",

    "Seni çok özledim. ❤️",

    "İyi ki hayatımdasın. Her şey seninle daha güzel.",

    "Gözlerine baktığımda zaman sanki duruyor.",

];
const specialMessages = {

    "14-2": "💘 Mutlu Sevgililer Günü sevgilim. Seni çok seviyorum. ❤️",

    "20-6": "🎂 İyi ki doğdun güzelim. Hayatımın en güzel insanı iyi ki doğmuş. ❤️",

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

        document.getElementById("devVisits").textContent = stats.visits;

        document.getElementById("devChapter").textContent = stats.chapterReads;

        document.getElementById("devPlaylist").textContent = stats.playlistOpens;

        document.getElementById("devMemory").textContent = stats.memoryOpens;

        document.getElementById("devBucket").textContent = stats.bucketOpens;

        document.getElementById("devEgg").textContent = stats.easterEggFound;

        document.getElementById("devFirstVisit").textContent =
            stats.firstVisit
                ? new Date(stats.firstVisit).toLocaleString("tr-TR")
                : "-";

        document.getElementById("devLastVisit").textContent =
            stats.lastVisit
                ? new Date(stats.lastVisit).toLocaleString("tr-TR")
                : "-";

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

const milestoneModal = document.getElementById("milestoneModal");

const milestoneTitle = document.getElementById("milestoneTitle");

const milestoneMessage = document.getElementById("milestoneMessage");

const milestones = {

    1: {
        title: "❤️ Hoş Geldin",
        message: "Project R'ye ilk girişin.\nUmarım her ziyaretin güzel bir anıya dönüşür aşk."
    },

    5: {
        title: "🌸 5. Ziyaret",
        message: "Sanırım burayı sevmeye başladın."
    },

    10: {
        title: "✨ 10. Ziyaret",
        message: "Bu hikâyenin bir parçası olduğun için teşekkür ederim."
    },

    25: {
        title: "💙 25. Ziyaret",
        message: "Artık Project R küçük bir alışkanlık oldu sanırım sende."
    },

    50: {
        title: "🎉 50. Ziyaret",
        message: "Yarım yüze ulaştık.\nDaha nice anılara..."
    },

    100: {
        title: "👑 100. Ziyaret",
        message: "Bunu gerçekten beklemiyordum.\nİyi ki varsın."
    }

};



function checkMilestone() {

    const visit = stats.visits;

    const shown = JSON.parse(localStorage.getItem("shownMilestones") || "[]");

    if (milestones[visit] && !shown.includes(visit)) {

        milestoneTitle.textContent = milestones[visit].title;

        milestoneMessage.innerHTML = milestones[visit].message.replace(/\n/g, "<br>");

        milestoneModal.classList.remove("hidden");

        shown.push(visit);

        localStorage.setItem("shownMilestones", JSON.stringify(shown));

    }

}

milestoneModal.onclick = () => {

    milestoneModal.classList.add("hidden");

}



saveStats();

checkMilestone();

console.log(
    "Project R Supabase:",
    window.projectRSupabase ? "Başlatıldı" : "Başlatılamadı"
);


/* ==========================
   SUPABASE AUTHENTICATION
========================== */

const authScreen = document.getElementById("authScreen");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authDisplayName = document.getElementById("authDisplayName");
const displayNameLabel = document.getElementById("displayNameLabel");
const authSubmit = document.getElementById("authSubmit");
const authToggle = document.getElementById("authToggle");
const authMessage = document.getElementById("authMessage");

let isRegisterMode = false;

authToggle.addEventListener("click", () => {
    isRegisterMode = !isRegisterMode;

    authTitle.textContent = isRegisterMode ? "Hesap Oluştur" : "Giriş Yap";
    authSubmit.textContent = isRegisterMode ? "Kayıt Ol" : "Giriş Yap";

    authToggle.textContent = isRegisterMode
        ? "Zaten hesabın var mı? Giriş yap"
        : "Hesabın yok mu? Kayıt ol";

    authDisplayName.hidden = !isRegisterMode;
    displayNameLabel.hidden = !isRegisterMode;

    authDisplayName.required = isRegisterMode;
    authPassword.autocomplete = isRegisterMode
        ? "new-password"
        : "current-password";

    authMessage.textContent = "";
});

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const supabase = window.projectRSupabase;

    if (!supabase) {
        authMessage.textContent = "Sunucu bağlantısı kurulamadı.";
        return;
    }

    const email = authEmail.value.trim();
    const password = authPassword.value;
    const displayName = authDisplayName.value.trim();

    authSubmit.disabled = true;
    authMessage.textContent = "İşlem yapılıyor...";

    try {
        let result;

        if (isRegisterMode) {
            result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: displayName
                    }
                }
            });
        } else {
            result = await supabase.auth.signInWithPassword({
                email,
                password
            });
        }

        if (result.error) {
            throw result.error;
        }

        if (isRegisterMode && !result.data.session) {
            authMessage.textContent =
                "Kayıt oluşturuldu. E-posta doğrulamasını tamamlayıp giriş yap.";
            return;
        }

        authMessage.textContent = isRegisterMode
            ? "Hesap oluşturuldu."
            : "Giriş başarılı.";

        if (result.data.session) {
            await routeUserAfterLogin(result.data.session.user);
        }

    } catch (error) {
        console.error("Kimlik doğrulama hatası:", error);

        authMessage.textContent =
            error.message || "İşlem sırasında bir hata oluştu.";
    } finally {
        authSubmit.disabled = false;
    }
});
const joinCoupleForm = document.getElementById("joinCoupleForm");
const inviteCodeInput = document.getElementById("inviteCodeInput");
const joinCoupleButton = document.getElementById("joinCoupleButton");
const coupleSetupMessage = document.getElementById("coupleSetupMessage");

joinCoupleForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const supabase = window.projectRSupabase;
    const inviteCode = inviteCodeInput.value.trim();

    if (!inviteCode) {
        coupleSetupMessage.textContent = "Davet kodunu girmelisin.";
        return;
    }

    joinCoupleButton.disabled = true;
    coupleSetupMessage.textContent = "Davet kodu kontrol ediliyor...";

    try {
        const { data, error } = await supabase.rpc(
            "join_couple_space",
            {
                input_code: inviteCode
            }
        );

        if (error) {
            throw error;
        }

        coupleSetupMessage.textContent = "Ortak alana başarıyla katıldın!";

        const { data: userData, error: userError } =
            await supabase.auth.getUser();

        if (userError) {
            throw userError;
        }

        await routeUserAfterLogin(userData.user);

    } catch (error) {
        console.error("Davetle katılma hatası:", error);

        coupleSetupMessage.textContent =
            error.message || "Davet koduyla katılırken bir hata oluştu.";
    } finally {
        joinCoupleButton.disabled = false;
    }
});
const createInviteButton = document.getElementById("createInviteButton");
const inviteResult = document.getElementById("inviteResult");
const generatedInviteCode = document.getElementById("generatedInviteCode");
const copyInviteButton = document.getElementById("copyInviteButton");
const inviteMessage = document.getElementById("inviteMessage");

let currentInviteCode = "";

async function loadActiveInvite() {
    const supabase = window.projectRSupabase;

    try {
        const { data, error } = await supabase.rpc("get_active_couple_invite");

        if (error) throw error;

        if (data) {
            currentInviteCode = data;
            generatedInviteCode.textContent = data;
            inviteResult.classList.remove("hidden");
            inviteMessage.textContent = "Aktif davet kodun yüklendi.";
        } else {
            currentInviteCode = "";
            inviteResult.classList.add("hidden");
            inviteMessage.textContent = "Henüz aktif bir davetin yok.";
        }
    } catch (error) {
        console.error("Aktif davet yüklenemedi:", error);
        inviteMessage.textContent = "Mevcut davet kodu yüklenemedi.";
    }
}

createInviteButton.addEventListener("click", async () => {
    const supabase = window.projectRSupabase;

    createInviteButton.disabled = true;
    inviteMessage.textContent = "Davet kodu oluşturuluyor...";
    inviteResult.classList.add("hidden");

    try {
        const { data, error } = await supabase.rpc("create_couple_invite");

        if (error) {
            throw error;
        }

        currentInviteCode = data;
        generatedInviteCode.textContent = data;
        inviteResult.classList.remove("hidden");
        inviteMessage.textContent = "Davet kodun hazır.";
    } catch (error) {
        console.error("Davet oluşturma hatası:", error);
        inviteMessage.textContent =
            error.message || "Davet kodu oluşturulamadı.";
    } finally {
        createInviteButton.disabled = false;
    }
});

copyInviteButton.addEventListener("click", async () => {
    if (!currentInviteCode) return;

    try {
        await navigator.clipboard.writeText(currentInviteCode);
        inviteMessage.textContent = "Davet kodu kopyalandı.";
    } catch (error) {
        console.error("Kopyalama hatası:", error);
        inviteMessage.textContent = "Kod kopyalanamadı. Elle kopyalayabilirsin.";
    }
});
async function routeUserAfterLogin(user) {
    const supabase = window.projectRSupabase;

    const { data: membership, error } = await supabase
        .from("couple_members")
        .select("couple_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    splashScreen.classList.add("hidden");
    authScreen.classList.add("hidden");
    homeScreen.classList.add("hidden");
    coupleSetupScreen.classList.add("hidden");
    coupleManagementScreen.classList.add("hidden");

    if (!membership) {
        coupleSetupScreen.classList.remove("hidden");
        return;
    }

    if (membership.role === "owner") {
        const { data: members, error: membersError } = await supabase
            .from("couple_members")
            .select("user_id")
            .eq("couple_id", membership.couple_id);

        if (membersError) {
            throw membersError;
        }

        if (members.length < 2) {
            coupleManagementScreen.classList.remove("hidden");
            await loadActiveInvite();
            return;
        }
    }

    homeScreen.classList.remove("hidden");
}



async function logoutUser() {
    const supabase = window.projectRSupabase;
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Çıkış yapılamadı:", error);
        alert("Çıkış yapılırken hata oluştu.");
        return;
    }

    window.location.reload();
}
