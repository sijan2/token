import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

export default function Component() {
  const handlePassPress = () => {
    router.push('/')
  }
  const [currentTime, setCurrentTime] = useState(new Date())
  const circleScale = useRef(new Animated.Value(1)).current

  const animateCircle = () => {
    // Reset to initial scale
    circleScale.setValue(1)

    Animated.sequence([
      // First pulse - small
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Second pulse - medium
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.4,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Third pulse - large
      Animated.sequence([
        Animated.timing(circleScale, {
          toValue: 1.6,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Restart the animation
      animateCircle()
    })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    animateCircle()

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  }

  const getExpirationTime = () => {
    const expirationTime = new Date(currentTime.getTime() + 30 * 60000) // Add 30 minutes
    return expirationTime.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='bg-white h-full'>
        {/* Header */}
        <View className='p-4 flex-row justify-between items-start'>
          <View>
            <Text className='text-3xl font-bold text-[#3C4043]'>
              Huntsville Transit
            </Text>
            <Text className='text-lg font text-gray-600'>
              Show operator your ticket
            </Text>
          </View>
          <TouchableOpacity onPress={handlePassPress} className='p-2'>
            <X color={'black'} size={32} className='text-gray-800' />
          </TouchableOpacity>
        </View>

        {/* Logo with Animated Circle */}
        <View className='items-center justify-center mt-16'>
          <View className='w-36 h-36 items-center justify-center'>
            {/* Animated Circles */}
            <Animated.View
              style={{
                position: 'absolute',
                width: 144,
                height: 144,
                borderRadius: 72,
                backgroundColor: '#2F6599',
                transform: [{ scale: circleScale }],
                opacity: 1,
              }}
            />
            <Animated.View
              style={{
                position: 'absolute',
                width: 144,
                height: 144,
                borderRadius: 72,
                backgroundColor: '#3B80C1',
                transform: [{ scale: circleScale }],
                opacity: 1,
              }}
            />
            {/* Static Logo Circle */}
            <View className='w-36 h-36 rounded-full bg-white border-4 border-[#3B80C1] items-center justify-center'>
              <Image
                source={require('../assets/images/ticket.png')}
                className='w-20 h-10'
                resizeMode='cover'
                style={{ transform: [{ scale: 1.2 }] }}
              />
            </View>
          </View>
        </View>

        {/* Time Display */}
        <View className='items-center mt-32'>
          <Text className='text-6xl font-extrabold text-[#3C4043]'>
            {formatTime(currentTime)}
          </Text>
        </View>

        {/* Reduced Banner */}
        <View className='bg-[#F00] py-4 m-4 rounded-full'>
          <Text className='text-white text-5xl font-semibold text-center'>
            Reduced
          </Text>
        </View>

        {/* Ticket Details */}
        <View
          className='bg-[#FFF] rounded-lg mx-4 p-6 shadow-lg'
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <Text className='text-3xl text-[#3C4043]'>Reduced 1 Ride</Text>
          <Text className='text-gray-600 text-lg mb-6'>Huntsville, AL</Text>
          <Text className='text-gray-600 text-xl font-extrabold'>
            Expires {getExpirationTime()}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
