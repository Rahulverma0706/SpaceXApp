import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LaunchListScreen from "./Components/LaunchListScreen";

import LaunchDetailsScreen from "./Components/LaunchDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Launches" component={LaunchListScreen} />
        <Stack.Screen name="LaunchDetails" component={LaunchDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
