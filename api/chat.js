import fetch from 'node-fetch';  // Import zamišljene biblioteke (ako koristiš fetch ili bilo koju biblioteku)

export default async function handler(req, res) {
  try {
    // Proverava da li je metoda POST
    if (req.method === 'POST') {
      const { question } = req.body;

      // Proveri da li pitanje postoji
      if (!question) {
        return res.status(400).json({ error: "Pitanje je obavezno" });
      }

      // Zameniti sa pozivom tvog modela
      const modelResponse = await fetch('https://api.groq.com/v1/chat/completion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Zameniti sa stvarnim API ključem
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: question }],
        }),
      });

      const data = await modelResponse.json();
      return res.status(200).json(data);
    } else {
      return res.status(405).json({ error: 'Metoda nije dozvoljena' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Greška servera' });
  }
}
