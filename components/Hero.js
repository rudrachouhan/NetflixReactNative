import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import { data } from "../data/movieData";

const Hero = () => {
  const [list, setList] = useState([]);
  const [movie, setMovie] = useState([]);

  const _ = require("lodash");

  const movie1 = data.movies[0];

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
      .doc(movie1.id)
      .onSnapshot((doc) => {
        setMovie(doc.data());
      });
  }, []);

  const arrayExists = list.some((arr) => _.isEqual(arr, movie));

  const navigation = useNavigation();

  return (
    <View className="absolute bottom-1 mx-auto w-full">
      <View className="flex justify-center">
        <Image
          source={{
            uri: "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp",
          }}
          resizeMode="contain"
          style={{
            width: "100%",
            height: hp(18),
          }}
        />
      </View>
      <View className="flex-row items-center justify-between mt-4 mx-2">
        {arrayExists ? (
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex justify-center items-center"
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
            <MaterialIcons name="check" size={22} color="#e1d2d2" />
            <Text
              className="text-[#e1d2d2]"
              style={{ fontFamily: "Montserrat_300Light" }}
            >
              My List
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.5}
            className="flex justify-center items-center"
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
            <MaterialIcons name="add" size={22} color="#e1d2d2" />
            <Text
              className="text-[#e1d2d2]"
              style={{ fontFamily: "Montserrat_300Light" }}
            >
              My List
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-[#ece9e9] py-1 flex-row items-center justify-center rounded-md"
          style={{ width: wp(40) }}
          onPress={() => navigation.navigate("movie", { data: movie })}
        >
          <Ionicons name="ios-play" size={26} />
          <Text className="ml-1 font-semibold">Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex"
          onPress={() => navigation.navigate("movie", { data: movie })}
        >
          <Feather name="info" size={22} color="#e1d2d2" />
          <Text className="text-[#e1d2d2]">Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Hero;
