import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { todos } from "../../convex/_generated/convex"; // auto-generated functions

export default function HomeScreen() {
  const todoList = useQuery(todos.getTodos) || [];
  const addTodo = useMutation(todos.addTodo);
  const toggleTodo = useMutation(todos.toggleTodo);
  const deleteTodo = useMutation(todos.deleteTodo);

  const [newTodo, setNewTodo] = useState("");

  return (
    <View style={styles.container}>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() => toggleTodo({ id: item._id })}
              style={[
                styles.toggle,
                { backgroundColor: item.completed ? "#4CAF50" : "#ccc" },
              ]}
            />
            <Text style={[styles.text, item.completed && styles.completed]}>
              {item.title}
            </Text>
            <TouchableOpacity onPress={() => deleteTodo({ id: item._id })}>
              <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (!newTodo.trim()) return;
          addTodo({ title: newTodo });
          setNewTodo("");
        }}
      >
        <Text style={styles.addText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  toggle: { width: 24, height: 24, borderRadius: 12, marginRight: 15 },
  text: { fontSize: 18, flex: 1 },
  completed: { textDecorationLine: "line-through", color: "#888" },
  delete: { fontSize: 18, marginLeft: 10 },
  addButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});