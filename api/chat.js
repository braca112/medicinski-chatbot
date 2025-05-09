export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY;
  const { message } = req.body;

  const payload = {
    model: "mixtral-8x7b-32768",
    messages: [
      {
        role: "system",
        content: "Ti si medicinski informativni asistent. Nikada ne postavljaš dijagnozu, ne daješ lekove, niti terapiju. Odgovaraš jasno, na srpskom jeziku, i uvek savetuješ korisniku da se obrati lekaru za zvaničan savet."
      },
      {
        role: "user",
        content: message
      }
    ]
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
