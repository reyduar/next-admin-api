import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ hello: "world" });
}

export async function POST(req: Request) {
  const title = "POST request";

  return NextResponse.json({ title }, { status: 201 });
}
