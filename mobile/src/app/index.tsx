// app/index.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          router.replace('/');
        } else {

          router.replace('/login');
        }
      } catch (err) {
        console.warn('Error reading token', err);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);


  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return null; 
}