import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>TripDetail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});