const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    '/index.html',
    'index.html',
    'assets/js/task.js',
    'assets/js/pouchDb.js',
    'assets/materialize/css/materialize.min.css',
    'assets/css/style.css',
    'assets/img/lightning.png',
    'assets/materialize/js/materialize.min.js',
    'assets/js/main.js'
]

const APP_SHELL_INMUTABLE = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js',
    'https://www.gstatic.com/firebasejs/5.8.0/firebase.js',
    'https://apis.google.com/js/platform.js',
    ''
];

// función para limitar la cantidad de items del cache, en este caso lo usamos sólo para el dinámico

function limpiarCache(cacheName, limitItems) {
    caches.open(cacheName).then(cache => {
        return cache.keys().then(keys => {
            if (keys.length > limitItems) {
                // para ir borrando el último recursivamente hasta que se llegue al límite
                cache.delete(keys[0])
                    .then(limpiarCache(cacheName, limitItems))
            }
        })
    })
}

self.addEventListener('install', e => {
    // console.log(e);
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    });

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    });



    e.waitUntil(Promise.all([cacheInmutable, cacheStatic]));
})

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            console.log('key: ', key)
            // borrado de versiones viejas de cache
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key)
            }
            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key)
            }
        })
    })

    e.waitUntil(respuesta);
})



// self.addEventListener('fetch', e => {
//     console.log('Fetch: ' + e.request.url);
//     let respuesta;

//     respuesta = caches.open(STATIC_CACHE).then(cache => {
//         fetch(e.request).then(res => {
//             cache.put(e.request, res);
//         });
//         return cache.match(e.request)
//     })
//     e.respondWith(respuesta);
// })

// https://classroom.udacity.com/courses/ud899/lessons/6381510081/concepts/79795d07-7e22-40ca-b238-0d942ea3d054

