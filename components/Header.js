import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Header = ({ login, goBack, label }) => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  return (
    fontsLoaded &&
    (login ? (
      <View className="flex-row mt-14 ml-4 justify-between items-center">
        <View>
          {goBack ? (
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={goBack}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <Image
              resizeMode="contain"
              source={require("../assets/logo.png")}
              style={{ width: wp(15), height: wp(10) }}
            />
          )}
          {label && <Text>{label}</Text>}
        </View>
        <View className="flex-row items-center">
          {goBack ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("search");
              }}
            >
              <MaterialIcons
                name="search"
                size={30}
                color="white"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("search");
              }}
            >
              <MaterialIcons
                name="search"
                size={35}
                color="white"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          )}
          {goBack ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9VhASGSfFj_77fZ748zUwZZ0HbLv35YYrd93apRFEjDlRDUcoBJlyiiLfzxymVaJMp0&usqp=CAU",
                }}
                resizeMode="contain"
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: 5,
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9VhASGSfFj_77fZ748zUwZZ0HbLv35YYrd93apRFEjDlRDUcoBJlyiiLfzxymVaJMp0&usqp=CAU",
                }}
                resizeMode="contain"
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: 5,
                  marginRight: 20,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ) : (
      <View className="pt-8">
        <Image
          resizeMode="contain"
          source={require("../assets/netflixlogo2.png")}
          style={{ width: wp(40), height: wp(20) }}
        />
      </View>
    ))
  );
};

export default Header;
