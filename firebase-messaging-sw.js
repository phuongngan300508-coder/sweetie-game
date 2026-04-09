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

// 1. Xử lý khi có tin nhắn gửi về lúc web ĐANG ĐÓNG
messaging.onBackgroundMessage((payload) => {
    console.log('Đã nhận thông báo ngầm:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || "https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png",
        // Quan trọng: Gắn link vào data để khi click biết đường mà mở
        data: {
            url: payload.data?.url || 'https://phuongngan300508-coder.github.io/sweetie-game/' 
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// 2. FIX: Xử lý khi người dùng CLICK vào thông báo
self.addEventListener('notificationclick', function(event) {
    console.log('Người dùng đã click thông báo');
    
    // Đóng thông báo ngay lập tức
    event.notification.close();

    // Lấy link từ data hoặc mặc định là trang chủ của Henry
    const targetUrl = event.notification.data?.url || 'https://phuongngan300508-coder.github.io/sweetie-game/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(function(windowClients) {
            // Kiểm tra xem web của Henry có đang mở tab nào không
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // Nếu thấy tab đang mở rồi thì chỉ cần Focus (nhảy vào) tab đó
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Nếu chưa mở tab nào thì mở tab mới hoàn toàn
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
