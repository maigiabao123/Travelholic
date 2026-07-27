import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import WeatherCard from '../../components/trip/WeatherCard';
import { getTripById, Trip } from '../../services/tripService';

type CurrentWeather = {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
};

type WeatherResponse = {
  current: CurrentWeather;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
};

type LocationResult = {
  name: string;
  country?: string;
  country_code?: string;
  latitude: number;
  longitude: number;
};

type HourlyItem = {
  time: string;
  temp: string;
  icon: string;
};

type DailyItem = {
  day: string;
  date: string;
  min: string;
  max: string;
  icon: string;
  rain: string;
};

function getWeatherDescription(code: number): string {
  if (code === 0) return 'Trời quang';
  if (code === 1 || code === 2) return 'Nắng nhẹ';
  if (code === 3) return 'Nhiều mây';
  if (code === 45 || code === 48) return 'Sương mù';
  if (code >= 51 && code <= 57) return 'Mưa phùn';
  if (code >= 61 && code <= 67) return 'Có mưa';
  if (code >= 71 && code <= 77) return 'Có tuyết';
  if (code >= 80 && code <= 82) return 'Mưa rào';
  if (code >= 95 && code <= 99) return 'Có giông';

  return 'Không xác định';
}

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️';
  if (code === 1 || code === 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95 && code <= 99) return '⛈️';

  return '🌤️';
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatToday(): string {
  return new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'long',
  });
}

function formatDay(value: string, index: number): string {
  if (index === 0) {
    return 'Hôm nay';
  }

  return new Date(value).toLocaleDateString('vi-VN', {
    weekday: 'long',
  });
}

