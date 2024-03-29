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
        rl.question('Masukkan pesan: ', (message) => {
          rl.close();
          resolve({ botToken, chatId, message });
        });
      });
    });
  });
};

const sendMessage = async (botToken, chatId, message) => {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const data = await response.json();
    if (data.ok) {
      console.log('Berhasil boskuuu ilmu padi');
    } else {
      console.error('Gagal terkirim bosku. Kesalahan:', data.description);
    }
  } catch (error) {
    console.error('Timeout atau kesalahan lainnya. Kesalahan:', error.message);
  }
};

const main = async () => {
  const { botToken, chatId, message } = await getUserInput();

  // Mengirim pesan setiap 5 detik
  setInterval(async () => {
    await sendMessage(botToken, chatId, message);
  }, 5000);
};

main();
  
