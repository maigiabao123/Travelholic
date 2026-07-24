import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
const NAV_HEIGHT = 78;
const NAV_BOTTOM = 14;

const SHEET_HEIGHT = 380;
const SHEET_COLLAPSED_HEIGHT = 65;
const SHEET_COLLAPSED_POSITION =
  SHEET_HEIGHT - SHEET_COLLAPSED_HEIGHT;

type MapMessage =
  | {
    type: 'USER_LOCATION';
    latitude: number;
    longitude: number;
    accuracy?: number;
  }
  | {
    type: 'SEARCH_LOCATION';
    latitude: number;
    longitude: number;
    title: string;
  };

type SearchPlace = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
};

type PopularPlace = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

const popularPlaces: PopularPlace[] = [
  {
    id: 1,
    name: 'Chợ Bến Thành',
    address: 'Quận 1, Thành phố Hồ Chí Minh',
    latitude: 10.7721,
    longitude: 106.6983,
  },
  {
    id: 2,
    name: 'Nhà thờ Đức Bà',
    address: 'Công xã Paris, Quận 1',
    latitude: 10.7798,
    longitude: 106.699,
  },
  {
    id: 3,
    name: 'Phố đi bộ Nguyễn Huệ',
    address: 'Đường Nguyễn Huệ, Quận 1',
    latitude: 10.7741,
    longitude: 106.7037,
  },
];

const mapHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <style>
    html,
    body,
    #map {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }

    .leaflet-control-attribution {
      font-size: 9px;
    }
  </style>
</head>

<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
    const map = L.map('map', {
      zoomControl: false
    }).setView([10.7769, 106.7009], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    let userMarker = null;
    let accuracyCircle = null;
    let searchMarker = null;

    function handleMessage(event) {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'USER_LOCATION') {
          const position = [
            message.latitude,
            message.longitude
          ];

          map.setView(position, 17);

          if (userMarker) {
            map.removeLayer(userMarker);
          }

          if (accuracyCircle) {
            map.removeLayer(accuracyCircle);
          }

          accuracyCircle = L.circle(position, {
            radius: message.accuracy || 30,
            color: '#2878F0',
            fillColor: '#2878F0',
            fillOpacity: 0.14,
            weight: 1
          }).addTo(map);

          userMarker = L.circleMarker(position, {
            radius: 9,
            color: '#FFFFFF',
            weight: 3,
            fillColor: '#2878F0',
            fillOpacity: 1
          }).addTo(map);

          userMarker.bindPopup(
            'Vị trí hiện tại của bạn<br />' +
            'Sai số khoảng: ' +
            Math.round(message.accuracy || 0) +
            ' mét'
          );
        }

        if (message.type === 'SEARCH_LOCATION') {
          const position = [
            message.latitude,
            message.longitude
          ];

          map.setView(position, 17);

          if (searchMarker) {
            map.removeLayer(searchMarker);
          }

          searchMarker = L.marker(position)
            .addTo(map)
            .bindPopup(message.title)
            .openPopup();
        }
      } catch (error) {
        console.log('Map message error:', error);
      }
    }

    document.addEventListener('message', handleMessage);
    window.addEventListener('message', handleMessage);
  </script>
