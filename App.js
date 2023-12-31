import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "./Screens/HomeScreen"
import MovieScreen from "./Screens/MovieScreen"
import PersonScreen from "./Screens/PersonScreen"
import SearchScreen from "./Screens/SearchScreen"
import MovieListScreen from "./Screens/MovieListScreen"
import InfoScreen from "./Screens/InfoScreen"

const Stack = createNativeStackNavigator()
//https://youtu.be/Q1xQuCpYIFE?t=3059
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
        <Stack.Screen name="PersonScreen" component={PersonScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
