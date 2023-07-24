import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { auth, firebase } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const todoRef = firebase.firestore().collection("users");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [loading, setLoading] = useState(false);

  const authen = auth;

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        authen,
        email,
        password
      );
      const currentUser = firebase.auth().currentUser;
      const usersRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      // Set the user document with the necessary fields
      usersRef
        .set({
          email: currentUser.email,
          list: [],
        })
        .then(() => {
          console.log("User document created successfully");
        })
        .catch((error) => {
          console.error("Error creating user document:", error);
        });
      console.log(response);
      navigation.navigate("BottomStack");
    } catch (error) {
      console.log(error);
      alert("Sign Up failed!" + error.message);
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
          <View
            className="flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
            style={{ flex: 1 }}
          >
            <View
              className="bg-black rounded-xl pt-12"
              style={{ width: wp(90), height: hp(53) }}
            >
              <Text className="text-white text-3xl font-semibold ml-5 mb-5">
                Sign Up
              </Text>
              <View className="flex-row justify-center items-center mb-2">
                <TextInput
                  placeholder="First Name"
                  className="bg-gray-700 text-gray-400 rounded-xl mx-auto p-2 w-[45%] ml-4"
                  value={firstname}
                  onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                  placeholder="Last Name"
                  className="bg-gray-700 text-gray-400 rounded-xl mx-auto p-2 w-[45%] mr-3"
                  value={lastname}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>

              <TextInput
                placeholder="Enter your email"
                className="bg-gray-700 w-[90%] text-gray-400 pl-2 rounded-xl mx-auto p-2 mb-2"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <TextInput
                placeholder="Password"
                className="bg-gray-700 w-[90%] text-gray-400 pl-2 rounded-xl mx-auto p-2 mb-3"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <TouchableOpacity
                className="bg-red-600 w-[90%] ml-4 rounded-xl p-2 mb-3"
                onPress={handleSignUp}
              >
                <Text className="text-center text-white text-xl font-medium">
                  Register
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center justify-center">
                <Text className="text-white">Already have an account ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="text-red-500 ml-1">Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default RegisterScreen;
