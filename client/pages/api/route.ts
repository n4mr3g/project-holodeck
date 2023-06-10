// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const url = "http://127.0.0.1:3001/send_ai_prompt";
// }

// export default async function handler(req: Request, res: Response) {
//   const serverUrl = "http://127.0.0.1:3001";
//   const { input } = req.body;

//   const response = await fetch(`${serverUrl}/send_ai_prompt`);
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ input }),
//   };
//   const data = await response.json();

//   res.status(200).json(data);
// }
