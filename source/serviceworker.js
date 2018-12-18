addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open('piet.me')
    .then(PietCache => {
      PietCache.addAll([
       '/offline.html'
      ]);
     })
  );
});
