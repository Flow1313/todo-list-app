import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "../constants/theme";

// Convex client
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  const [theme, setTheme] = useState(lightTheme);

  // Load theme preference
  useEffect(() => {
    AsyncStorage.getItem("theme").then((t) => {
      if (t === "dark") setTheme(darkTheme);
    });
  }, []);

  // Toggle theme function
  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme === darkTheme ? "dark" : "light");
  };

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider theme={theme}>
        {/* Pass toggleTheme to screens */}
        <Stack
          screenOptions={{ headerShown: false }}
          // Wrap screens so they receive toggleTheme as prop
          children={(props: { children?: ReactNode }) => (
            <Stack.Screen
              {...props}
              component={(screenProps) =>
                React.cloneElement(screenProps.children as React.ReactElement, { toggleTheme })
              }
            />
          )}
        />
      </ThemeProvider>
    </ConvexProvider>
  );
}