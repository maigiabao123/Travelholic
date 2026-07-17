// src/screens/WeatherScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';
import WeatherCard from '../../components/trip/WeatherCard';

const HOURLY_DATA = [
  { time: 'Hiện tại', temp: '28°', icon: '🌤️' },
  { time: '10:00', temp: '29°', icon: '🌤️' },
  { time: '11:00', temp: '30°', icon: '🌤️' },
  { time: '12:00', temp: '31°', icon: '☁️' },
  { time: '13:00', temp: '31°', icon: '☁️' },
  { time: '14:00', temp: '30°', icon: '☁️' },
];

const DAILY_DATA = [
  { day: 'Hôm nay', date: '23 Tháng 5', min: '26°', max: '32°', icon: '🌤️', rain: '20%' },
  { day: 'Thứ Bảy', date: '24 Tháng 5', min: '27°', max: '33°', icon: '☀️', rain: '10%' },
  { day: 'Chủ Nhật', date: '25 Tháng 5', min: '26°', max: '31°', icon: '☁️', rain: '30%' },
  { day: 'Thứ Hai', date: '26 Tháng 5', min: '25°', max: '30°', icon: '🌧️', rain: '60%' },
];

const WeatherScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER + BACKGROUND */}
        <ImageBackground
          source={{ uri: 'https://images.pexels.com/photos/240526/pexels-photo-240526.jpeg' }}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay} />

          <View style={styles.headerContent}>
            <Text style={styles.locationIcon}>📍</Text>
            <View>
              <Text style={styles.locationText}>Đà Nẵng, Việt Nam</Text>
              <Text style={styles.dateText}>Thứ Sáu, 23 Tháng 5</Text>
            </View>
          </View>

          <View style={styles.currentTempBlock}>
            <Text style={styles.currentTemp}>28°</Text>
            <Text style={styles.currentCondition}>Nắng nhẹ</Text>
            <Text style={styles.currentDescription}>
              Kết hợp giữa nắng và mây. Thời tiết lý tưởng để khám phá!
            </Text>
          </View>
        </ImageBackground>

        {/* CARD HIỆN TẠI (DÙNG WeatherCard) */}
        <View style={styles.cardWrapper}>
          <WeatherCard
            title="Hiện tại"
            subtitle="Cảm giác như 31°"
            temp="28°"
            description="Nắng nhẹ"
            humidity="72%"
            wind="12 km/h"
          />
        </View>

        {/* DỰ BÁO THEO GIỜ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dự báo theo giờ</Text>
          </View>
          <FlatList
            horizontal
            data={HOURLY_DATA}
            keyExtractor={(item) => item.time}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyList}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.hourCard,
                  index === 0 && styles.hourCardActive,
                ]}
              >
                <Text
                  style={[
                    styles.hourLabel,
                    index === 0 && styles.hourLabelActive,
                  ]}
                >
                  {item.time}
                </Text>
                <Text style={styles.hourIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.hourTemp,
                    index === 0 && styles.hourTempActive,
                  ]}
                >
                  {item.temp}
                </Text>
              </View>
            )}
          />
        </View>

        {/* DỰ BÁO 7 NGÀY (DEMO 4 NGÀY) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dự báo 7 ngày</Text>
            <Text style={styles.sectionLink}>Xem thêm</Text>
          </View>

          {DAILY_DATA.map((item) => (
            <View key={item.day} style={styles.dailyRow}>
              <View>
                <Text style={styles.dailyDay}>{item.day}</Text>
                <Text style={styles.dailyDate}>{item.date}</Text>
              </View>

              <Text style={styles.dailyIcon}>{item.icon}</Text>

              <View style={styles.dailyTemp}>
                <Text style={styles.dailyMin}>{item.min}</Text>
                <Text style={styles.dailySlash}> / </Text>
                <Text style={styles.dailyMax}>{item.max}</Text>
              </View>

              <Text style={styles.dailyRain}>{item.rain}</Text>
            </View>
          ))}
        </View>

        {/* THÔNG TIN THÊM (BÌNH MINH, HOÀNG HÔN, UV) */}
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🌅</Text>
              <Text style={styles.infoLabel}>Bình minh</Text>
              <Text style={styles.infoValue}>05:12</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🌇</Text>
              <Text style={styles.infoLabel}>Hoàng hôn</Text>
              <Text style={styles.infoValue}>18:34</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>☀️</Text>
              <Text style={styles.infoLabel}>UV Index</Text>
              <Text style={styles.infoValue}>6 Cao</Text>
            </View>
          </View>
        </View>

        {/* GỢI Ý TRANG PHỤC */}
        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>👕</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.noticeTitle}>Nên mặc quần áo thoáng mát.</Text>
            <Text style={styles.noticeSubtitle}>
              Đừng quên kem chống nắng nhé!
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
    marginTop: -18, // đẩy card chồng lên ảnh
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