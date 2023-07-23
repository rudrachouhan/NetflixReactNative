import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';

const Movies = ({ data, label }) => {
	const navigation = useNavigation();
  return (
    <View className='py-5'>
			<Text className='text-white font-bold text-xl mr-3 mt-2 mb-4 ml-2'>{label}</Text>
      <ScrollView horizontal>
				{data.map((movie, id) => {
					return (
						<TouchableOpacity activeOpacity={0.5} key={id} onPress={() => navigation.navigate('movie', {
							data: movie
						})}>
							<View className='pr-2'>
								<Image resizeMode='cover' source={{ uri: movie.banner_image }} style={{width:wp(45),height:wp(50)}} />
							</View>
						</TouchableOpacity>
					)
				})}
			</ScrollView> 
		</View>
  )
}

export default Movies