// Limpeza automática de Service Worker legado em localhost/navegadores
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      // Notifica ou recarrega para limpar cache do navegador se necessário
      clients.forEach((client) => {
        if ("navigate" in client && client.url) {
          // opcional
        }
      });
    })
  );
});
