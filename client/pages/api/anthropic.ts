import { AnthropicStream } from 'ai'

export async function POST(req: Request) {
  // ...

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      await savePromptToDatabase(prompt)
    },
    onToken: async (token: string) => {
      // This callback is called for each token in the stream
      // You can use this to debug the stream or save the tokens to your database
      console.log(token)
    },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      await saveCompletionToDatabase(completion)
    }
  })

  // Respond with the stream
  return new StreamingTextResponse(response)
}
