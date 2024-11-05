import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserRound, RotateCw, X } from 'lucide-react-native'
import { router } from 'expo-router'

const PASS_COUNT_KEY = '@pass_count'

export default function HomeScreen() {
  const [passCount, setPassCount] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Load saved pass count on initial mount
  useEffect(() => {
    loadPassCount()
  }, [])

  const loadPassCount = async () => {
    try {
      const savedCount = await AsyncStorage.getItem(PASS_COUNT_KEY)
      if (savedCount !== null) {
        setPassCount(parseInt(savedCount))
      }
    } catch (error) {
      console.error('Error loading pass count:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const savePassCount = async (count) => {
    try {
      await AsyncStorage.setItem(PASS_COUNT_KEY, count.toString())
    } catch (error) {
      console.error('Error saving pass count:', error)
    }
  }

  const handleBuyPass = async () => {
    const newCount = passCount + 1
    setPassCount(newCount)
    await savePassCount(newCount)
  }

  const handleRefresh = async () => {
    setPassCount(1)
    await savePassCount(1)
  }

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 bg-[#F2F2F9] justify-center items-center'>
        <Text className='text-white text-lg'>Loading passes...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-[#F2F2F9'>
      {/* Top Nav */}
      <View className='w-full  px-4 py-4 flex-row justify-between'>
        <TouchableOpacity onPress={handleRefresh}>
          <RotateCw color='#0092D2' size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRefresh}>
          <UserRound color='#0092D2' size={28} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className='flex-1  w-full'>
        <Text className='text-black font-bold text-4xl px-4 mb-6'>
          My Passes
        </Text>
        <Text className='text-gray-500 text-base px-4 py-3 mt-2'>
          STORED PASSES
        </Text>

        {/* Scrollable Pass Cards */}
        <ScrollView
          className='flex-1'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {[...Array(passCount)].map((_, index) => (
            <Pass key={index} />
          ))}
        </ScrollView>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity
        className='mx-5 rounded-xl bg-[#F7A82F] py-2.5 mb-4'
        onPress={handleBuyPass}
      >
        <Text className='text-white text-center text-xl font-semibold'>
          Buy Passes
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function Pass() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handlePassPress = () => {
    router.push('/ticket')
  }

  const getExpirationTime = () => {
    const expirationDate = new Date(new Date().getTime() + 30 * 60000)
    return (
      expirationDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' at ' +
      expirationDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    )
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className='mx-3 my-2 mt-2.5 bg-white rounded-lg overflow-hidden shadow-md'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
      >
        <View className='flex-row items-center'>
          <View className='w-24 h-20 bg-[#FFF] p-2'>
            <Image
              source={require('../assets/images/ticket.png')}
              className='w-full h-full'
              resizeMode='contain'
              style={{ transform: [{ scale: 1.2 }] }}
            />
          </View>
          {/* Pass Details Section */}
          <View className='flex-1 flex-col bg-[#1C2E52]'>
            <Text className='text-white text-center py-7 text-xl font-bold'>
              Reduced 1 Ride
            </Text>
            <Text className='text-white text-center text-xs bg-[#006693] py-1'>
              Tap to use this pass
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View
            style={{
              backgroundColor: '#F3F4F6', // gray-100
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          >
            {/* Header */}
            <View
              style={{
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#E5E7EB', // gray-200
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}
              >
                Activate Pass
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <X size={24} color='#000' />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={{ padding: 24, gap: 24 }}>
              {/* Pass Info */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <Image
                  source={require('../assets/images/ticket.png')}
                  style={{ width: 48, height: 48 }}
                  resizeMode='contain'
                />
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}
                  >
                    Reduced 1 Ride
                  </Text>
                  <Text style={{ color: '#6B7280' }}>Huntsville Transit</Text>
                </View>
              </View>

              {/* Expiration Info */}
              <View style={{ gap: 8 }}>
                <Text style={{ color: '#6B7280' }}>
                  If activated now pass will expire at
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  {getExpirationTime()}
                </Text>
              </View>

              {/* Eligibility */}
              <Text style={{ color: '#6B7280', marginBottom: 20 }}>
                Seniors (65+) and disabled citizens, Medicare/Medicaid card
                holders w/ valid ID, students with valid student ID, Children 6
                and under.
              </Text>

              {/* Action Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFA400',
                  padding: 14,
                  borderRadius: 8,
                  marginBottom: 30,
                }}
                onPress={() => {
                  handlePassPress()
                  setIsModalVisible(false)
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                  }}
                >
                  Start My Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
