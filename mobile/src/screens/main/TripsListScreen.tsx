import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripsListScreen() {
  return (
    <View style={styles.container}>
      <Text>TripList Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});