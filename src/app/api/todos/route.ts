import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

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

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: { description, complete },
    });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const todo = await prisma.todo.deleteMany({ where: { complete: true } });
    return NextResponse.json({ status: 200, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
