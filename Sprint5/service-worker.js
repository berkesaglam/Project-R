const CACHE_NAME = "project-r-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./script.js",

    "./manifest.json",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",

    "./assets/images/envelope_closed.png",
    "./assets/images/envelope_open.png",
    "./assets/images/hos.jpg",
    "./assets/images/me.jpg"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES_TO_CACHE))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            )

        )

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => response || fetch(event.request))

    );

});
