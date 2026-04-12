importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDV8KseaFVPPcpEU0-jrqqxnGG6xLyJGfE",
    projectId: "sweetie-game-world",
    messagingSenderId: "439230414082",
    appId: "1:439230414082:web:e89f8e86fda4c4dbd2161b"
});

const messaging = firebase.messaging();

// --- THÊM ĐOẠN NÀY ĐỂ GIỮ SW LUÔN ACTIVE ---
self.addEventListener('install', (event) => {
    // Ép Service Worker mới thay thế cái cũ ngay lập tức
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    // Chiếm quyền điều khiển tất cả các tab ngay khi kích hoạt
    event.waitUntil(clients.claim());
});

// QUAN TRỌNG: Cấu hình hiển thị khi web đóng
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Nhận tin nhắn ngầm:', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || "SWEETIE GAME WORLD";
    
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || "Bạn có tin nhắn mới nè!",
        icon: "https://i.postimg.cc/90bRT1Bt/dee8a7e0-5d40-4779-bca4-c88381257a1e.jpg", 
        image: "https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png",
        color: "#ffb6c1", 
        badge: "https://i.postimg.cc/90bRT1Bt/dee8a7e0-5d40-4779-bca4-c88381257a1e.jpg",
        data: payload.data,
        vibrate: [200, 100, 200]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Xử lý click vào thông báo
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const urlToOpen = 'https://phuongngan300508-coder.github.io/sweetie-game/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(urlToOpen);
        })
    );
});
