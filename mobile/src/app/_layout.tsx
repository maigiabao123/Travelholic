import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen
        name="splash"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="mapscreen"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}