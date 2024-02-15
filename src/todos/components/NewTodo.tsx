"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todoApi from "../helpers/todos";

export const NewTodo = () => {
  const router = useRouter();
  const createTodo = async (description: string) => {
    const newTodo = await todoApi.createTodo(description);
    router.refresh();
    return newTodo;
  };
  const deleteCompleted = async () => {
    await todoApi.deleteTodoCompleted();
    router.refresh();
    return;
  };
  const [description, setDescription] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length === 0) return;
    createTodo(description);
    setDescription("");
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full">
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompleted()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Delete Completed</span>
      </button>
    </form>
  );
};