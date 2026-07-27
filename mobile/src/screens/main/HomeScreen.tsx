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
import { apiRequest } from '@/services/api';

type TripStatus =
  | 'Upcoming'
  | 'Ongoing'
  | 'Completed'
  | 'Cancelled';

type Profile = {
  user_id: number;
  name: string;
  email: string;
  location: string;
  avatarUrl: string | null;
  tripsTotal: number;
  countriesVisited: number;
  totalSpent: number;
  wishlistedPlaces: number;
};

interface Trip {
  id: string | number;
  image?: string | null;
  title?: string | null;
  location?: string | null;
  dateRange?: string | null;
  price?: number | string | null;
  name?: string | null;
  destination?: string | null;
  country?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  budget?: number | string | null;
  currency_code?: string | null;
  cover_image_url?: string | null;
  description?: string | null;
  travel_type?: string | null;
  transportation_type?: string | null;
  hotel_name?: string | null;
  status?: TripStatus | null;
}

const DEFAULT_TRIP_IMAGE =
  'https://picsum.photos/400/300';

const DEFAULT_AVATAR =
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress';

const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.1.62:5000';

function formatAmount(
  value: number | string | null | undefined,
): string {
  const amount = Number(value) || 0;

  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  }

  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }

  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  }

  return `$${amount.toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`;
}

function normalizeTrip(data: any): Trip {
  const destination = data?.destination ?? '';
  const country = data?.country ?? '';

  const location =
    data?.location ||
    [destination, country]
      .filter(Boolean)
      .join(', ') ||
    'Unknown location';

  const dateRange =
    data?.dateRange ||
    [data?.start_date, data?.end_date]
      .filter(Boolean)
      .join(' – ') ||
    'No date available';

  return {
    id: data?.id,
    image:
      data?.image ??
      data?.cover_image_url ??
      null,
    title:
      data?.title ??
      data?.name ??
      'Untitled trip',
    location,
    dateRange,
    price:
      data?.price ??
      data?.budget ??
      0,
    name: data?.name,
    destination: data?.destination,
    country: data?.country,
    start_date: data?.start_date,
    end_date: data?.end_date,
    budget: data?.budget,
    currency_code: data?.currency_code,
    cover_image_url: data?.cover_image_url,
    description: data?.description,
    travel_type: data?.travel_type,
    transportation_type:
      data?.transportation_type,
    hotel_name: data?.hotel_name,
    status: data?.status ?? 'Upcoming',
  };
}

export default function HomeScreen() {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [upcomingTrip, setUpcomingTrip] =
    useState<Trip | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const token =
        await SecureStore.getItemAsync('authToken');

      if (!token) {
        router.replace('/login');
        return;
      }

      const profileData =
        await apiRequest<Profile>('/api/profile');

      setProfile(profileData);

      const response = await fetch(
        `${API_BASE_URL}/api/trips/upcoming`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 401) {
        await SecureStore.deleteItemAsync(
          'authToken',
        );

        await SecureStore.deleteItemAsync(
          'userName',
        );

        router.replace('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Unable to load the upcoming trip.',
        );
      }

      if (data?.trip) {
        setUpcomingTrip(
          normalizeTrip(data.trip),
        );
      } else {
        setUpcomingTrip(null);
      }
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
      fetchHomeData();
    }, [fetchHomeData]),
  );

  const handleQuickActionPress = (
    route: string,
  ) => {
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
        avatarUri={
          profile?.avatarUrl || DEFAULT_AVATAR
        }
        showNotificationDot
        onAvatarPress={() =>
          router.push('/profile')
        }
        onMenuPress={() => {}}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.helloText}>
            Hello, {profile?.name || 'Traveler'}! 👋
          </Text>

          <Text style={styles.subtitle}>
            Where do you want to go next?
          </Text>
        </View>

        {profile ? (
          <StatisticCard
            trips={profile.tripsTotal}
            totalSpent={formatAmount(
              profile.totalSpent,
            )}
            countries={
              profile.countriesVisited
            }
          />
        ) : (
          <View style={styles.statsLoading}>
            <ActivityIndicator
              size="small"
              color="#2563EB"
            />
          </View>
        )}

        <SectionHeader
          title="Upcoming Trip"
          actionLabel="View all"
          onPressAction={() =>
            router.push('/trips')
          }
          containerStyle={{
            marginTop: 22,
            marginBottom: 20,
          }}
        />

        {loading ? (
          <ActivityIndicator
            size="small"
            color="#2563EB"
            style={styles.loading}
          />
        ) : error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : upcomingTrip ? (
          <TripCard
            id={upcomingTrip.id}
            image={
              upcomingTrip.image ||
              DEFAULT_TRIP_IMAGE
            }
            title={
              upcomingTrip.title ||
              'Untitled trip'
            }
            location={
              upcomingTrip.location ||
              'Unknown location'
            }
            dateRange={
              upcomingTrip.dateRange ||
              'No date available'
            }
            price={upcomingTrip.price ?? 0}
            status={
              upcomingTrip.status || 'Upcoming'
            }
          />
        ) : (
          <Text style={styles.emptyText}>
            You do not have any upcoming trips.
          </Text>
        )}

        {upcomingTrip && (
          <WeatherCard
            title={`Weather in ${
              upcomingTrip.location ||
              'your destination'
            }`}
            subtitle="Today"
            temp="29°C"
            description="Sunny"
            humidity="72%"
            wind="12 km/h"
            onPress={() =>
              router.push(
                `/weather/${upcomingTrip.id}`,
              )
            }
          />
        )}

        <SectionHeader
          title="Quick Actions"
          containerStyle={{
            marginTop: 22,
          }}
        />

        <QuickActionsRow
          actions={quickActions}
          onPressAction={
            handleQuickActionPress
          }
        />

        <View style={styles.tipCard}>
          <View style={styles.tipIcon} />

          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>
              Plan better trips
            </Text>

            <Text style={styles.tipDesc}>
              Organise everything in one place and
              enjoy your adventure!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/')}
        >
          <Home
            size={24}
            color="#2563EB"
          />

          <Text
            style={[
              styles.tabText,
              styles.activeTabText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/trips')}
        >
          <Briefcase
            size={24}
            color="#9CA3AF"
          />

          <Text style={styles.tabText}>
            Trips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push('/booking/create')
          }
        >
          <Plus
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/map')}
        >
          <Map
            size={24}
            color="#9CA3AF"
          />

          <Text style={styles.tabText}>
            Map
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() =>
            router.push('/profile')
          }
        >
          <User
            size={24}
            color="#9CA3AF"
          />

          <Text style={styles.tabText}>
            Profile
          </Text>
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

  statsLoading: {
    height: 110,
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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

  tipContent: {
    flex: 1,
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