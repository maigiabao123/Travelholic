// src/components/ui/AppInput.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppInputProps extends TextInputProps {
  label?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  iconName,
  style,
  ...textInputProps
}) => {
  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {iconName && (
          <Ionicons name={iconName} size={22} color="#6b7280" />
        )}
        <TextInput
          style={[styles.input, iconName && { marginLeft: 12 }, style]}
          placeholderTextColor="#9ca3af"
          {...textInputProps}
        />
      </View>
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
});

export default AppInput;