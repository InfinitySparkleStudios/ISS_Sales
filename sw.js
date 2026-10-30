// Minimal service worker: makes the keepsake installable; always uses the network (memories are private and live).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
