// app/profile.tsx
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
import { Home, Briefcase, Plus, Map, User } from 'lucide-react-native';
import { router, usePathname } from 'expo-router';

const hardcodedProfile = {
  name: 'Olivia Nguyen',
  email: 'olivia.nguyen@gmail.com',
  location: 'Hanoi, Vietnam',
  avatarUrl:
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress',
  tripsTotal: 12,
  countriesVisited: 5,
  totalSpent: 4250,
  wishlistedPlaces: 18,
};

export default function ProfileScreen() {
  const pathname = usePathname();
  const profile = hardcodedProfile;

  const isActive = (path: string) => pathname === path;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header đơn giản, không ảnh nền */}
        <View style={styles.header}>
          <View style={styles.topBar}>
            <Text style={styles.screenTitle}>Profile</Text>
            <View style={styles.topIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Text>🔔</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Text>⚙️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Avatar + info */}
          <View style={styles.profileRow}>
            <View>
              <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
              <TouchableOpacity style={styles.cameraButton}>
                <Text style={{ fontSize: 12 }}>📷</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.email}>{profile.email}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText}>{profile.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats card */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#E6F0FF' }]}>
              <Text>💼</Text>
            </View>
            <Text style={styles.statValue}>{profile.tripsTotal}</Text>
            <Text style={styles.statLabel}>Trips{'\n'}Total</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#E9FFF4' }]}>
              <Text>🌍</Text>
            </View>
            <Text style={styles.statValue}>{profile.countriesVisited}</Text>
            <Text style={styles.statLabel}>Countries{'\n'}Visited</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#F4ECFF' }]}>
              <Text>💳</Text>
            </View>
            <Text style={styles.statValue}>${profile.totalSpent.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Spent{'\n'}All Time</Text>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#FFECEC' }]}>
              <Text>🧡</Text>
            </View>
            <Text style={styles.statValue}>{profile.wishlistedPlaces}</Text>
            <Text style={styles.statLabel}>Wishlisted{'\n'}Places</Text>
          </View>
        </View>

        {/* Menu list */}
        <View style={styles.menuCard}>
          {renderMenuItem('My Profile', 'View and edit your personal information')}
          {renderMenuItem('Wishlist', 'Places you want to visit')}
          {renderMenuItem('Travel Statistics', 'View your travel insights and stats')}
          {renderMenuItem('My Trips', 'View and manage your trips')}
          {renderMenuItem('Settings', 'App preferences and configurations')}
          {renderMenuItem('About TravelHolic', 'App information and terms')}
          {renderMenuItem('Log Out', 'Sign out from your account', true)}
        </View>

        {/* Bottom bar với icon Lucide, CSS giống design profile */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/')}>
            <Home size={24} color={isActive('/') ? '#1060FF' : '#9CA3AF'} />
            <Text
              style={[
                styles.tabLabel,
                isActive('/') && { color: '#1060FF', fontWeight: '600' },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/trips')}>
            <Briefcase size={24} color={isActive('/trips') ? '#1060FF' : '#9CA3AF'} />
            <Text
              style={[
                styles.tabLabel,
                isActive('/trips') && { color: '#1060FF', fontWeight: '600' },
              ]}
            >
              Trips
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => router.push('/booking/create')}
          >
            <Plus size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/map')}>
            <Map size={24} color={isActive('/map') ? '#1060FF' : '#9CA3AF'} />
            <Text
              style={[
                styles.tabLabel,
                isActive('/map') && { color: '#1060FF', fontWeight: '600' },
              ]}
            >
              Itinerary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
            <User size={24} color={isActive('/profile') ? '#1060FF' : '#9CA3AF'} />
            <Text
              style={[
                styles.tabLabel,
                isActive('/profile') && { color: '#1060FF', fontWeight: '600' },
              ]}
            >
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function renderMenuItem(title: string, subtitle: string, danger?: boolean) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View>
        <Text style={[styles.menuTitle, danger && { color: '#FF3B30' }]}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  scroll: {
    paddingBottom: 32,
  },

  header: {
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  topIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  profileRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1060FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#6B7280',
  },
  statsCard: {
    marginTop: 24,
    marginHorizontal: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,       // tăng padding để card rộng hơn
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
    textAlign: 'center',
    color: '#6B7280',
  },

  menuCard: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  menuSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 18,
    color: '#9CA3AF',
  },

  bottomBar: {
    marginTop: 28,
    marginHorizontal: 16,
    height: 70,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 6,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#6B7280',
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1060FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});