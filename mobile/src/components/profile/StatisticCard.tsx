// src/components/profile/StatisticCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatisticCardProps {
  trips: number;
  totalSpent: string;
  countries: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  trips,
  totalSpent,
  countries,
}) => {
  return (
    <View style={styles.statsCard}>
      <View style={styles.statItem}>
        <View style={[styles.statIcon, { backgroundColor: '#EEF4FF' }]} />
        <Text style={styles.statNumber}>{trips}</Text>
        <Text style={styles.statLabel}>Trips</Text>
      </View>

      <View style={styles.statItem}>
        <View style={[styles.statIcon, { backgroundColor: '#E5F8EE' }]} />
        <Text style={styles.statNumber}>{totalSpent}</Text>
        <Text style={styles.statLabel}>Total Spent</Text>
      </View>

      <View style={styles.statItem}>
        <View style={[styles.statIcon, { backgroundColor: '#FFF4E4' }]} />
        <Text style={styles.statNumber}>{countries}</Text>
        <Text style={styles.statLabel}>Countries</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsCard: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statIcon: { width: 26, height: 26, borderRadius: 13, marginBottom: 6 },
  statNumber: { fontSize: 16, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
});

export default StatisticCard;