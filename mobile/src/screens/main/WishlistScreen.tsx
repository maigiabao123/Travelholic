import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  Bookmark,
  Briefcase,
  Heart,
  Home,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Tag,
  User,
} from 'lucide-react-native';

type WishlistDestination = {
  id: string;
  country: string;
  subtitle: string;
  region: string;
  rating: number;
  category: string;
  imageUrl: string;
};

const CARD_HEIGHT = 205;

const MOCK_WISHLIST: WishlistDestination[] = [
  {
    id: 'japan',
    country: 'Japan',
    subtitle: 'Land of the Rising Sun',
    region: 'Asia',
    rating: 4.8,
    category: 'Culture',
    imageUrl:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'switzerland',
    country: 'Switzerland',
    subtitle: 'The Land of Alps',
    region: 'Europe',
    rating: 4.7,
    category: 'Nature',
    imageUrl:
      'https://images.unsplash.com/photo-1570161766218-f8488ebb8078?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpdHplcmxhbmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 'italy',
    country: 'Italy',
    subtitle: 'Where History Comes Alive',
    region: 'Europe',
    rating: 4.6,
    category: 'History',
    imageUrl:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'new-zealand',
    country: 'New Zealand',
    subtitle: '100% Pure Adventure',
    region: 'Oceania',
    rating: 4.8,
    category: 'Adventure',
    imageUrl:
      'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'brazil',
    country: 'Brazil',
    subtitle: 'Vibrant Culture, Stunning Nature',
    region: 'South America',
    rating: 4.5,
    category: 'Culture',
    imageUrl:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'france',
    country: 'France',
    subtitle: 'The Art of Living',
    region: 'Europe',
    rating: 4.6,
    category: 'Culture',
    imageUrl:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
  },
];

type DestinationCardProps = {
  item: WishlistDestination;
  onRemove: (id: string) => void;
};

function DestinationCard({
  item,
  onRemove,
}: DestinationCardProps) {
  const handleRemove = () => {
    Alert.alert(
      'Remove destination',
      `Remove ${item.country} from your wishlist?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onRemove(item.id),
        },
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.destinationImage}
          resizeMode="cover"
        />

        <View style={styles.heartButton}>
          <Heart size={22} color="#F12C4D" fill="#F12C4D" />
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <View style={styles.titleContainer}>
            <Text style={styles.countryName} numberOfLines={1}>
              {item.country}
            </Text>

            <Text style={styles.subtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>

          <Pressable hitSlop={10}>
            <MoreHorizontal size={24} color="#080D35" />
          </Pressable>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <MapPin size={15} color="#3D4668" />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.region}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Star size={16} color="#F9A825" fill="#F9A825" />
            <Text style={styles.metaText}>
              {item.rating.toFixed(1)}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Tag size={15} color="#3D4668" />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.category}
            </Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.removeButton}
            onPress={handleRemove}
          >
            <Bookmark size={18} color="#10163A" />
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>

          <Pressable
            style={styles.planButton}
            onPress={() =>
              router.push({
                pathname: '/booking/create',
                params: {
                  destinationId: item.id,
                  destinationName: item.country,
                },
              })
            }
          >
            <Briefcase size={18} color="#FFFFFF" />
            <Text style={styles.planText}>Plan Trip</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function BottomNavigation() {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push('/')}
      >
        <Home size={24} color="#9CA3AF" />
        <Text style={styles.tabText}>Home</Text>
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
        onPress={() => router.push('/Wishlist')}
      >
        <Heart size={24} color="#F12C4D" fill="#F12C4D" />
        <Text style={[styles.tabText, styles.activeTabText]}>
          Wishlist
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push('/profile')}
      >
        <User size={24} color="#9CA3AF" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function WishlistScreen() {
  const [wishlist, setWishlist] =
    useState<WishlistDestination[]>(MOCK_WISHLIST);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setWishlist(MOCK_WISHLIST);
      setRefreshing(false);
    }, 600);
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== id),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerHeart}>
            <Heart size={29} color="#0759EF" fill="#0759EF" />
          </View>

          <View style={styles.headerTitleArea}>
            <Text style={styles.pageTitle}>My Wishlist</Text>
            <Text style={styles.pageDescription}>
              Places you want to explore someday
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable hitSlop={10}>
            <Search size={29} color="#070C32" />
          </Pressable>

          <Pressable style={styles.notificationButton} hitSlop={10}>
            <Bell size={28} color="#070C32" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>
      </View>

      <View style={styles.sortSection}>
        <View style={styles.savedRow}>
          <Bookmark size={22} color="#11183E" />
          <Text style={styles.savedText}>
            {wishlist.length} countries saved
          </Text>
        </View>

        <Pressable style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by</Text>

          <View style={styles.sortSelect}>
            <Text style={styles.sortSelectText}>Recently Added</Text>
            <Text style={styles.chevron}>⌄</Text>
          </View>
        </Pressable>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard
            item={item}
            onRemove={handleRemoveWishlist}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          wishlist.length === 0 && styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#0759EF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Heart size={52} color="#AAB1C5" />

            <Text style={styles.emptyTitle}>
              Your wishlist is empty
            </Text>

            <Text style={styles.emptyDescription}>
              Save places you would like to visit and they will appear here.
            </Text>

            <Pressable
              style={styles.restoreButton}
              onPress={() => setWishlist(MOCK_WISHLIST)}
            >
              <Text style={styles.restoreButtonText}>
                Restore mock data
              </Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={<View style={{ height: 105 }} />}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerHeart: {
    width: 62,
    height: 62,
    marginRight: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7883A4',
    shadowOpacity: 0.17,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  headerTitleArea: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#080D35',
  },

  pageDescription: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
    color: '#59627D',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  notificationButton: {
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -1,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: '#0759EF',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  sortSection: {
    paddingHorizontal: 24,
    marginTop: 30,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  savedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#182044',
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  sortText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B2042',
  },

  sortSelect: {
    height: 43,
    paddingHorizontal: 13,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#FFFFFF',
    shadowColor: '#8490B0',
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  sortSelectText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#182044',
  },

  chevron: {
    marginTop: -4,
    fontSize: 23,
    fontWeight: '700',
    color: '#182044',
  },

  listContent: {
    paddingHorizontal: 24,
    gap: 20,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  card: {
    width: '100%',
    height: CARD_HEIGHT,
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7380A3',
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  imageContainer: {
    width: '39%',
    height: CARD_HEIGHT,
    position: 'relative',
    backgroundColor: '#E8EBF3',
  },

  destinationImage: {
    width: '100%',
    height: CARD_HEIGHT,
  },

  heartButton: {
    position: 'absolute',
    top: 13,
    right: 10,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5A6380',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  cardContent: {
    flex: 1,
    height: CARD_HEIGHT,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  titleContainer: {
    flex: 1,
    paddingRight: 5,
  },

  countryName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#070C32',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '500',
    color: '#4F5878',
  },

  metaRow: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    maxWidth: 88,
  },

  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3D4668',
  },

  actionsRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 8,
  },

  removeButton: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  removeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#131A3C',
  },

  planButton: {
    flex: 1.12,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#0759EF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  planText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 38,
    paddingBottom: 100,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: '800',
    color: '#10163A',
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#68718B',
  },

  restoreButton: {
    height: 44,
    marginTop: 20,
    paddingHorizontal: 22,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#0759EF',
  },

  restoreButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
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
    shadowColor: '#000000',
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
    fontWeight: '600',
    color: '#F12C4D',
  },

  addButton: {
    width: 56,
    height: 56,
    marginHorizontal: 8,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
  },
});