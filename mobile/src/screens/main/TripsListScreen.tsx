import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Home, Briefcase, Plus, Map, User } from 'lucide-react-native';
import TripCard from '../../components/trip/TripCard';
import { router } from 'expo-router';

// Dữ liệu mẫu
const trips = [
  {
    id: 1,
    image: 'https://source.unsplash.com/random/300x200/?beach',
    title: 'Da Nang Beach Getaway',
    location: 'Da Nang, Vietnam',
    dateRange: '20 May – 25 May 2024',
    price: 800,
    status: 'Upcoming' as const,
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/random/300x200/?japan',
    title: 'Spring in Japan',
    location: 'Tokyo, Japan',
    dateRange: '10 Apr – 20 Apr 2024',
    price: 2500,
    status: 'Ongoing' as const,
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/random/300x200/?santorini',
    title: 'Santorini Escape',
    location: 'Santorini, Greece',
    dateRange: '1 Mar – 8 Mar 2024',
    price: 1200,
    status: 'Completed' as const,
  },
  {
    id: 4,
    image: 'https://source.unsplash.com/random/300x200/?banff',
    title: 'Banff National Park',
    location: 'Alberta, Canada',
    dateRange: '15 Feb – 22 Feb 2024',
    price: 1000,
    status: 'Cancelled' as const,
  },
  {
    id: 5,
    image: 'https://source.unsplash.com/random/300x200/?paris',
    title: 'Paris Romantic Trip',
    location: 'Paris, France',
    dateRange: '5 Jun – 12 Jun 2024',
    price: 1800,
    status: 'Upcoming' as const,
  },
];

export default function TripsListScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>

      {/* List of Trips */}
      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            image={trip.image}
            title={trip.title}
            location={trip.location}
            dateRange={trip.dateRange}
            price={trip.price}
            status={trip.status}
          />
        ))}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
          <Home size={24} color="#64748b" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Briefcase size={24} color="#3b82f6" />
          <Text style={[styles.tabText, styles.activeTabText]}>Trips</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/booking/create')}>
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
  },

  /* ==================== BOTTOM BAR ==================== */
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 70,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 11,
    marginTop: 4,
    color: '#64748b',
  },
  activeTabText: {
    color: '#3b82f6',
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
});