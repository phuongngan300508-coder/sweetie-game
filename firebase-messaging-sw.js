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
// QUAN TRỌNG: Cấu hình hiển thị khi web đóng
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Nhận tin nhắn ngầm:', payload);

    // Xử lý dữ liệu linh hoạt (vì Firebase Console gửi payload khác với API tự viết)
    const notificationTitle = payload.notification?.title || payload.data?.title || "SWEETIE GAME WORLD";
    
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || "Bạn có tin nhắn mới nè!",
        icon: "https://i.postimg.cc/tT02mCHG/2389bc09-a043-4993-bdde-88877aefccbb.png", 
        image: "https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png",
        badge: "https://i.postimg.cc/tT02mCHG/2389bc09-a043-4993-bdde-88877aefccbb.png",
        data: payload.data,
        color: "#ffb6c1"
    };

    // Lệnh này bắt buộc phải có return để đánh thức thiết bị
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
