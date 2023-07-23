import { View, Text, TouchableOpacity,Image } from "react-native";
import React from "react";
import { AntDesign, MaterialIcons, Ionicons,Feather } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { data } from "../data/movieData";

const Hero = () => {

  const navigation = useNavigation();
  const movie = data.movies[0];

  return (
    <View className='absolute bottom-1 mx-auto w-full'>
      <View className="flex justify-center">
        <Image
          source={{
            uri: "https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp",
          }}
                  resizeMode="contain"
                  style={{
                      width: '100%',
                      height: hp(18),
                  }}
        />
          </View >
          <View className='flex-row items-center justify-between mt-4 mx-2'>
          <TouchableOpacity>
          <Ionicons name="add-outline" size={24} color="#e1d2d2" />
		    <Text className='text-[#e1d2d2]'>My List</Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-[#ece9e9] py-1 flex-row items-center justify-center rounded-md' style={{width:wp(40)}} onPress={() => navigation.navigate('movie',{data: movie})}>
          <Ionicons name='ios-play' size={26} />
		    <Text className='ml-1 font-semibold'>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex' onPress={() => navigation.navigate('movie',{data: movie})}>
          <Feather name='info' size={22} color='#e1d2d2' />
		    <Text className='text-[#e1d2d2]'>Info</Text>
              </TouchableOpacity>
          </View>
          </View>
  );
};

export default Hero;
