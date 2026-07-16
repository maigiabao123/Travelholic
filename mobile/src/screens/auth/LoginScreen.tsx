import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, 
  StyleSheet, Image 
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    Alert.alert('Thành công', 'Đăng nhập thành công!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Phần hình nền */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1f2937" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>✈️</Text>
          <Text style={styles.brand}>TravelHolic</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to continue your journey with TravelHolic</Text>

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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={22} color="#6b7280" />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons name={showPass ? "eye" : "eye-off"} size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png' }} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={28} color="#1877F2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Don't have an account? </Text>
          <Link href="/register" style={styles.link}>Sign Up</Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  header: { height: 380, backgroundColor: '#bae6fd', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  logoContainer: { alignItems: 'center' },
  logo: { fontSize: 70, marginBottom: 8 },
  brand: { fontSize: 36, fontWeight: 'bold', color: '#1f2937' },
  
  formContainer: { 
    backgroundColor: 'white', 
    marginTop: -60, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 24, 
    paddingTop: 32 
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 4 },
  
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

  forgotButton: { alignSelf: 'flex-end', marginTop: 4 },
  forgotText: { color: '#2563eb', fontWeight: '500' },

  loginButton: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 16, 
    borderRadius: 16, 
    marginTop: 20 
  },
  loginButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: '600' 
  },

  divider: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 32 
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
    marginBottom: 20 
  },
  link: { color: '#2563eb', fontWeight: '600' },
});