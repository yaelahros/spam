import fetch from 'node-fetch';

const botToken = '6904604578:AAGBByAC7qGEhU-ExWVpvpnQEmeqZohLUJY';
const chatId = '6974770156';
const message = 'pesan: hehe udah dapet berapa ikan bg?? wa +6281952855347';
const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

const sendMessage = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const data = await response.json();
    console.log(data);

    // Menunggu 5 detik sebelum mengirim pesan lagi
    setTimeout(sendMessage, 10000);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Memulai pengiriman pesan pertama
sendMessage();
