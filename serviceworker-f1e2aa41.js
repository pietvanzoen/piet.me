addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open('piet.me')
    .then( PietCache => {
      PietCache.addAll([
       '/offline.html',
       '/path/to/stylesheet.css',
       '/path/to/javascript.js',
         '/path/to/image.jpg'
      ]); // end addAll
     }) // end open.then
  ); // end waitUntil
}); // end addEventListener
