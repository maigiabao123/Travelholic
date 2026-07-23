import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, Animated, PanResponder } from 'react-native';
import MapView, { Marker, MapViewProps } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.65;

const POPULAR_PLACES = [
  { id: 1, name: "Ba Na Hills", type: "Attraction", rating: 4.8, reviews: 12500, distance: "28 km", image: "https://source.unsplash.com/random/300x200/?banahills", coordinate: { latitude: 15.9956, longitude: 107.9969 } },
  { id: 2, name: "My Khe Beach", type: "Beach", rating: 4.6, reviews: 8700, distance: "3.2 km", image: "https://source.unsplash.com/random/300x200/?mykhebeach", coordinate: { latitude: 16.0725, longitude: 108.2342 } },
  { id: 3, name: "Dragon Bridge", type: "Landmark", rating: 4.7, reviews: 6200, distance: "2.1 km", image: "https://source.unsplash.com/random/300x200/?dragonbridge", coordinate: { latitude: 16.0611, longitude: 108.2278 } },
  { id: 4, name: "Highland Coffee", type: "Cafe", rating: 4.4, reviews: 1200, distance: "1.8 km", image: "https://source.unsplash.com/random/300x200/?coffee", coordinate: { latitude: 16.0544, longitude: 108.2022 } },
];

type Place = typeof POPULAR_PLACES[0];

export default function MapScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(POPULAR_PLACES);

  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<Animated.Value>(new Animated.Value(SCREEN_HEIGHT - 180)).current;

  // Lấy vị trí
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        await Location.getCurrentPositionAsync({});
      }
    })();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredPlaces(POPULAR_PLACES);
    } else {
      setFilteredPlaces(
        POPULAR_PLACES.filter(place =>
          place.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const goToPlace = (place: Place) => {
    mapRef.current?.animateToRegion({
      latitude: place.coordinate.latitude,
      longitude: place.coordinate.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map</Text>
        <Text style={styles.headerSubtitle}>Find places and add to your trips</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, attractions, restaurants..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 16.0544,
          longitude: 108.2022,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {POPULAR_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
            description={place.type}
            onPress={() => goToPlace(place)}
          />
        ))}
      </MapView>

      {/* Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: bottomSheetRef }] }]}>
        <View style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        <Text style={styles.sectionTitle}>Popular places near you</Text>

        <ScrollView style={styles.placesList} showsVerticalScrollIndicator={false}>
          {filteredPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.placeCard} onPress={() => goToPlace(place)}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.rating}>★ {place.rating}</Text>
                <Text style={styles.placeType}>{place.type} • {place.distance}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add to trip</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: '700' },
  headerSubtitle: { fontSize: 16, color: '#666' },
  searchContainer: { paddingHorizontal: 20, marginBottom: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 15, height: 50, shadowColor: '#000', shadowOpacity: 0.1, elevation: 3 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  map: { flex: 1 },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    elevation: 10,
  },
  dragHandleContainer: { alignItems: 'center', paddingVertical: 12 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#ddd', borderRadius: 3 },
  sectionTitle: { fontSize: 18, fontWeight: '700', paddingHorizontal: 20, marginBottom: 12 },
  placesList: { flex: 1, paddingHorizontal: 20 },
  placeCard: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 16, marginBottom: 16, padding: 10, elevation: 3 },
  placeImage: { width: 100, height: 100, borderRadius: 12 },
  placeInfo: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  placeName: { fontSize: 16, fontWeight: '700' },
  rating: { color: '#FFD700', fontWeight: '600', marginVertical: 4 },
  placeType: { color: '#666' },
  addButton: { backgroundColor: '#007AFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, alignSelf: 'center' },
  addButtonText: { color: 'white', fontWeight: '600', fontSize: 13 },
});