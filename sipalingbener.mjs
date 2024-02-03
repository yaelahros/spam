import fetch from 'node-fetch';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUserInput = async () => {
  return new Promise((resolve, reject) => {
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

const sendRandomPhoto = async (botToken, chatId, photoUrls) => {
  const randomIndex = Math.floor(Math.random() * photoUrls.length);
  const randomPhotoUrl = photoUrls[randomIndex];

  rl.question('Masukkan caption: ', async (caption) => {
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          photo: randomPhotoUrl,
          caption: caption
        }),
      });

      const data = await response.json();
      if (data.ok) {
        console.log('Berhasil boskuuu ilmu padi');
      } else {
        console.error('Gagal terkirim bosku. Kesalahan:', data.description);
      }
      
      // Mengirim pesan kembali setelah selesai
      sendRandomPhoto(botToken, chatId, photoUrls);
    } catch (error) {
      console.error('Timeout atau kesalahan lainnya. Kesalahan:', error.message);
      // Mengirim pesan kembali setelah selesai, bahkan jika terjadi kesalahan
      sendRandomPhoto(botToken, chatId, photoUrls);
    }
  });
};

const main = async () => {
  const { botToken, chatId, photoUrls } = await getUserInput();

  // Mulai proses pengiriman pesan setelah mendapatkan input
  sendRandomPhoto(botToken, chatId, photoUrls);
};

main();
