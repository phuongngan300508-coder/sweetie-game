// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDV8KseaFVPPcpEU0-jrqqxnGG6xLyJGfE",
    projectId: "sweetie-game-world",
    messagingSenderId: "439230414082",
    appId: "1:439230414082:web:e89f8e86fda4c4dbd2161b"
});

const messaging = firebase.messaging();

// Đây là hàm quan trọng nhất: Xử lý khi có tin nhắn từ Firebase gửi về lúc web ĐANG TẮT
messaging.onBackgroundMessage((payload) => {
    console.log('Đã nhận thông báo ngầm:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || "https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png",
        // Giữ nguyên phần data của Henry để chứa link/id game
        data: payload.data 
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// --- PHẦN BỔ SUNG ĐỂ CLICK VÀO LÀ MỞ WEB ---
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Đóng thông báo khi click

    // Link web của Henry
    const urlToOpen = 'https://phuongngan300508-coder.github.io/sweetie-game/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(function(windowClients) {
                // Nếu game đang mở ở tab nào đó thì nhảy vào tab đó (Focus)
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Nếu chưa mở thì mở tab mới
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
