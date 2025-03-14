import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Platform, StatusBar } from "react-native";
import { routes } from "../../public/routes";
import { useMontserratFonts, FontFamily } from "../Fonts/Montserrat";
import Storage from "../Storage/asyncstorage";

const Stack = createNativeStackNavigator();

// Helper function untuk menentukan apakah warna termasuk gelap
const isColorDark = (hexColor) => {
  const darkColors = [
    "#211E1F",
    "#333333",
    "#2196F3",
    "#4CAF50",
    "#F44336",
    "#9C27B0",
  ];
  return darkColors.includes(hexColor);
};

export default function AppNavigator() {
  const fontsLoaded = useMontserratFonts();
  const navigationRef = useNavigationContainerRef();
  const [initialRoute, setInitialRoute] = useState("Home");

  // Inisialisasi awal StatusBar
  useEffect(() => {
    // Mengambil konfigurasi default dari route awal (Home)
    const defaultRoute = routes.find((r) => r.name === "Home");
    if (defaultRoute?.options?.statusBar) {
      StatusBar.setBackgroundColor(
        defaultRoute.options.statusBar.backgroundColor
      );
      StatusBar.setBarStyle(
        defaultRoute.options.statusBar.style === "light"
          ? "light-content"
          : "dark-content"
      );
    }
  }, []); // Dijalankan sekali saat komponen mount

  // Check login status on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userSession = await Storage.getItem("userSession");
        if (userSession) {
          setInitialRoute("User");
          // Update StatusBar sesuai route User jika ada session
          const userRoute = routes.find((r) => r.name === "User");
          if (userRoute?.options?.statusBar) {
            StatusBar.setBackgroundColor(
              userRoute.options.statusBar.backgroundColor
            );
            StatusBar.setBarStyle(
              userRoute.options.statusBar.style === "light"
                ? "light-content"
                : "dark-content"
            );
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // Handle route change untuk update StatusBar
  React.useEffect(() => {
    if (navigationRef.current) {
      const unsubscribe = navigationRef.current.addListener("state", () => {
        const currentRoute = navigationRef.current.getCurrentRoute();
        if (currentRoute) {
          const route = routes.find((r) => r.name === currentRoute.name);
          if (route?.options?.statusBar) {
            StatusBar.setBackgroundColor(
              route.options.statusBar.backgroundColor
            );
            StatusBar.setBarStyle(
              route.options.statusBar.style === "light"
                ? "light-content"
                : "dark-content"
            );
          }
        }
      });
      return unsubscribe;
    }
  }, [navigationRef]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRoute}>
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
