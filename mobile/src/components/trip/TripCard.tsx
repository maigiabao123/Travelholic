// src/components/trip/TripCard.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface TripCardProps {
  dateDay: string;
  dateMonth: string;
  imageUri: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const TripCard: React.FC<TripCardProps> = ({
  dateDay,
  dateMonth,
  imageUri,
  title,
  subtitle,
  onPress,
}) => {
  const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;

  return (
    <Wrapper activeOpacity={0.8} onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{dateDay}</Text>
          <Text style={styles.dateMonth}>{dateMonth}</Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>

        <View style={styles.info}>
          <Text style={styles.tripTitle}>{title}</Text>
          <Text style={styles.tripSub}>{subtitle}</Text>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  dateBadge: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
  },
  dateDay: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  dateMonth: { fontSize: 10, color: '#E5E7EB' },
  imageWrapper: { borderRadius: 14, overflow: 'hidden' },
  image: { width: '100%', height: 170 },
  info: { marginTop: 10 },
  tripTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  tripSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});

export default TripCard;