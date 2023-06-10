
async function sendPrompt(data: FieldValues) {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch("http://localhost:3001/send_ai_prompt", requestOptions);
    const sseUrl = response.url; // extract the SSE URL from the fetch response

    console.log('Fetching SSE from:', sseUrl);

    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      console.log('SSE connection opened');
    }
    eventSource.onmessage = (event) => {
      console.log('HERE');
      const data = event.data;
      console.log("Received SSE message: ", data);

      if (data === '[DONE]') {
        // Close the event source and stream
        console.log('Stream done, closing');

        eventSource.close();
      } else {
        // Parse and handle the SSE data
        const parsedData = JSON.parse(data);
        const { choices } = parsedData;
        const { delta } = choices[0];
        const { content } = delta;

        if (content) {
          // Update the state with the response content
          console.log("Response in client: ", content);
          setResponse(content);
        }
      }
    };
  } catch (error) {
    console.error('Error:', error);
  }
}

And here is an updated version of the server-side code that closes the stream with `res.end()` and adds a final "data: [DONE]\n\n" message to signal the end of the stream:

```
async function sendAiPrompt(req, res) {
  let userPrompt = await req.body.prompt;
  console.log('userPrompt: ', userPrompt);
  try {
    // ... same as before ...

    // This loop reads data from the response stream.
    while (true) {
      const chunk = await reader.read();
      const { value, done } = chunk;
      if (done) break;
      const decodedValue = decoder.decode(value);
      const lines = decodedValue.split('\n');
      const parsedLines = lines
        .map(line => line.replace(/^data: /, '').trim())
        .filter(line => line.length > 0 && line !== '[DONE]')
        .map(line => JSON.parse(line));
      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          // Send each chunk of content back to the client
          console.log(content);
          res.write(`data: ${content}\n\n`);
          /*
          The \n\n part is added after each chunk of content in the event stream format
          to comply with the event stream specification. In the event stream format,
          each event is separated by a double newline (\n\n) to indicate the end of an event.
          */
        }
      }
    }

    // Signal the end of the stream
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }