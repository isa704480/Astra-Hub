import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/HomeScreen";
import { PlanetsScreen } from "../screens/PlanetsScreen";
import { WeightScreen } from "../screens/WeightScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { PlanetRoomScreen } from "../screens/PlanetRoomScreen";

import { ComparisonScreen } from "../screens/ComparisonScreen";
import { SplashScreen } from "../screens/SplashScreen";

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Detail: { bodyId: string };
  PlanetRoom: { bodyId: string };

};

export type TabParamList = {
  Home: undefined;
  Planets: undefined;
  Compare: undefined;
  Weight: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#8792A2",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          paddingBottom: 7,
          paddingTop: 7,
          height: 66,
          width: "100%",
          maxWidth: 430,
          alignSelf: "center",
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<
            keyof TabParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            Home: "home-outline",
            Planets: "planet-outline",
            Compare: "git-compare-outline",
            Weight: "barbell-outline",
          };

          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Tizim" }}
      />
      <Tab.Screen
        name="Planets"
        component={PlanetsScreen}
        options={{ title: "Sayyora" }}
      />
      <Tab.Screen
        name="Compare"
        component={ComparisonScreen}
        options={{ title: "Qiyos" }}
      />
      <Tab.Screen
        name="Weight"
        component={WeightScreen}
        options={{ title: "Vazn" }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isReady ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="PlanetRoom"
              component={PlanetRoomScreen}
              options={{ presentation: "fullScreenModal" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
