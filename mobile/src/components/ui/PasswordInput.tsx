// src/components/ui/PasswordInput.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Ionicons.glyphMap; // mặc định là lock-closed
  hint?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  iconName = 'lock-closed',
  hint,
  style,
  secureTextEntry,
  ...textInputProps
}) => {
  const [show, setShow] = useState(false);

  const effectiveSecure = secureTextEntry ?? !show;

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <Ionicons name={iconName} size={22} color="#6b7280" />
        <TextInput
          style={[styles.input, { marginLeft: 12 }, style]}
          secureTextEntry={effectiveSecure}
          placeholderTextColor="#9ca3af"
          {...textInputProps}
        />
        <TouchableOpacity onPress={() => setShow(prev => !prev)}>
          <Ionicons
            name={show ? 'eye' : 'eye-off'}
            size={22}
            color="#6b7280"
          />
        </TouchableOpacity>
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  hint: { fontSize: 12, color: '#9ca3af', marginTop: 4 },
});

export default PasswordInput;   