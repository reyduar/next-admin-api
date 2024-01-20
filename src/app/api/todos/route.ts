import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  const searchParam = new URL(request.url).searchParams;
  const take = Number(searchParam.get("take") || "10");
  const skip = Number(searchParam.get("skip") || "0");
  if (isNaN(take)) {
    return NextResponse.json({ error: "Invalid take" }, { status: 400 });
  }
  if (isNaN(skip)) {
    return NextResponse.json({ error: "Invalid skip" }, { status: 400 });
  }
  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}