</body>
</html>
`;

export default function MapScreen() {
  const webViewRef = useRef<WebView>(null);
  const mapReady = useRef(false);
  const pendingMessage = useRef<MapMessage | null>(null);
  const locationSubscription =
    useRef<Location.LocationSubscription | null>(null);
  const locationTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Giá trị 0: Popular places mở sẵn khi vào màn hình.
  const translateY = useRef(new Animated.Value(0)).current;

  const sendMessageToMap = (message: MapMessage) => {
    if (!mapReady.current) {
      pendingMessage.current = message;
      return;
    }

    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  const handleMapLoaded = () => {
    mapReady.current = true;

    if (pendingMessage.current) {
      webViewRef.current?.postMessage(
        JSON.stringify(pendingMessage.current)
      );

      pendingMessage.current = null;
    }
  };

  const sendLocationToMap = (
    location: Location.LocationObject
  ) => {
    const { latitude, longitude, accuracy } = location.coords;

    sendMessageToMap({
      type: 'USER_LOCATION',
      latitude,
      longitude,
      accuracy: accuracy || 30,
    });
  };

  const stopLocationWatch = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }

    if (locationTimer.current) {
      clearTimeout(locationTimer.current);
      locationTimer.current = null;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsGettingLocation(true);
      stopLocationWatch();

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert(
          'Chưa được cấp quyền',
          'Bạn cần cho phép ứng dụng truy cập vị trí.'
        );
        return;
      }

      const gpsEnabled =
        await Location.hasServicesEnabledAsync();

      if (!gpsEnabled) {
        Alert.alert(
          'GPS đang tắt',
          'Vui lòng bật GPS hoặc Location trên điện thoại.'
        );
        return;
      }

      // Lấy vị trí có độ chính xác cao.
      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          mayShowUserSettingsDialog: true,
        });

      sendLocationToMap(currentLocation);

      /*
       * Theo dõi thêm 10 giây.
       * Thiết bị có thể cải thiện độ chính xác sau vài giây.
       */
      locationSubscription.current =
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (newLocation) => {
            sendLocationToMap(newLocation);
          }
        );

      locationTimer.current = setTimeout(() => {
        stopLocationWatch();
      }, 10000);
    } catch (error) {
      console.log('Location error:', error);

      try {
        const lastLocation =
          await Location.getLastKnownPositionAsync({
            maxAge: 120000,
            requiredAccuracy: 100,
          });

        if (lastLocation) {
          sendLocationToMap(lastLocation);

          Alert.alert(
            'Đang dùng vị trí gần đây',
            'Không lấy được GPS mới nhất nên ứng dụng đang dùng vị trí gần đây.'
          );
        } else {
          Alert.alert(
            'Không thể lấy vị trí',
            'Hãy bật GPS và thử lại ở nơi thoáng hơn.'
          );
        }
      } catch {
        Alert.alert(
          'Không thể lấy vị trí',
          'Vui lòng kiểm tra GPS và quyền vị trí.'
        );
      }
    } finally {
      setIsGettingLocation(false);
    }
  };

  const searchPlaces = async () => {
    const query = searchText.trim();

    if (!query) {
      Alert.alert(
        'Thiếu nội dung',
        'Vui lòng nhập tên địa điểm cần tìm.'
      );
      return;
    }

    try {
      setIsSearching(true);

      const url =
        'https://nominatim.openstreetmap.org/search' +
        '?format=jsonv2' +
        '&limit=5' +
        '&accept-language=vi' +
        `&q=${encodeURIComponent(query)}`;

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'MobileMapScreen/1.0',
        },
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const results: SearchPlace[] = await response.json();

      if (results.length === 0) {
        Alert.alert(
          'Không tìm thấy',
          'Không tìm thấy địa điểm phù hợp.'
        );
        return;
      }

      // Tự động chuyển tới kết quả đầu tiên.
      const firstPlace = results[0];

      sendMessageToMap({
        type: 'SEARCH_LOCATION',
        latitude: Number(firstPlace.lat),
        longitude: Number(firstPlace.lon),
        title: firstPlace.display_name,
      });

      setSearchText(firstPlace.display_name);
    } catch (error) {
      console.log('Search error:', error);

      Alert.alert(
        'Tìm kiếm thất bại',
        'Không thể kết nối tới dịch vụ tìm kiếm.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  const selectPopularPlace = (place: PopularPlace) => {
    sendMessageToMap({
      type: 'SEARCH_LOCATION',
      latitude: place.latitude,
      longitude: place.longitude,
      title: place.name,
    });

    collapseSheet();
  };

  const expandSheet = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const collapseSheet = () => {
    Animated.spring(translateY, {
      toValue: SHEET_COLLAPSED_POSITION,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 8;
      },

      onPanResponderMove: (_, gestureState) => {
        const position = Math.max(
          0,
          Math.min(
            SHEET_COLLAPSED_POSITION,
            SHEET_COLLAPSED_POSITION + gestureState.dy
          )
        );

        translateY.setValue(position);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          expandSheet();
        } else if (gestureState.dy > 50) {
          collapseSheet();
        } else {
          translateY.stopAnimation((position) => {
            if (position < SHEET_COLLAPSED_POSITION / 2) {
              expandSheet();
            } else {
              collapseSheet();
            }
          });
        }
      },
    })
  ).current;

  useEffect(() => {
    getCurrentLocation();

    return () => {
      stopLocationWatch();
    };
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: mapHtml }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={handleMapLoaded}
        style={styles.map}
      />

      {/* Thanh tìm kiếm */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#697386"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={searchPlaces}
            placeholder="Tìm kiếm địa điểm"
            placeholderTextColor="#8F98A8"
            returnKeyType="search"
            style={styles.searchInput}
          />

          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <Ionicons
                name="close-circle"
                size={21}
                color="#AAB1BD"
              />
            </Pressable>
          )}

          <Pressable
            onPress={searchPlaces}
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Tìm</Text>
          </Pressable>
        </View>

        {isSearching && (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>
              Đang tìm kiếm...
            </Text>
          </View>
        )}
      </View>

      {/* Nút lấy vị trí hiện tại */}
      <Pressable
        onPress={getCurrentLocation}
        style={styles.locationButton}
      >
        <Ionicons
          name={
            isGettingLocation
              ? 'ellipsis-horizontal'
              : 'navigate'
          }
          size={25}
          color="#2878F0"
        />
      </Pressable>

      {/* Panel Popular places */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.dragHandle} />

        <Text style={styles.sectionTitle}>
          Popular places
        </Text>

        {popularPlaces.map((place) => (
          <Pressable
            key={place.id}
            style={styles.placeItem}
            onPress={() => selectPopularPlace(place)}
          >
            <View style={styles.placeIcon}>
              <Ionicons
                name="location"
                size={20}
                color="#2878F0"
              />
            </View>

            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>
                {place.name}
              </Text>

              <Text
                numberOfLines={1}
                style={styles.placeAddress}
              >
                {place.address}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#AAB1BD"
            />
          </Pressable>
        ))}
      </Animated.View>

      {/* Bottom navigation: Home - Trips - Plus - Map - Profile */}
      <View style={styles.bottomNavigation}>
        <Pressable style={styles.navItem} onPress={() => router.push('/')}>
          <Ionicons
            name="home-outline"
            size={25}
            color="#9AA3B2"
          />
          <Text style={styles.navLabel}>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => router.push('/trips')}>
          <Ionicons
            name="briefcase-outline"
            size={24}
            color="#9AA3B2"
          />
          <Text style={styles.navLabel} >Trips</Text>
        </Pressable>

        <Pressable
          style={styles.plusButtonWrapper}
          onPress={() => router.push('/booking/create')}
        >
          <View style={styles.plusButton}>
            <Ionicons
              name="add"
              size={39}
              color="#FFFFFF"
            />
          </View>
        </Pressable>

        {/* Map đang được chọn nên icon và chữ màu xanh */}
        <Pressable style={styles.navItem} onPress={() => router.push('/map')}>
          <Ionicons
            name="map"
            size={25}
            color="#2878F0"
          />
          <Text style={styles.activeNavLabel} >Map</Text>
        </Pressable>

        <Pressable style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons
            name="person-outline"
            size={25}
            color="#9AA3B2"
          />
          <Text style={styles.navLabel}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  map: {
    flex: 1,
  },

  searchWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 58 : 35,
    left: 16,
    right: 16,
    zIndex: 10,
  },

  searchBox: {
    height: 54,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 15,
    color: '#202633',
  },

  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 11,
    backgroundColor: '#2878F0',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  loadingBox: {
    marginTop: 8,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },

  loadingText: {
    color: '#697386',
    fontSize: 14,
  },

  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 190,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    zIndex: 15,
  },

  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: NAV_HEIGHT + NAV_BOTTOM + 8,
    height: SHEET_HEIGHT,
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
    elevation: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    zIndex: 20,
  },

  dragHandle: {
    alignSelf: 'center',
    width: 48,
    height: 5,
    marginBottom: 18,
    borderRadius: 5,
    backgroundColor: '#B8BEC8',
  },

  sectionTitle: {
    marginBottom: 12,
    color: '#202633',
    fontSize: 21,
    fontWeight: '700',
  },

  placeItem: {
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF1F5',
  },

  placeIcon: {
    width: 43,
    height: 43,
    marginRight: 12,
    borderRadius: 13,
    backgroundColor: '#EEF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeInfo: {
    flex: 1,
  },

  placeName: {
    color: '#202633',
    fontSize: 16,
    fontWeight: '600',
  },

  placeAddress: {
    marginTop: 4,
    color: '#8F98A8',
    fontSize: 13,
  },

  bottomNavigation: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: NAV_BOTTOM,
    height: NAV_HEIGHT,
    paddingHorizontal: 7,
    paddingBottom: 3,
    borderRadius: 39,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.17,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    zIndex: 30,
  },

  navItem: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navLabel: {
    marginTop: 4,
    color: '#9AA3B2',
    fontSize: 12,
    fontWeight: '500',
  },

  activeNavLabel: {
    marginTop: 4,
    color: '#2878F0',
    fontSize: 12,
    fontWeight: '600',
  },

  plusButtonWrapper: {
    width: 76,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },

  plusButton: {
    width: 64,
    height: 64,
    marginTop: -24,
    borderRadius: 32,
    backgroundColor: '#2878F0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#2878F0',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});