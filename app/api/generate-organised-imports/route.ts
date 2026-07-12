// next
import { NextResponse } from "next/server";

// utils
import { generateOrganisedImports } from "../_utils/common";

// The Replicate SDK requires the Node.js runtime (not Edge). A cold-booting
// Llama 3 70B prediction can take well over the default function timeout, so
// raise maxDuration to give the model time to respond and avoid gateway 504s.
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();
    console.log({ code, language });

    if (!code) {
      throw new Error("Provide the code snippet");
    }

    const res = await generateOrganisedImports(code, language);

    if (res === null) {
      throw new Error("Received null response from generateQuiz function");
    }

    const result = JSON.parse(res);

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
