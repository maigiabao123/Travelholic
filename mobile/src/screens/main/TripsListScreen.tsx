// src/app/trips/index.tsx

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  Briefcase,
  Home,
  Map,
  Plus,
  User,
} from 'lucide-react-native';
import { router, useFocusEffect } from 'expo-router';
import TripCard from '../../components/trip/TripCard';

type TripStatus =
  | 'Upcoming'
  | 'Ongoing'
  | 'Completed'
  | 'Cancelled';

interface Trip {
  id: string | number;
  image: string;
  title: string;
  location: string;
  dateRange: string;
  price: number;
  status: TripStatus;
}

const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.1.62:5000';

const DEFAULT_IMAGE = 'https://picsum.photos/400/300';

function normalizeStatus(status: unknown): TripStatus {
  if (
    status === 'Upcoming' ||
    status === 'Ongoing' ||
    status === 'Completed' ||
    status === 'Cancelled'
  ) {
    return status;
  }

  return 'Upcoming';
}

function normalizeTrip(data: any): Trip {
  const destination = data?.destination ?? '';
  const country = data?.country ?? '';

  const location =
    data?.location ||
    [destination, country].filter(Boolean).join(', ') ||
    'Unknown location';

  const dateRange =
    data?.dateRange ||
    [
      data?.start_date,
      data?.end_date,
    ]
      .filter(Boolean)
      .join(' – ') ||
    'No date available';

  const rawPrice = data?.price ?? data?.budget ?? 0;
  const price = Number(rawPrice);

  return {
    id: data?.id,

    image:
      data?.image ||
      data?.cover_image_url ||
      DEFAULT_IMAGE,

    title:
      data?.title ||
      data?.name ||
      'Untitled trip',

    location,

    dateRange,

    price: Number.isNaN(price) ? 0 : price,

    status: normalizeStatus(data?.status),
  };
}

export default function TripsListScreen() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTrips = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const token = await SecureStore.getItemAsync('authToken');

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/trips`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('userName');

        router.replace('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || 'Unable to load your trips.',
        );
      }

      const normalizedTrips = Array.isArray(data?.trips)
        ? data.trips.map(normalizeTrip)
        : [];

      setTrips(normalizedTrips);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the server.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [fetchTrips]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <Text style={styles.loadingText}>
            Loading trips...
          </Text>
        </View>
      )}

      {!loading && error !== '' && (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchTrips}
          >
            <Text style={styles.retryText}>
              Try again
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && error === '' && (
        <ScrollView
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {trips.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You do not have any trips yet.
              </Text>
            </View>
          ) : (
            trips.map((trip) => (
              <TripCard
                key={trip.id.toString()}
                id={trip.id}
                image={trip.image}
                title={trip.title}
                location={trip.location}
                dateRange={trip.dateRange}
                price={trip.price}
                status={trip.status}
              />
            ))
          )}
        </ScrollView>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/')}
        >
          <Home size={24} color="#64748b" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Briefcase size={24} color="#3b82f6" />
          <Text
            style={[
              styles.tabText,
              styles.activeTabText,
            ]}
          >
            Trips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/booking/create')}
        >
          <Plus size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/Wishlist')}
        >
          <Map size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/profile')}
        >
          <User size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e2937',
  },

  list: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },

  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
  },

  errorText: {
    marginBottom: 16,
    fontSize: 15,
    color: '#dc2626',
    textAlign: 'center',
  },

  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },

  emptyText: {
    fontSize: 15,
    color: '#64748b',
  },

  bottomBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 70,
    paddingHorizontal: 10,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 6,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    marginTop: 4,
    fontSize: 11,
    color: '#9CA3AF',
  },

  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },

  addButton: {
    width: 56,
    height: 56,
    marginHorizontal: 8,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});