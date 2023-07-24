import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import ViewMovie from "./screens/ViewMovie";
import MyList from "./screens/MyList";
import SearchScreen from "./screens/SearchScreen";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ...", "Error: ..."]);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  function BottomStackScreen() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          inactiveTintColor: "#5B5B5B",
          tabBarStyle: {
            backgroundColor: "#141414",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Videos"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="video-library" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Download"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="download" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const screenOptions = {
    headerShown: false,
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Stack.Navigator
          screenOptions={screenOptions}
          initialRouteName={"Login"}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              gestureDirection: "horizontal",
              gestureEnabled: true,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              gestureDirection: "horizontal",
              gestureEnabled: true,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              gestureDirection: "horizontal",
              gestureEnabled: true,
              animationEnabled: true,
            }}
          />

          <Stack.Screen
            name="BottomStack"
            component={BottomStackScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="movie" component={ViewMovie} />
          <Stack.Screen name="MyList" component={MyList} />
          <Stack.Screen name="search" component={SearchScreen} />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}
