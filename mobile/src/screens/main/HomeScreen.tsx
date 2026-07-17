// src/screens/main/HomeScreen.tsx (đặt ở nơi bạn muốn, ví dụ app/(main)/home.tsx)
import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import AppHeader from '@/components/common/AppHeader';
import SectionHeader from '@/components/common/SectionHeader';
import QuickActionsRow from '@/components/ui/QuickActionsRow';

import StatisticCard from '@/components/profile/StatisticCard';
import TripCard from '@/components/trip/TripCard';
import WeatherCard from '@/components/trip/WeatherCard';

const CURRENT_TRIP_ID = '1';

const footerTabs = [
  { key: 'home', label: 'Home', icon: 'home-outline', route: '/' },
  { key: 'trips', label: 'Trips', icon: 'briefcase-outline', route: '/trips' },
  { key: 'map', label: 'Map', icon: 'map-outline', route: '/map' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', route: '/profile' },
];

const quickActions = [
  { label: 'New Trip',  short: '+', bg: '#E6F7F0', route: `/booking/${CURRENT_TRIP_ID}` },
  { label: 'Itinerary', short: 'I', bg: '#EEF4FF', route: `/itinerary/${CURRENT_TRIP_ID}` },
  { label: 'Expense',   short: '$', bg: '#FFF4E4', route: `/expenses/${CURRENT_TRIP_ID}` },
  { label: 'Checklist', short: 'C', bg: '#FDEBF4', route: `/checklist/${CURRENT_TRIP_ID}` },
  { label: 'Map',       short: 'M', bg: '#E5F3FF', route: '/map' },
];

export default function HomeScreen() {
  const handleTabPress = (route: string) => {
    router.push(route as any);
  };

  const handleQuickActionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader
        avatarUri="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress"
        showNotificationDot
        onMenuPress={() => {}}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.helloText}>Hello, Traveler! 👋</Text>
          <Text style={styles.subtitle}>Where do you want to go next?</Text>
        </View>

        {/* Stats */}
        <StatisticCard trips={12} totalSpent="18.6M" countries={8} />

        {/* Upcoming Trip */}
        <SectionHeader
          title="Upcoming Trip"
          actionLabel="View all"
          onPressAction={() => router.push('/trips')}
          containerStyle={{ marginTop: 22 }}
        />
        <TripCard
          dateDay="22"
          dateMonth="AUG"
          imageUri="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress"
          title="Da Nang, Vietnam"
          subtitle="22 Aug – 25 Aug 2024"
          onPress={() => router.push(`/trips/${CURRENT_TRIP_ID}`)}
        />

        {/* Weather */}
        <WeatherCard
          title="Weather in Da Nang"
          subtitle="Today"
          temp="29°C"
          description="Sunny"
          humidity="72%"
          wind="12 km/h"
          onPress={() => router.push(`/weather/${CURRENT_TRIP_ID}`)}
        />

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" containerStyle={{ marginTop: 22 }} />
        <QuickActionsRow actions={quickActions} onPressAction={handleQuickActionPress} />

        {/* Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Plan better trips</Text>
            <Text style={styles.tipDesc}>
              Organize everything in one place and enjoy your adventure!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom tabs giữ nguyên vào đây */}
      <View style={styles.bottomTabs}>
        {footerTabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.route)}
          >
            <Ionicons
              name={tab.icon as any}
              size={22}
              color={tab.key === 'home' ? '#2563EB' : '#9CA3AF'}
            />
            <Text
              style={[
                styles.tabLabel,
                tab.key === 'home' && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  greeting: { marginTop: 20 },
  helloText: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },

  tipCard: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tipIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: '#FFF4E4',
    marginRight: 12,
  },
  tipTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  tipDesc: { marginTop: 4, fontSize: 11, color: '#6B7280' },

  bottomTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF' },
  tabLabelActive: { color: '#2563EB', fontWeight: '600' },
});