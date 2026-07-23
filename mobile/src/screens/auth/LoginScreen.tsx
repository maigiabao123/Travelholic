// src/screens/auth/LoginScreen.tsx (hoặc app/(auth)/login.tsx)
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '@/components/ui/AppInput';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/ui/PrimaryButton';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isWeb = Platform.OS === 'web';
  const API_BASE_URL = isWeb
    ? 'http://localhost:5000'
    : 'http://10.0.2.2:5000'; // Android emulator; đổi sang IP máy nếu dùng device thật

  const handleLogin = async () => {
    const payload = { name, password };
    console.log('Login payload:', payload);

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = data?.message || 'Đăng nhập thất bại';
        throw new Error(msg);
      }

      const token = data.token;
      const user = data.user;

      // Lưu token bằng SecureStore (Expo)
      await SecureStore.setItemAsync('authToken', token);
      await SecureStore.setItemAsync('userName', user.name);
      Alert.alert('Thành công', `Xin chào ${user.name}`, [
        {
          text: 'OK',
          onPress: () => {
            // TODO: Đổi route này cho đúng màn Home của bạn
            // nếu hiện tại bạn dùng create-trip làm home:
            // router.replace('/create-trip');
            router.replace('/home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', (error as Error).message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#1f2937" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>✈️</Text>
          <Text style={styles.brand}>TravelHolic</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Log in to continue your journey with TravelHolic
        </Text>

        <AppInput
          label="Name"
          iconName="person"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Log In"
          onPress={handleLogin}
          style={{ marginTop: 20 }}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        {/* Social */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../../../assets/images/tab-icons/google.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={28} color="#1877F2" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Don't have an account? </Text>
          <Link href="/register" style={styles.link}>
            Sign Up
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  header: {
    height: 380,
    backgroundColor: '#bae6fd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  logoContainer: { alignItems: 'center' },
  logo: { fontSize: 70, marginBottom: 8 },
  brand: { fontSize: 36, fontWeight: 'bold', color: '#1f2937' },
  formContainer: {
    backgroundColor: 'white',
    marginTop: -60,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingTop: 32,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  forgotButton: { alignSelf: 'flex-end', marginTop: -8, marginBottom: 12 },
  forgotText: { color: '#2563eb', fontWeight: '500' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  orText: { paddingHorizontal: 16, color: '#9ca3af' },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  socialIcon: { width: 28, height: 28 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  link: { color: '#2563eb', fontWeight: '600' },
});