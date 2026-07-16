import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChecklistScreen() {
  return (
    <View style={styles.container}>
      <Text>Checklist Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});