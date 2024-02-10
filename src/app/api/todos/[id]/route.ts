import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

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

const putSchema = yup.object({
  description: yup.string(),
  complete: yup.boolean().optional().default(false),
});

export async function PUT(request: Request, args: Args) {
  try {
    const { id } = args.params;
    const { description, complete } = await putSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    } else {
      await prisma.todo.update({
        where: {
          id,
        },
        data: { description, complete },
      });
      return NextResponse.json(todo);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
