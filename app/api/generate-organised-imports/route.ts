import { NextResponse } from "next/server";
import { generateOrganisedImports } from "../_utils/common";

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
