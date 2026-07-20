// src/screens/main/HomeScreen.tsx 
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

import { Home, Briefcase, Plus, Map, User } from 'lucide-react-native';

const CURRENT_TRIP_ID = '1';

const quickActions = [
  { label: 'Itinerary', short: 'I', bg: '#EEF4FF', route: `/itinerary/${CURRENT_TRIP_ID}` },
  { label: 'Expense', short: '$', bg: '#FFF4E4', route: `/expenses/${CURRENT_TRIP_ID}` },
  { label: 'Checklist', short: 'C', bg: '#FDEBF4', route: `/checklist/${CURRENT_TRIP_ID}` },
  { label: 'Map', short: 'M', bg: '#E5F3FF', route: '/map' },
];

export default function HomeScreen() {
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
          containerStyle={{ marginTop: 22, marginBottom: 20 }}
        />

        {/* TripCard đã được cập nhật theo component mới */}
        <TripCard
          id={CURRENT_TRIP_ID}
          image="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress"
          title="Da Nang Beach Getaway"
          location="Da Nang, Vietnam"
          dateRange="22 Aug – 25 Aug 2024"
          price={800}
          status="Upcoming"
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

      {/* Bottom Bar - Giống TripsListScreen */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Home size={24} color="#2563EB" />
          <Text style={[styles.tabText, styles.activeTabText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/trips')}>
          <Briefcase size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Plus size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/map')}>
          <Map size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
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
    backgroundColor: '#F5F7FB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90, // Tăng để tránh bị bottom bar che
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

  /* ==================== BOTTOM BAR ==================== */
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});``