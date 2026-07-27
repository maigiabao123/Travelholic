import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Calendar,
  MapPin,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

type TripStatus =
  | 'Upcoming'
  | 'Ongoing'
  | 'Completed'
  | 'Cancelled';

interface TripCardProps {
  id: string | number;
  image?: string | null;
  title?: string | null;
  location?: string | null;
  dateRange?: string | null;
  price?: number | string | null;
  status?: TripStatus | null;
}

const statusStyles: Record<
  TripStatus,
  { bg: string; text: string }
> = {
  Upcoming: {
    bg: '#ecfdf5',
    text: '#10b981',
  },
  Ongoing: {
    bg: '#fff7ed',
    text: '#f59e0b',
  },
  Completed: {
    bg: '#ecfdf5',
    text: '#10b981',
  },
  Cancelled: {
    bg: '#fef2f2',
    text: '#ef4444',
  },
};

const DEFAULT_IMAGE = 'https://picsum.photos/400/300';

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
      pathname: '/trips/[id]',
      params: {
        id: id.toString(),
      },
    });
  };

  const safeStatus: TripStatus = status ?? 'Upcoming';
  const currentStatus = statusStyles[safeStatus];

  const numericPrice = Number(price ?? 0);

  const formattedPrice = Number.isNaN(numericPrice)
    ? '$0'
    : `$${numericPrice.toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handleCardPress}
      activeOpacity={0.9}
    >
      {/* Image */}
      <Image
        source={{
          uri: image || DEFAULT_IMAGE,
        }}
        style={styles.image}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {title || 'Untitled trip'}
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: currentStatus.bg,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: currentStatus.text,
                },
              ]}
            >
              {safeStatus}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.infoRow}>
          <MapPin size={16} color="#64748b" />

          <Text style={styles.infoText} numberOfLines={1}>
            {location || 'Unknown location'}
          </Text>
        </View>

        {/* Date */}
        <View style={styles.infoRow}>
          <Calendar size={16} color="#64748b" />

          <Text style={styles.infoText} numberOfLines={1}>
            {dateRange || 'No date available'}
          </Text>
        </View>

        {/* Price & Menu */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Briefcase size={18} color="#2563eb" />

            <Text style={styles.price}>{formattedPrice}</Text>
          </View>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={(event) => event.stopPropagation()}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
    backgroundColor: '#e5e7eb',
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
    color: '#0f172a',
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
    flex: 1,
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