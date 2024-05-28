import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, statusBarColor: "#3B3C59" }} />
      <Stack.Screen name="mylocks" options={{
        headerTitle: "My Locks", headerTintColor: 'white', statusBarColor: "#3B3C59", headerStyle: { backgroundColor: "#3B3C59" }, headerTitleStyle: {
          color: 'white', fontFamily: 'IBM Plex Mono'
        }
      }} />
      <Stack.Screen name="lockdetails" options={{
        headerTitle: "Lock details", headerTintColor: 'white', statusBarColor: "#3B3C59", headerStyle: { backgroundColor: "#3B3C59" }, headerTitleStyle: {
          color: 'white', fontFamily: 'IBM Plex Mono'
        }
      }} />
      <Stack.Screen name="takepicture" options={{
        headerTitle: "Take a Picture", headerTintColor: 'white', statusBarColor: "#3B3C59", headerStyle: { backgroundColor: "#3B3C59" }, headerTitleStyle: {
          color: 'white', fontFamily: 'IBM Plex Mono'
        }
      }} />
    </Stack>
  );
}
