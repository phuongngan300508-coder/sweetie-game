importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDV8KseaFVPPcpEU0-jrqqxnGG6xLyJGfE",
    projectId: "sweetie-game-world",
    messagingSenderId: "439230414082",
    appId: "1:439230414082:web:e89f8e86fda4c4dbd2161b"
});

const messaging = firebase.messaging();

// Lắng nghe thông báo khi tắt web
messaging.onBackgroundMessage((payload) => {
    console.log("Nhận thông báo khi tắt web:", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png' // Henry thay bằng link ảnh logo game của bạn
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.onnotificationclick = function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("https://phuongngan300508-coder.github.io/sweetie-game/") 
        // Thay bằng link GitHub của bạn nhé
    );
};
