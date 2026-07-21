// src/screens/auth/RegisterScreen.tsx (hoặc app/(auth)/register.tsx)
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AppInput from '@/components/ui/AppInput';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');   // dùng làm name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }
    if (!agreed) {
      Alert.alert('Lỗi', 'Bạn phải đồng ý với Điều khoản và Chính sách');
      return;
    }

    const payload = {
      email,          // backend: data.get("email")
      name: fullName, // backend: data.get("name")
      password,       // backend: data.get("password")
    };

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = data?.message || 'Đăng ký thất bại';
        throw new Error(msg);
      }

      Alert.alert('Thành công', 'Đăng ký tài khoản thành công!', [
        {
          text: 'OK',
          onPress: () => router.replace('/login'),
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
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={32} color="#1f2937" />
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>
              Start your adventure with TravelHolic
            </Text>
          </View>
          <Text style={styles.illustration}>🧳</Text>
        </View>

        <View style={styles.form}>
          <AppInput
            label="Full Name"
            iconName="person"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <AppInput
            label="Email"
            iconName="mail"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <PasswordInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            hint="Must be at least 8 characters"
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Terms */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreed(prev => !prev)}
        >
          <View
            style={[
              styles.checkbox,
              agreed && styles.checkboxChecked,
            ]}
          >
            {agreed && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Sign Up"
          onPress={handleSignup}
          style={{ marginTop: 10 }}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign up with</Text>
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

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <Link href="/login" style={styles.link}>
            Log In
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 24, paddingTop: 50 },
  backButton: { alignSelf: 'flex-start' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  titleContainer: { flex: 1, paddingRight: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  illustration: { fontSize: 70 },
  form: { marginTop: 30 },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#9ca3af',
    borderRadius: 6,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  termsText: { fontSize: 14, color: '#4b5563', flex: 1 },
  linkText: { color: '#2563eb' },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
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
    marginBottom: 30,
  },
  link: { color: '#2563eb', fontWeight: '600' },
});