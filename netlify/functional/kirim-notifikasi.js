const admin = require('firebase-admin');

// Inisialisasi Firebase (pastikan env var FIREBASE_SERVICE_ACCOUNT udah diatur di Netlify)
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  } catch (error) {
    console.error('Firebase gagal nyala:', error);
  }
}

exports.handler = async (event) => {
  try {
    const { opsi, waktu } = JSON.parse(event.body); // Ambil opsi dan waktu dari website
    const FCM_TOKEN = "ctL7bI1vRAa8vRM1bDsJqI:APA91bEHt1ht4LIGru6cX2BX6SrvcgRusXUgDcqGkkadHDCpAaQuhQt_UCWu9YwXdmpvzRw_yqgg01F95Ydg67X0mSwl31l-F45i1skXzyYa5Nd21gQJ9m8"; // Token kamu udah bener, tinggal pake

    // Kirim notifikasi
    await admin.messaging().send({
      notification: {
        title: "ADA ORANG PILIH OPSI!",
        body: `Seseorang pilih ${opsi} pada ${waktu}` // Waktu udah ada di sini
      },
      token: FCM_TOKEN
    });

    return { statusCode: 200, body: JSON.stringify({ pesan: "Sukses!" }) };
  } catch (error) {
    console.error('Gagal:', error);
    return { statusCode: 500, body: JSON.stringify({ error: "Gagal" }) };
  }
};
