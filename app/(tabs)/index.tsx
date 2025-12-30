import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { fonts } from "../../constants/fonts";
import { spacing } from "../../constants/spacing";
import { api } from "../../convex/_generated/api";

// Styled components (object-based for React Native)
const Container = styled.View({
  flex: 1,
  padding: spacing.xxl,
  backgroundColor: (props: any) => props.theme.background,
});

const Header = styled.View({
  marginBottom: spacing.lg,
});

const Input = styled.TextInput({
  borderWidth: 1,
  borderColor: "#ccc",
  padding: spacing.md,
  borderRadius: spacing.sm,
  backgroundColor: (props: any) => props.theme.inputBackground,
  color: (props: any) => props.theme.text,
  fontSize: fonts.sizes.regular,
  marginBottom: spacing.sm,
});

const TodoCard = styled.View<{ completed?: boolean }>((props: any) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.md,
  marginBottom: spacing.sm,
  borderRadius: spacing.sm,
  backgroundColor: props.completed ? props.theme.inputBackground : props.theme.background,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
}));

const TodoText = styled.Text<{ completed?: boolean }>((props: any) => ({
  fontSize: fonts.sizes.medium,
  fontWeight: fonts.weights.regular,
  color: props.theme.text,
  textDecorationLine: props.completed ? "line-through" : "none",
}));

const ButtonText = styled.Text((props: any) => ({
  fontSize: fonts.sizes.medium,
  fontWeight: fonts.weights.bold,
  color: props.theme.button,
}));

const Button = styled.TouchableOpacity((props: any) => ({
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  marginTop: spacing.xs,
  borderRadius: spacing.sm,
  alignItems: "center",
  backgroundColor: props.theme.button + "22",
}));

const EmptyText = styled.Text((props: any) => ({
  textAlign: "center",
  color: props.theme.text + "99",
  marginTop: spacing.xxl,
  fontSize: fonts.sizes.regular,
}));

export default function HomeScreen({ toggleTheme }: { toggleTheme: () => void }) {
  const theme = useTheme();

  // Convex hooks
  const todos = useQuery(api.todos.getTodos);
  const addTodoMutation = useMutation(api.todos.addTodo);
  const updateTodoMutation = useMutation(api.todos.updateTodo);
  const deleteTodoMutation = useMutation(api.todos.deleteTodo);

  const [title, setTitle] = useState("");

  // Add new todo
  const handleAdd = async () => {
    if (title.trim()) {
      await addTodoMutation({ title, completed: false, createdAt: Date.now() });
      setTitle("");
    }
  };

  // Toggle complete
  const toggleComplete = async (todo: any) => {
    await updateTodoMutation({ id: todo._id, updates: { completed: !todo.completed } });
  };

  // Delete todo
  const handleDelete = async (todo: any) => {
    await deleteTodoMutation(todo._id);
  };

  return (
    <Container>
      <Header>
        <Input
          placeholder="Add a new task..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={theme.text + "99"}
        />
        <Button onPress={handleAdd}>
          <ButtonText>Add Todo</ButtonText>
        </Button>
        <Button onPress={toggleTheme}>
          <ButtonText>Toggle Theme</ButtonText>
        </Button>
      </Header>

      {!todos ? (
        <ActivityIndicator size="large" color={theme.button} style={{ marginTop: spacing.xxl }} />
      ) : todos.length === 0 ? (
        <EmptyText>No todos yet. Add your first task!</EmptyText>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TodoCard completed={item.completed}>
              <TouchableOpacity onPress={() => toggleComplete(item)}>
                <TodoText completed={item.completed}>{item.title}</TodoText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item)}>
                <TodoText>Delete</TodoText>
              </TouchableOpacity>
            </TodoCard>
          )}
        />
      )}
    </Container>
  );
}