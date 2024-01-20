import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface Args {
  params: {
    id: string;
  };
}

export async function GET(request: Request, args: Args) {
  const { id } = args.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}
