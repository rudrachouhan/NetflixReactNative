import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authen = auth;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        authen,
        email,
        password
      );
      // setEmail('');
      // setPassword('');
      console.log(response);
      navigation.navigate("BottomStack");
    } catch (error) {
      console.log(error);
      alert("Sign In failed!" + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <StatusBar style="light" />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="text-xl font-bold">Loading...</Text>
        </View>
      ) : (
        <ImageBackground
          source={{
            uri: "https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-7158-408e-8d9b-23c219dee5df/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg",
          }}
          resizeMode="cover"
          style={{
            flex: 1,
            height: Dimensions.get("screen").height,
          }}
          >
            <Header login={false} />
          <View
            className="flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
            style={{ flex: 1 }}
            >
            <View
              className="bg-black rounded-xl pt-12"
              style={{ width: wp(90), height: hp(50) }}
            >
              <Text className="text-white text-3xl font-semibold ml-5 mb-5">
                Sign In
              </Text>
              <TextInput
                placeholder="Enter your email"
                className="bg-gray-700 w-[90%] text-gray-400 pl-2 rounded-xl mx-auto p-3 mb-2"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                placeholder="Password"
                className="bg-gray-700 w-[90%] text-gray-400 pl-2 rounded-xl mx-auto p-3 mb-3"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TouchableOpacity
                className="bg-red-600 w-[90%] ml-4 rounded-xl p-3 mb-3"
                onPress={handleSignIn}
              >
                <Text className="text-center text-white text-xl font-medium">
                  Sign In
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center justify-center">
                <Text className="text-white">New to Netflix ? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text className="text-red-500 ml-1">Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default LoginScreen;
