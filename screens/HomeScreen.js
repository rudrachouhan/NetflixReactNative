import { ImageBackground, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import HeaderTabs from "../components/HeaderTabs";
import Hero from "../components/Hero";
import { data } from "../data/movieData";
import Movies from "../components/Movies";

const HomeScreen = ({ navigation }) => {
  const movies = data.movies;

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        style="light"
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#000" }}>
        <ImageBackground
          source={{ uri: "https://wallpaperaccess.com/full/1956841.jpg" }}
          style={{
            width: "100%",
            height: hp(80),
          }}
          resizeMode="cover"
        >
          <LinearGradient
            locations={[0, 0.2, 0.5, 0.94]}
            colors={[
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.0)",
              "rgba(0,0,0,0.0)",
              "rgba(0,0,0,1)",
            ]}
            style={{ height: "101%" }}
          >
            <Header login={true} navigation={navigation} />
            <HeaderTabs />
            <Hero />
          </LinearGradient>
        </ImageBackground>

        <Movies label="Popular on Netflix" data={movies} />
        <Movies label="US Movies" data={movies} />
        <Movies label="Crime TV Shows" data={movies} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
