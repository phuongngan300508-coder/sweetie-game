// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.x.x/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDV8KseaFVPPcpEU0-jrqqxnGG6xLyJGfE",
  projectId: "sweetie-game-world",
  messagingSenderId: "439230414082",
  appId: "1:439230414082:web:e89f8e86fda4c4dbd2161b"
});

const messaging = firebase.messaging();

// Xử lý khi thông báo đến trong khi web đang đóng
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.postimg.cc/J7bjdwFH/Gemini-Generated-Image-(3).png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
