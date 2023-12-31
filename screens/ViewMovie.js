import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import { Video } from "expo-av";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { firebase } from "../firebase";

const ViewMovie = ({ route, navigation }) => {
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  const _ = require("lodash");

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [list, setList] = useState([]);

  const showAddAlert = () => {
    Alert.alert(
      "Done", // Title of the alert
      "Movie has been added to your My List!", // Message of the alert
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  const showRemoveAlert = () => {
    Alert.alert(
      "Done", // Title of the alert
      "Movie has been removed from your My List!", // Message of the alert
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const list = doc.data().list;
          setList(list);
        } else {
          console.log("Document not found!");
        }
      });
  }, [list]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("movies")
      .doc(route.params.data.id)
      .onSnapshot((doc) => {
        setMovie(doc.data());
      });

    setLoading(false);
  }, [route]);

  const arrayExists = list.some((arr) => _.isEqual(arr, movie));

  return (
    fontsLoaded && (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
          style="light"
        />
        <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
          <Header login={true} goBack={navigation.goBack} />
          <Video
            source={{
              uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            }}
            isMuted={false}
            shouldPlay={true}
            style={{ height: 225, marginTop: 15 }}
            resizeMode="contain"
            usePoster={true}
            posterSource={{ uri: route.params.data.banner_image }}
            useNativeControls={true}
          />
          <Text className="text-white text-2xl font-semibold ml-1">
            {route.params.data.name}
          </Text>
          <View className="flex-row items-center">
            <Text
              className="text-[#a2a2a2] bg-[#373737] p-1 rounded-md text-center mt-1 ml-2"
              style={{ width: wp(10) }}
            >
              13+
            </Text>
            <Text className="text-[#a2a2a2] text-sm ml-3">
              {route.params.data.year}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#ece9e9] py-2 flex-row items-center justify-center rounded-md mx-auto mt-5"
            style={{ width: wp(95) }}
          >
            <Ionicons name="ios-play" size={26} />
            <Text className="ml-1 font-semibold text-base">Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ width: wp(95) }}
            className="bg-[#262626] py-2 flex-row items-center justify-center rounded-md mx-auto mt-2"
          >
            <Feather
              name="download"
              size={24}
              style={{ color: "white", margin: 4 }}
            />
            <Text className="text-base font-semibold text-white pl-1">
              Download
            </Text>
          </TouchableOpacity>
          <Text
            className="text-white m-2 font-thin mt-6 text-sm mb-0"
            style={{ width: wp(98), fontFamily: "Montserrat_300Light" }}
          >
            {route.params.data.description}
          </Text>

          <View className="flex-row justify-center items-center m-5 mt-1">
            {arrayExists ? (
              <TouchableOpacity
                activeOpacity={0.5}
                className="flex justify-center items-center mt-5 m-7"
                onPress={() => {
                  const indexToRemove = list.findIndex((arr) =>
                    _.isEqual(arr, movie)
                  );
                  list.splice(indexToRemove, 1);
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .update({
                      list,
                    });
                  showRemoveAlert();
                }}
              >
                <MaterialIcons name="check" size={35} color="white" />
                <Text
                  className="text-white text-sm"
                  style={{ fontFamily: "Montserrat_300Light" }}
                >
                  My List
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                className="flex justify-center items-center mt-5 m-7"
                onPress={() => {
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((doc) => {
                      if (doc.exists) {
                        list.push(movie);
                        firebase
                          .firestore()
                          .collection("users")
                          .doc(firebase.auth().currentUser.uid)
                          .update({
                            list,
                          });
                      } else {
                        console.log("Document not found!");
                      }
                    });
                  showAddAlert();
                }}
              >
                <MaterialIcons name="add" size={35} color="white" />
                <Text
                  className="text-white text-sm"
                  style={{ fontFamily: "Montserrat_300Light" }}
                >
                  My List
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.5}
              className="flex justify-center items-center mt-5 m-7"
            >
              <AntDesign
                name="like2"
                size={30}
                color="white"
                style={{ marginBottom: 7 }}
              />
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "Montserrat_300Light" }}
              >
                Rate
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              className="flex justify-center items-center mt-5 m-7"
            >
              <AntDesign
                name="sharealt"
                size={27}
                color="white"
                style={{ marginBottom: 7 }}
              />
              <Text
                className="text-white text-sm"
                style={{ fontFamily: "Montserrat_300Light" }}
              >
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    )
  );
};

export default ViewMovie;
