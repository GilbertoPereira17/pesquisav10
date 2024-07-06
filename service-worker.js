const cacheName = 'site-static-v10';
const assets = [
    '/',
    '/pesquisav10/index.html',
    '/pesquisav10/styles.css',
    '/pesquisav10/script.js',
    '/pesquisav10/manifest.json',
    '/pesquisav10/images/icon-192x192.png',
    '/pesquisav10/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});