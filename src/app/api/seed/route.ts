import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany;
  await prisma.todo.createMany({
    data: [
      {
        description: "Buy milk",
        complete: false,
      },
      {
        description: "Buy eggs",
        complete: false,
      },
      {
        description: "Buy bread",
        complete: false,
      },
    ],
  });
  return NextResponse.json({ message: "Created seed success" });
}
