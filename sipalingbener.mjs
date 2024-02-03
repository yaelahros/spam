import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUserInput = async () => {
  return new Promise((resolve, reject) => {
    rl.question('Masukkan token bot: ', (botToken) => {
      resolve({ botToken });
    });
  });
};

const sendRandomPhoto = async (botToken, chatId, photoUrls) => {
  const randomIndex = Math.floor(Math.random() * photoUrls.length);
  const randomPhotoUrl = photoUrls[randomIndex];

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: randomPhotoUrl,
        caption: 'Halo, ini pesan otomatis!'
      }),
    });

    const data = await response.json();
    if (data.ok) {
      console.log('Berhasil terkirim bosku');
    } else {
      console.error('Gagal terkirim bosku', data.description);
    }
  } catch (error) {
    console.error('Timeout atau kesalahan lainnya. Kesalahan:', error.message);
  }
};

const main = async () => {
  const { botToken } = await getUserInput();

  rl.question('Masukkan ID chat: ', (chatId) => {
    rl.question('Masukkan URL gambar, pisahkan dengan koma (,): ', (photoUrlsInput) => {
      rl.close();
      
      const photoUrls = photoUrlsInput.split(',').map(url => url.trim());

      // Mengirim pesan setiap 5 detik
      setInterval(async () => {
        await sendRandomPhoto(botToken, chatId, photoUrls);
      }, 5000);
    });
  });
};

main();
