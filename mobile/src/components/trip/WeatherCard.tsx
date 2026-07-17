// src/components/trip/WeatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface WeatherCardProps {
  title: string;
  subtitle: string;
  temp: string;
  description: string;
  humidity: string;
  wind: string;
  onPress?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  subtitle,
  temp,
  description,
  humidity,
  wind,
  onPress,
}) => {
  const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;

  return (
    <Wrapper activeOpacity={0.8} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.temp}>{temp}</Text>
            <Text style={styles.desc}>{description}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaText}>Humidity {humidity}</Text>
            <Text style={styles.metaText}>Wind {wind}</Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { fontSize: 14, fontWeight: '600', color: '#111827' },
  subtitle: { fontSize: 11, color: '#6B7280' },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temp: { fontSize: 26, fontWeight: '700', color: '#111827' },
  desc: { fontSize: 13, color: '#6B7280' },
  meta: { justifyContent: 'center', alignItems: 'flex-end' },
  metaText: { fontSize: 11, color: '#6B7280' },
});

export default WeatherCard;