import { NextResponse } from "next/server";

// Returns the Web3Forms access key to the browser at request time. Web3Forms
// keys are designed to be public (normally embedded directly in client HTML),
// so exposing it here is fine — and it means the key works regardless of build
// timing or which variable name was used. The browser then submits to
// Web3Forms directly, which avoids server-to-Web3Forms connectivity problems.
export async function GET() {
  const key = (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    ""
  ).trim();

  return NextResponse.json({ key });
}