const WeatherScreen: React.FC = () => {
  const params = useLocalSearchParams<{
    tripId?: string | string[];
  }>();

  const tripId = Array.isArray(params.tripId)
    ? params.tripId[0]
    : params.tripId ?? '';

  const [trip, setTrip] = useState<Trip | null>(null);
  const [location, setLocation] =
    useState<LocationResult | null>(null);
  const [weather, setWeather] =
    useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchWeather() {
      try {
        setLoading(true);
        setError('');

        if (!tripId) {
          throw new Error('Không tìm thấy ID của chuyến đi.');
        }

        // Lấy thông tin trip theo tripId
        const tripResponse = await getTripById(tripId);

        if (!tripResponse?.trip) {
          throw new Error(
            'Không tìm thấy thông tin chuyến đi.',
          );
        }

        const currentTrip = tripResponse.trip;

        if (isMounted) {
          setTrip(currentTrip);
        }

        const destination =
          currentTrip.destination?.trim() || '';
        const country = currentTrip.country?.trim() || '';

        if (!destination) {
          throw new Error(
            'Chuyến đi chưa có thông tin địa điểm.',
          );
        }

        /*
         * Thử tìm theo destination trước.
         * Ví dụ:
         * 1. California
         * 2. California, USA
         */
        const locationQueries = [
          destination,
          [destination, country]
            .filter(Boolean)
            .join(', '),
        ];

        let selectedLocation:
          | LocationResult
          | undefined;

        for (const query of locationQueries) {
          const geocodingUrl =
            `https://geocoding-api.open-meteo.com/v1/search` +
            `?name=${encodeURIComponent(query)}` +
            `&count=10` +
            `&language=en` +
            `&format=json`;

          const locationResponse =
            await fetch(geocodingUrl);

          if (!locationResponse.ok) {
            continue;
          }

          const locationData =
            await locationResponse.json();

          const results =
            locationData?.results as
              | LocationResult[]
              | undefined;

          if (!results || results.length === 0) {
            continue;
          }

          /*
           * Nếu có country_code thì ưu tiên kết quả
           * thuộc quốc gia tương ứng.
           *
           * USA được quy đổi thành US.
           */
          const normalisedCountry =
            country.toLowerCase() === 'usa'
              ? 'us'
              : country.toLowerCase();

          selectedLocation =
            results.find((item) => {
              if (!normalisedCountry) {
                return false;
              }

              return (
                item.country_code?.toLowerCase() ===
                normalisedCountry
              );
            }) || results[0];

          if (selectedLocation) {
            break;
          }
        }

        if (!selectedLocation) {
          throw new Error(
            `Không tìm thấy địa điểm: ${destination}, ${country}`,
          );
        }

        if (isMounted) {
          setLocation(selectedLocation);
        }

        // Fetch thời tiết theo latitude và longitude
        const weatherUrl =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${selectedLocation.latitude}` +
          `&longitude=${selectedLocation.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
          `&hourly=temperature_2m,weather_code` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max` +
          `&forecast_days=7` +
          `&timezone=auto`;

        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error(
            'Không thể tải dữ liệu thời tiết.',
          );
        }

        const weatherData =
          (await weatherResponse.json()) as WeatherResponse;

        if (isMounted) {
          setWeather(weatherData);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Không thể tải thông tin thời tiết.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [tripId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Đang tải thông tin thời tiết...
        </Text>
      </View>
    );
  }

  if (error || !weather || !location || !trip) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          {error || 'Không thể tải dữ liệu thời tiết.'}
        </Text>
      </View>
    );
  }

  const currentWeather = weather.current;

  const currentCondition = getWeatherDescription(
    currentWeather.weather_code,
  );

  const hourlyData: HourlyItem[] =
    weather.hourly.time
      .slice(0, 6)
      .map((time, index) => ({
        time:
          index === 0 ? 'Hiện tại' : formatTime(time),
        temp: `${Math.round(
          weather.hourly.temperature_2m[index],
        )}°`,
        icon: getWeatherIcon(
          weather.hourly.weather_code[index],
        ),
      }));

  const dailyData: DailyItem[] =
    weather.daily.time.map((date, index) => ({
      day: formatDay(date, index),
      date: formatDate(date),
      min: `${Math.round(
        weather.daily.temperature_2m_min[index],
      )}°`,
      max: `${Math.round(
        weather.daily.temperature_2m_max[index],
      )}°`,
      icon: getWeatherIcon(
        weather.daily.weather_code[index],
      ),
      rain: `${
        weather.daily.precipitation_probability_max[
          index
        ] ?? 0
      }%`,
    }));

  const sunrise = weather.daily.sunrise?.[0]
    ? formatTime(weather.daily.sunrise[0])
    : 'N/A';

  const sunset = weather.daily.sunset?.[0]
    ? formatTime(weather.daily.sunset[0])
    : 'N/A';

  const uvIndex = Math.round(
    weather.daily.uv_index_max?.[0] ?? 0,
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg',
          }}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay} />

          <View style={styles.headerContent}>
            <Text style={styles.locationIcon}>
              📍
            </Text>

            <View>
              <Text style={styles.locationText}>
                {location.name}
                {location.country
                  ? `, ${location.country}`
                  : ''}
              </Text>

              <Text style={styles.dateText}>
                {formatToday()}
              </Text>
            </View>
          </View>

          <View style={styles.currentTempBlock}>
            <Text style={styles.currentTemp}>
              {Math.round(
                currentWeather.temperature_2m,
              )}
              °
            </Text>

            <Text style={styles.currentCondition}>
              {currentCondition}
            </Text>

            <Text style={styles.currentDescription}>
              Thời tiết hiện tại tại địa điểm của
              chuyến đi.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.cardWrapper}>
          <WeatherCard
            title="Hiện tại"
            subtitle={`Cảm giác như ${Math.round(
              currentWeather.apparent_temperature,
            )}°`}
            temp={`${Math.round(
              currentWeather.temperature_2m,
            )}°`}
            description={currentCondition}
            humidity={`${currentWeather.relative_humidity_2m}%`}
            wind={`${Math.round(
              currentWeather.wind_speed_10m,
            )} km/h`}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Dự báo theo giờ
            </Text>
          </View>

          <FlatList
            horizontal
            data={hourlyData}
            keyExtractor={(item, index) =>
              `${item.time}-${index}`
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyList}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.hourCard,
                  index === 0 &&
                    styles.hourCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.hourLabel,
                    index === 0 &&
                      styles.hourLabelActive,
                  ]}
                >
                  {item.time}
                </Text>

                <Text style={styles.hourIcon}>
                  {item.icon}
                </Text>

                <Text
                  style={[
                    styles.hourTemp,
                    index === 0 &&
                      styles.hourTempActive,
                  ]}
                >
                  {item.temp}
                </Text>
              </View>
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Dự báo 7 ngày
            </Text>

            <Text style={styles.sectionLink}>
              Xem thêm
            </Text>
          </View>

          {dailyData.map((item, index) => (
            <View
              key={`${item.date}-${index}`}
              style={styles.dailyRow}
            >
              <View>
                <Text style={styles.dailyDay}>
                  {item.day}
                </Text>

                <Text style={styles.dailyDate}>
                  {item.date}
                </Text>
              </View>

              <Text style={styles.dailyIcon}>
                {item.icon}
              </Text>

              <View style={styles.dailyTemp}>
                <Text style={styles.dailyMin}>
                  {item.min}
                </Text>

                <Text style={styles.dailySlash}>
                  {' / '}
                </Text>

                <Text style={styles.dailyMax}>
                  {item.max}
                </Text>
              </View>

              <Text style={styles.dailyRain}>
                {item.rain}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                🌅
              </Text>

              <Text style={styles.infoLabel}>
                Bình minh
              </Text>

              <Text style={styles.infoValue}>
                {sunrise}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                🌇
              </Text>

              <Text style={styles.infoLabel}>
                Hoàng hôn
              </Text>

              <Text style={styles.infoValue}>
                {sunset}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>
                ☀️
              </Text>

              <Text style={styles.infoLabel}>
                UV Index
              </Text>

              <Text style={styles.infoValue}>
                {uvIndex}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>
            👕
          </Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.noticeTitle}>
              {currentWeather.temperature_2m >= 30
                ? 'Nên mặc quần áo thoáng mát.'
                : 'Nên mang theo áo khoác nhẹ.'}
            </Text>

            <Text style={styles.noticeSubtitle}>
              Dữ liệu thời tiết theo trip: {trip.name}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WeatherScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 12,
    color: '#4B5563',
    fontSize: 14,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 15,
    textAlign: 'center',
  },

  headerBackground: {
    height: 280,
    justifyContent: 'flex-end',
  },

  headerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(37, 99, 235, 0.35)',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  locationIcon: {
    fontSize: 18,
    marginRight: 6,
    color: '#FFFFFF',
  },

  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  dateText: {
    fontSize: 12,
    color: '#E5E7EB',
    marginTop: 2,
  },

  currentTempBlock: {
    paddingHorizontal: 20,
    paddingBottom: 22,
  },

  currentTemp: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  currentCondition: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: -6,
  },

  currentDescription: {
    fontSize: 13,
    color: '#E5E7EB',
    marginTop: 6,
  },

  cardWrapper: {
    marginHorizontal: 16,
    marginTop: -18,
  },

  section: {
    marginTop: 18,
    marginHorizontal: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  sectionLink: {
    fontSize: 12,
    color: '#2563EB',
  },

  hourlyList: {
    paddingVertical: 4,
  },

  hourCard: {
    width: 72,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    alignItems: 'center',
  },

  hourCardActive: {
    backgroundColor: '#2563EB',
  },

  hourLabel: {
    fontSize: 11,
    color: '#4B5563',
  },

  hourLabelActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  hourIcon: {
    fontSize: 22,
    marginVertical: 4,
  },

  hourTemp: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },

  hourTempActive: {
    color: '#FFFFFF',
  },

  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },

  dailyDay: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },

  dailyDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },

  dailyIcon: {
    fontSize: 20,
    marginLeft: 16,
  },

  dailyTemp: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },

  dailyMin: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },

  dailySlash: {
    fontSize: 13,
    color: '#6B7280',
  },

  dailyMax: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '600',
  },

  dailyRain: {
    fontSize: 12,
    color: '#0EA5E9',
    marginLeft: 16,
  },

  infoRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },

  infoItem: {
    alignItems: 'center',
    flex: 1,
  },

  infoIcon: {
    fontSize: 20,
  },

  infoLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  infoValue: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '600',
    marginTop: 2,
  },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 24,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  noticeIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  noticeTitle: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },

  noticeSubtitle: {
    fontSize: 11,
    color: '#2563EB',
    marginTop: 2,
  },
});