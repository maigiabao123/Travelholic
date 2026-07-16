import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, 
  StyleSheet, Image 
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  const handleSignup = () => {
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
    Alert.alert('Thành công', 'Đăng ký tài khoản thành công!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="#1f2937" />
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.subtitle}>Start your adventure with TravelHolic</Text>
          </View>
          <Text style={styles.illustration}>🧳</Text>
        </View>

        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={22} color="#6b7280" />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail" size={22} color="#6b7280" />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" size={22} color="#6b7280" />
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                <Ionicons name={showPass ? "eye" : "eye-off"} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <Text style={styles.hint}>Must be at least 8 characters</Text>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed" size={22} color="#6b7280" />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPass}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                <Ionicons name={showConfirmPass ? "eye" : "eye-off"} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Terms */}
        <TouchableOpacity style={styles.termsContainer} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
            {agreed && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign up with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' }} 
              style={styles.socialIcon} 
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
          <Link href="/login" style={styles.link}>Log In</Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 24, paddingTop: 50 },
  backButton: { alignSelf: 'flex-start' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 },
  titleContainer: { flex: 1, paddingRight: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  illustration: { fontSize: 70 },

  form: { marginTop: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 6 },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f3f4f6', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    paddingVertical: 14 
  },
  input: { flex: 1, marginLeft: 12, fontSize: 16 },
  hint: { fontSize: 12, color: '#9ca3af', marginTop: 4 },

  termsContainer: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginVertical: 20 
  },
  checkbox: { 
    width: 22, 
    height: 22, 
    borderWidth: 2, 
    borderColor: '#9ca3af', 
    borderRadius: 6, 
    marginRight: 12, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  checkboxChecked: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  termsText: { fontSize: 14, color: '#4b5563', flex: 1 },
  linkText: { color: '#2563eb' },

  signupButton: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 16, 
    borderRadius: 16, 
    marginTop: 10 
  },
  signupButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: '600' 
  },

  divider: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 30 
  },
  line: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  orText: { paddingHorizontal: 16, color: '#9ca3af' },

  socialContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  socialButton: { 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    padding: 16, 
    borderRadius: 16, 
    flex: 1, 
    alignItems: 'center', 
    marginHorizontal: 6 
  },
  socialIcon: { width: 28, height: 28 },

  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 40, 
    marginBottom: 30 
  },
  link: { color: '#2563eb', fontWeight: '600' },
});