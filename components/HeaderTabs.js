import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HeaderTabs = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-around items-center mt-5">
      <TouchableOpacity>
        <Text className="text-base font-normal text-white">TV Shows</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text className="text-base font-normal text-white">Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("MyList")}>
        <Text className="text-base font-normal text-white">My List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderTabs;
