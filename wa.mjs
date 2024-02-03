import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUserInput = async () => {
  return new Promise((resolve) => {
    rl.question('Masukkan token bot: ', (botToken) => {
      rl.question('Masukkan ID chat: ', (chatId) => {
        rl.question('Masukkan URL gambar, pisahkan dengan koma (,): ', (photoUrlsInput) => {
          rl.close();
          const photoUrls = photoUrlsInput.split(',').map(url => url.trim());
          resolve({ botToken, chatId, photoUrls });
        });
      });
    });
  });
};

const sendPhotoWithCaption = async (botToken, chatId, photoUrl, caption) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption: caption
      }),
    });

    const data = await response.json();
    if (data.ok) {
      console.log('Berhasil terkirim');
    } else {
      console.error('Gagal terkirim. Kesalahan:', data.description);
    }
  } catch (error) {
    console.error('Timeout atau kesalahan lainnya. Kesalahan:', error.message);
  }
};

const main = async () => {
  const { botToken, chatId, photoUrls } = await getUserInput();

  rl.question('Masukkan caption: ', (caption) => {
    photoUrls.forEach(async (photoUrl) => {
      await sendPhotoWithCaption(botToken, chatId, photoUrl, caption);
    });
  });
};

main();
