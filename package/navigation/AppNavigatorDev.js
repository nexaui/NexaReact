import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { routes } from "../../public/routes";
import { useMontserratFonts, FontFamily } from "../Fonts/Montserrat";

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f5f5f5",
  },
};

export default function AppNavigator() {
  const fontsLoaded = useMontserratFonts();

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#000" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontFamily: FontFamily.semiBold,
              fontWeight: "bold",
            },
            statusBarColor: "#000",
            statusBarStyle: "light",
            animation: "slide_from_right",
            headerShadowVisible: true,
            contentStyle: {
              backgroundColor: "#f5f5f5",
            },
            // Apply Montserrat font to all screens
            screenOptions: {
              cardStyle: {
                flex: 1,
              },
            },
          }}
        >
          {routes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={{
                ...route.options,
                headerTitleStyle: {
                  ...(route.options?.headerTitleStyle || {}),
                  fontFamily: FontFamily.semiBold,
                },
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
