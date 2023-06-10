export default async function handler(req, res) {
  const serverUrl = "http://127.0.0.1:3001/send_ai_prompt";
  const { input } = req.body;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  };

  const response = await fetch(serverUrl, requestOptions);

  const data = await response.json();

  res.status(200).json(data);
}
