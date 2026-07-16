// src/screens/main/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const CURRENT_TRIP_ID = '1';

const footerTabs = [
  { key: 'home', label: 'Home', icon: 'home-outline', route: '/' },
  { key: 'trips', label: 'Trips', icon: 'briefcase-outline', route: '/trips' },
  { key: 'map', label: 'Map', icon: 'map-outline', route: '/map' },
  { key: 'profile', label: 'Profile', icon: 'person-outline', route: '/profile' },
];

const quickActions = [
  {
    label: 'New Trip',
    short: '+',
    bg: '#E6F7F0',
    route: `/booking/${CURRENT_TRIP_ID}`,
  },
  {
    label: 'Itinerary',
    short: 'I',
    bg: '#EEF4FF',
    route: `/itinerary/${CURRENT_TRIP_ID}`,
  },
  {
    label: 'Expense',
    short: '$',
    bg: '#FFF4E4',
    route: `/expenses/${CURRENT_TRIP_ID}`,
  },
  {
    label: 'Checklist',
    short: 'C',
    bg: '#FDEBF4',
    route: `/checklist/${CURRENT_TRIP_ID}`,
  },
  {
    label: 'Map',
    short: 'M',
    bg: '#E5F3FF',
    route: '/map',
  },
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
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.menuBtn}>
              <View style={styles.menuLine} />
              <View style={[styles.menuLine, { width: 14 }]} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <View style={styles.notificationDot} />
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress',
                }}
                style={styles.avatar}
              />
            </View>
          </View>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Text style={styles.helloText}>Hello, Traveler! 👋</Text>
            <Text style={styles.subtitle}>
              Where do you want to go next?
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#EEF4FF' }]} />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#E5F8EE' }]} />
              <Text style={styles.statNumber}>18.6M</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#FFF4E4' }]} />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
          </View>

          {/* Upcoming Trip */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Trip</Text>
            <Text style={styles.sectionLink}>View all</Text>
          </View>

          <View style={styles.upcomingCard}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateDay}>22</Text>
              <Text style={styles.dateMonth}>AUG</Text>
            </View>
            <View style={styles.upcomingImageWrapper}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress',
                }}
                style={styles.upcomingImage}
              />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.tripTitle}>Da Nang, Vietnam</Text>
              <Text style={styles.tripSub}>
                22 Aug – 25 Aug 2024
              </Text>
            </View>
          </View>

          {/* Weather – nhấn để sang trang thời tiết */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/weather/${CURRENT_TRIP_ID}`)}
          >
            <View style={styles.weatherCard}>
              <View style={styles.weatherHeader}>
                <View>
                  <Text style={styles.weatherTitle}>Weather in Da Nang</Text>
                  <Text style={styles.weatherSub}>Today</Text>
                </View>
              </View>

              <View style={styles.weatherRow}>
                <View style={styles.weatherMain}>
                  <Text style={styles.weatherTemp}>29°C</Text>
                  <Text style={styles.weatherDesc}>Sunny</Text>
                </View>
                <View style={styles.weatherMeta}>
                  <Text style={styles.metaText}>Humidity 72%</Text>
                  <Text style={styles.metaText}>Wind 12 km/h</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRow}
          >
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.quickItem}
                onPress={() => handleQuickActionPress(action.route)}
              >
                <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
                  <Text style={styles.quickIconText}>{action.short}</Text>
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Bottom card */}
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

        {/* Footer với icon + điều hướng */}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuBtn: { width: 32, height: 32, justifyContent: 'center' },
  menuLine: {
    height: 3,
    width: 18,
    borderRadius: 2,
    backgroundColor: '#111827',
    marginBottom: 4,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginRight: 12,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  greeting: { marginTop: 20 },
  helloText: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 4, fontSize: 14, color: '#6B7280' },
  statsCard: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statIcon: { width: 26, height: 26, borderRadius: 13, marginBottom: 6 },
  statNumber: { fontSize: 16, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  sectionHeader: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sectionLink: { fontSize: 12, color: '#2563EB' },
  upcomingCard: {
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
  upcomingImageWrapper: { borderRadius: 14, overflow: 'hidden' },
  upcomingImage: { width: '100%', height: 170 },
  upcomingInfo: { marginTop: 10 },
  tripTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  tripSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  weatherCard: {
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
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  weatherSub: { fontSize: 11, color: '#6B7280' },
  weatherRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherMain: {},
  weatherTemp: { fontSize: 26, fontWeight: '700', color: '#111827' },
  weatherDesc: { fontSize: 13, color: '#6B7280' },
  weatherMeta: { justifyContent: 'center', alignItems: 'flex-end' },
  metaText: { fontSize: 11, color: '#6B7280' },
  quickRow: { marginTop: 10, paddingRight: 16 },
  quickItem: { width: 80, marginRight: 12, alignItems: 'center' },
  quickIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconText: { fontSize: 20, fontWeight: '700' },
  quickLabel: {
    marginTop: 6,
    fontSize: 11,
    color: '#111827',
    textAlign: 'center',
  },
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