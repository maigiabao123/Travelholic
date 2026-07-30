import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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

type PopularDestination = {
  id: string;
  continent: string;
  country: string;
  city: string;
  image: string;
};

const DEFAULT_TRIP_IMAGE =
  'https://picsum.photos/400/300';

const DEFAULT_AVATAR =
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress';

const API_BASE_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.1.62:5000';

const popularDestinations: PopularDestination[] = [
  {
    id: '1',
    continent: 'Châu Á',
    country: 'Việt Nam',
    city: 'Hạ Long',
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '2',
    continent: 'Châu Á',
    country: 'Nhật Bản',
    city: 'Kyoto',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '3',
    continent: 'Châu Âu',
    country: 'Pháp',
    city: 'Paris',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '4',
    continent: 'Châu Âu',
    country: 'Ý',
    city: 'Rome',
    image:
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '5',
    continent: 'Châu Phi',
    country: 'Ai Cập',
    city: 'Cairo',
    image:
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '6',
    continent: 'Châu Phi',
    country: 'Nam Phi',
    city: 'Cape Town',
    image:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '7',
    continent: 'Bắc Mỹ',
    country: 'Hoa Kỳ',
    city: 'New York',
    image:
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '8',
    continent: 'Bắc Mỹ',
    country: 'Canada',
    city: 'Toronto',
    image:
      'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '9',
    continent: 'Nam Mỹ',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    image:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '10',
    continent: 'Nam Mỹ',
    country: 'Argentina',
    city: 'Buenos Aires',
    image:
      'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&h=1000&q=80',
  },
  {
    id: '11',
    continent: 'Châu Đại Dương',
    country: 'Úc',
    city: 'Sydney',
    image:
      'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
  },
  {
    id: '12',
    continent: 'Châu Đại Dương',
    country: 'New Zealand',
    city: 'Queenstown',
    image:
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&h=1000&q=80',
  },
];

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

function PopularDestinationCard({
  item,
}: {
  item: PopularDestination;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.destinationCard}
      onPress={() => {
        router.push({
          pathname: '/country/[id]',
          params: {
            id: item.id,
          },
        });
      }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.destinationImage}
        imageStyle={styles.destinationImageRadius}
      >
        <View style={styles.destinationOverlay} />

        <View style={styles.destinationContent}>
          <Text style={styles.destinationContinent}>
            {item.continent}
          </Text>

          <Text style={styles.destinationCountry}>
            {item.country}
          </Text>

          <Text style={styles.destinationCity}>
            {item.city}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
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
        onMenuPress={() => { }}
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
            title={`Weather in ${upcomingTrip.location ||
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

        {/* Plan better trips */}
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

        {/* Popular destinations nằm bên dưới Plan better trips */}
        <SectionHeader
          title="Popular destinations"
          actionLabel="View all"
          onPressAction={() => {
            // Có thể thêm router.push('/destinations') sau này
          }}
          containerStyle={{
            marginTop: 26,
            marginBottom: 16,
          }}
        />

        <FlatList
          data={popularDestinations}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PopularDestinationCard item={item} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.destinationList
          }
          ItemSeparatorComponent={() => (
            <View style={{ width: 16 }} />
          )}
          snapToInterval={276}
          snapToAlignment="start"
          decelerationRate="fast"
          bounces={false}
        />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/')}
        >
          <Home size={24} color="#2563EB" />

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
          <Briefcase size={24} color="#9CA3AF" />

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
          <Plus size={32} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/Wishlist')}
        >
          <Map size={24} color="#9CA3AF" />

          <Text style={styles.tabText}>
            Wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() =>
            router.push('/profile')
          }
        >
          <User size={24} color="#9CA3AF" />

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

  destinationList: {
    paddingRight: 16,
  },

  destinationCard: {
    width: 260,
    height: 330,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: '#D1D5DB',
  },

  destinationImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  destinationImageRadius: {
    borderRadius: 22,
  },

  destinationOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
  },

  destinationContent: {
    padding: 20,
  },

  destinationContinent: {
    marginBottom: 5,
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '500',
  },

  destinationCountry: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  destinationCity: {
    marginTop: 4,
    color: '#F3F4F6',
    fontSize: 15,
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