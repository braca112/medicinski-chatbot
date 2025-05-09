const fetch = require("node-fetch");

const handler = async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Nema poruka u zahtevu" });
    }

    // Provera poruka koje dolaze
    console.log("Received messages:", messages);

    const prompt = messages[0].content;

    // API poziv sa Groq modelom
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",  // Promeni model ako je potrebno
        messages: req.body.messages,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json(data);
    }
  } catch (error) {
    console.error("Greška:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handler;
