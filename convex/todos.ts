import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/* -------------------- QUERIES -------------------- */

export const getTodos = query({
  handler: async ({ db }) => {
    return await db.query("todos").collect();
  },
});

/* -------------------- MUTATIONS -------------------- */

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  handler: async ({ db }, { text }) => {
    await db.insert("todos", {
      text,
      completed: false,
    });
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async ({ db }, { id }) => {
    const todo = await db.get(id);
    if (!todo) return;

    await db.patch(id, {
      completed: !todo.completed,
    });
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});