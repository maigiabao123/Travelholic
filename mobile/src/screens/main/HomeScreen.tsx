// src/screens/main/HomeScreen.tsx

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {
  Home,
  Briefcase,
  Plus,
  Map,
  User,
} from 'lucide-react-native';

import AppHeader from '@/components/common/AppHeader';
import SectionHeader from '@/components/common/SectionHeader';
import QuickActionsRow from '@/components/ui/QuickActionsRow';
import StatisticCard from '@/components/profile/StatisticCard';
import TripCard from '@/components/trip/TripCard';
import WeatherCard from '@/components/trip/WeatherCard';

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

const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://10.0.2.2:5000';

// Nếu dùng điện thoại thật, thay bằng IP máy chạy Flask:
// const API_BASE_URL = 'http://192.168.1.10:5000';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadUserName = async () => {
        const name = await SecureStore.getItemAsync('userName');

        console.log('Tên lấy từ SecureStore:', name);

        if (name) {
          setUserName(name);
        }
      };

      loadUserName();
    }, [])
  );
  const [upcomingTrip, setUpcomingTrip] = useState<Trip | null>(null);
  const [loadingTrip, setLoadingTrip] = useState(true);
  const [error, setError] = useState('');

  const fetchHomeData = async () => {
    try {
      setLoadingTrip(true);
      setError('');

      const token = await SecureStore.getItemAsync('authToken');
      const storedUserName =
        await SecureStore.getItemAsync('userName');

      if (storedUserName) {
        setUserName(storedUserName);
      }

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/trips/upcoming`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('userName');
        router.replace('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Không thể tải chuyến đi sắp tới.'
        );
      }

      setUpcomingTrip(data.trip || null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Không thể kết nối đến server.'
      );
    } finally {
      setLoadingTrip(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
    }, [])
  );

  const handleQuickActionPress = (route: string) => {
    router.push(route as any);
  };

  const quickActions = [
    {
      label: 'Itinerary',
      short: 'I',
      bg: '#EEF4FF',
      route: upcomingTrip
        ? `/itinerary/${upcomingTrip.id}`
        : '/trips',
    },
    {
      label: 'Expense',
      short: '$',
      bg: '#FFF4E4',
      route: upcomingTrip
        ? `/expenses/${upcomingTrip.id}`
        : '/trips',
    },
    {
      label: 'Checklist',
      short: 'C',
      bg: '#FDEBF4',
      route: upcomingTrip
        ? `/checklist/${upcomingTrip.id}`
        : '/trips',
    },
    {
      label: 'Map',
      short: 'M',
      bg: '#E5F3FF',
      route: '/map',
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader
        avatarUri="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress"
        showNotificationDot
        onAvatarPress={() => router.push('/profile')}
        onMenuPress={() => { }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.helloText}>
            Hello, {userName || 'Traveler'}! 👋
          </Text>

          <Text style={styles.subtitle}>
            Where do you want to go next?
          </Text>
        </View>

        {/* Thống kê hiện vẫn dùng dữ liệu cố định */}
        <StatisticCard
          trips={12}
          totalSpent="18.6M"
          countries={8}
        />

        {/* Upcoming Trip */}
        <SectionHeader
          title="Upcoming Trip"
          actionLabel="View all"
          onPressAction={() => router.push('/trips')}
          containerStyle={{
            marginTop: 22,
            marginBottom: 20,
          }}
        />

        {loadingTrip ? (
          <ActivityIndicator
            size="small"
            color="#2563EB"
            style={styles.loading}
          />
        ) : error !== '' ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : upcomingTrip ? (
          <TripCard
            id={upcomingTrip.id}
            image={upcomingTrip.image}
            title={upcomingTrip.title}
            location={upcomingTrip.location}
            dateRange={upcomingTrip.dateRange}
            price={upcomingTrip.price}
            status={upcomingTrip.status}
          />
        ) : (
          <Text style={styles.emptyText}>
            Bạn chưa có chuyến đi sắp tới.
          </Text>
        )}

        {/* Weather */}
        {upcomingTrip && (
          <WeatherCard
            title={`Weather in ${upcomingTrip.location}`}
            subtitle="Today"
            temp="29°C"
            description="Sunny"
            humidity="72%"
            wind="12 km/h"
            onPress={() =>
              router.push(`/weather/${upcomingTrip.id}`)
            }
          />
        )}

        {/* Quick Actions */}
        <SectionHeader
          title="Quick Actions"
          containerStyle={{ marginTop: 22 }}
        />

        <QuickActionsRow
          actions={quickActions}
          onPressAction={handleQuickActionPress}
        />

        {/* Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon} />

          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>
              Plan better trips
            </Text>

            <Text style={styles.tipDesc}>
              Organize everything in one place and enjoy your adventure!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/')}
        >
          <Home size={24} color="#2563EB" />
          <Text style={[styles.tabText, styles.activeTabText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/trips')}
        >
          <Briefcase size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/booking/create')}
        >
          <Plus size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/map')}
        >
          <Map size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Map</Text>
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
  safe: {
    flex: 1,
    marginTop: -50,
    backgroundColor: '#F5F7FB',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 110,
  },

  greeting: {
    marginTop: 20,
  },

  helloText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },

  loading: {
    marginVertical: 24,
  },

  errorText: {
    paddingVertical: 20,
    color: '#DC2626',
    textAlign: 'center',
  },

  emptyText: {
    paddingVertical: 20,
    color: '#64748B',
    textAlign: 'center',
  },

  tipCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  tipIcon: {
    width: 44,
    height: 44,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#FFF4E4',
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  tipDesc: {
    marginTop: 4,
    fontSize: 11,
    color: '#6B7280',
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