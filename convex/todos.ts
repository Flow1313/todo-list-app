import { mutation, query } from "./_generated/server";

// Fetch all todos
export const getTodos = query(async ({ db }) => {
  return await db.query("todos").collect();
});

// Add a new todo
export const addTodo = mutation(
  async (
    { db },
    todo: { title: string; completed: boolean; createdAt: number }
  ) => {
    return await db.insert("todos", todo);
  }
);

// Update a todo
export const updateTodo = mutation(
  async (
    { db },
    args: { _id: any; updates: { completed?: boolean; title?: string } }
  ) => {
    await db.patch("todos", args._id as any, args.updates);
  }
);

// Delete a todo
export const deleteTodo = mutation(
  async ({ db }, args: { _id: any }) => {
    await db.delete("todos", args._id as any);
  }
);
