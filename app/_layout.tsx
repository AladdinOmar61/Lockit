import { Stack } from "expo-router";
import { useColorScheme } from '../hooks/useColorScheme.web';

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: "#3B3C59" }} />
      <Stack.Screen name="mylocks" options={{ headerTitle: "My Locks", statusBarColor: "#3B3C59" }} />
    </Stack>
  );
}
