import { Todo } from "@prisma/client";

export const createTodo = async (description: string): Promise<Todo> => {
  const body = JSON.stringify({ description });
  const response = await fetch(`/api/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((res) => res.json());
  return response;
};

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = JSON.stringify({ complete });
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((res) => res.json());
  return response;
};

export const deleteTodo = async (id: string): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
};
