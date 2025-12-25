const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async (event) => {
  try {
    const { opsi, waktu } = JSON.parse(event.body);
    const FCM_TOKEN = "ctL7bI1vRAa8vRM1bDsJqI:APA91bEHt1ht4LIGru6cX2BX6SrvcgRusXUgDcqGkkadHDCpAaQuhQt_UCWu9YwXdmpvzRw_yqgg01F95Ydg67X0mSwl31l-F45i1skXzyYa5Nd21gQJ9m8";

    await admin.messaging().send({
      notification: {
        title: "ADA ORANG PILIH OPSI!",
        body: `Seseorang milih ${opsi} pada ${waktu}`
      },
      token: FCM_TOKEN
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ pesan: "Sukses" })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Gagal" })
    };
  }
};
