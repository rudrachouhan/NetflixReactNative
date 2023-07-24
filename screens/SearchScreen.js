import React, { useState, useEffect } from "react";
import { View, TextInput, ScrollView, Image, Text } from "react-native";
import { firebase } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [results2, setResults2] = useState(null);

  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("movies")
      .onSnapshot((snapshot) => {
        setResults(snapshot.docs.map((doc) => doc.data()));
      });

    setResults2(results);
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("movies")
      .onSnapshot((snapshot) => {
        setResults(snapshot.docs.map((doc) => doc.data()));
      });

    if (results != undefined) {
      const finalResults = results.filter((result) => {
        return result.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });

      setResults2(finalResults);
    }
  }, [search]);

  return (
    fontsLoaded && (
      <>
        <StatusBar style="light" />
        <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
          <Header login={true} goBack={navigation.goBack} />
          <View>
            <View className="bg-[#333333] flex-row mt-4 w-[95%] mx-auto rounded-lg items-center py-1">
              <MaterialIcons
                name="search"
                size={30}
                color="#B1B1B1"
                style={{ margin: 6 }}
              />
              <TextInput
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholderTextColor="#7f7f7f"
                placeholder="Search for a show, movie, genre etc."
                className="text-white"
              />
              <TouchableOpacity activeOpacity={0.5}>
                <MaterialCommunityIcons
                  name="microphone"
                  size={30}
                  color="#b1b1b1"
                  style={{ margin: 6 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {results2 && (
            <>
              <Text
                className="text-white text-2xl m-5 mt-3 ml-6 font-semibold"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
              >
                Top Searches
              </Text>
              <View className="flex-row flex-wrap justify-center p-3">
                {results2.map((movie, item) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      key={item}
                      onPress={() => {
                        navigation.navigate("movie", {
                          id: movie.id,
                        });
                      }}
                    >
                      <View className="pr-2">
                        <Image
                          resizeMode="cover"
                          source={{ uri: movie.banner }}
                          style={{
                            width: wp(40),
                            height: hp(40),
                            marginBottom: 10,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      </>
    )
  );
};

export default SearchScreen;
