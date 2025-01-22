import React from 'react';
import { View } from 'react-native';

function Hello() {
  return (
    <View className='h-10 w-10 bg-white rounded-full flex justify-center items-center flex-row'>
      <View className='bg-black w-[2.25px] h-1.5 rounded-full mr-[1.75px]'></View>
      <View className='bg-black w-[2.25px] h-4 rounded-full mr-[1.75px]'></View>
      <View className='bg-black w-[2.25px] h-2 rounded-full mr-[1.75px]'></View>
      <View className='bg-black w-[2.25px] h-[4px] rounded-full'></View>
    </View>
  );
}

export default Hello;
