import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, MapPin, Briefcase, MoreHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface TripCardProps {
  id: string | number;
  image: string;
  title: string;
  location: string;
  dateRange: string;
  price: number;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

const statusStyles: Record<TripCardProps['status'], { bg: string; text: string }> = {
  Upcoming: { bg: '#ecfdf5', text: '#10b981' },
  Ongoing: { bg: '#fff7ed', text: '#f59e0b' },
  Completed: { bg: '#ecfdf5', text: '#10b981' },
  Cancelled: { bg: '#fef2f2', text: '#ef4444' },
};

export default function TripCard({
  id,
  image,
  title,
  location,
  dateRange,
  price,
  status,
}: TripCardProps) {
  const router = useRouter();

  const handleCardPress = () => {
    router.push({
      pathname: '/trips/[id]',           // Đúng với route của bạn
      params: { id: id.toString() },
    });
  };

  const currentStatus = statusStyles[status];

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.9}
    >
      {/* Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
            <Text style={[styles.statusText, { color: currentStatus.text }]}>
              {status}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.infoRow}>
          <MapPin size={16} color="#64748b" />
          <Text style={styles.infoText}>{location}</Text>
        </View>

        {/* Date */}
        <View style={styles.infoRow}>
          <Calendar size={16} color="#64748b" />
          <Text style={styles.infoText}>{dateRange}</Text>
        </View>

        {/* Price & Menu */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Briefcase size={18} color="#2563eb" />
            <Text style={styles.price}>${price.toLocaleString()}</Text>
          </View>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={(e) => e.stopPropagation()}
          >
            <MoreHorizontal size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    marginBottom: 12,
  },
  image: {
    width: 110,
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e40af',
  },
  menuButton: {
    padding: 6,
  },
});