const fetch = require('node-fetch');

const botToken = 'TOKEN_BOT_ANDA';
const chatId = 'ID_CHAT_ANDA';
const message = 'Halo, ini pesan otomatis!';

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
  } catch (error) {
    console.error('Error:', error);
  }
};

sendMessage();
