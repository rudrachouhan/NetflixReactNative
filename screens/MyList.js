import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../firebase";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyList = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const list = doc.data().list;
          setMovies(list);
        }
      });
  }, []);

  const navigation = useNavigation();

  const screenHeight = Dimensions.get("window").height;

  const topValue = screenHeight * 0.4;

  return (
    fontsLoaded && (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {movies?.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              position: "absolute",
              top: topValue,
            }}
          >
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
                color: "#fff",
                textAlign: "center",
                fontSize: 8,
              }}
            >
              There are no movies in your list.
            </Text>
            <TouchableOpacity
              style={{
                padding: 4,
                borderRadius: 10,
                backgroundColor: "#E7442E",
                margin: 5,
              }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Home")}
            >
              <Text
                style={{
                  fontFamily: "Montserrat_300Light",
                  fontSize: 5,
                  color: "white",
                }}
              >
                Browse Movies
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
          <Header login={true} goBack={navigation.goBack} label="My List" />
          <View className="flex-row flex-wrap mt-5 ml-8" style={{ flex: 1 }}>
            {movies?.map((movie, item) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={item}
                  onPress={() => {
                    navigation.navigate("movie", {
                      data: movie,
                    });
                  }}
                >
                  <View className="pr-2 mb-4">
                    <Image
                      resizeMode="cover"
                      source={{ uri: movie.banner }}
                      style={{ width: wp(40), height: hp(40), borderRadius: 4 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </>
    )
  );
};

export default MyList;
