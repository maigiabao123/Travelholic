// app/create-trip.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type TravelType = 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Business';

const currencyOptions = ['VND', 'USD', 'AUD', 'EUR', 'GBP', 'JPY', 'CNY'];

async function getToken() {
  try {
    const value = await SecureStore.getItemAsync('authToken');
    return value;
  } catch (e) {
    console.log('SecureStore error:', e);
    return null;
  }
}

export default function CreateTripScreen() {
  const router = useRouter();

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState('VND');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [travelType, setTravelType] = useState<TravelType>('Solo');
  const [transportation, setTransportation] = useState('');
  const [hotel, setHotel] = useState('');

  // Date picker state
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const isWeb = Platform.OS === 'web';

  const API_BASE_URL = isWeb
    ? 'http://localhost:5000'
    : 'http://10.0.2.2:5000';

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`; // YYYY-MM-DD
  };

  const onChangeStart = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(formatDate(selectedDate));
    }
  };

  const onChangeEnd = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(formatDate(selectedDate));
    }
  };

  const handleCreateTrip = async () => {
    if (!tripName || !destination || !country || !startDate || !endDate || !budget) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        return;
      }

      const payload = {
        name: tripName,
        destination,
        country,
        start_date: startDate,
        end_date: endDate,
        budget: Number(budget),
        currency_code: currency,
        description,
        travel_type: travelType,
        transportation_type: transportation,
        hotel_name: hotel,
        cover_image_url: null,
      };

      const res = await fetch(`${API_BASE_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = data?.message || 'Tạo trip thất bại';
        throw new Error(msg);
      }

      Alert.alert('Thành công', 'Tạo trip thành công!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', (error as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          <TouchableOpacity style={styles.coverInner}>
            <Ionicons name="images-outline" size={40} color="#2563eb" />
            <Text style={styles.coverTitle}>Add a cover image</Text>
            <Text style={styles.coverSubtitle}>
              Upload a photo that represents your trip
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trip Name */}
        <FormLabel required>Trip Name</FormLabel>
        <TextInput
          style={styles.input}
          placeholder="e.g. Da Nang Summer Trip"
          value={tripName}
          onChangeText={setTripName}
        />

        {/* Destination / Country */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <FormLabel required>Destination</FormLabel>
            <TextInput
              style={styles.input}
              placeholder="e.g. Da Nang"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
          <View style={styles.gap} />
          <View style={styles.flex1}>
            <FormLabel required>Country</FormLabel>
            <TextInput
              style={styles.input}
              placeholder="Select country"
              value={country}
              onChangeText={setCountry}
            />
          </View>
        </View>

        {/* Dates */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <FormLabel required>Start Date</FormLabel>
            <TouchableOpacity
              onPress={() => !isWeb && setShowStartPicker(true)}
              activeOpacity={0.7}
            >
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={startDate}
                editable={isWeb} // mobile dùng picker, web vẫn gõ tay
                onChangeText={text => isWeb && setStartDate(text)}
              />
            </TouchableOpacity>
            {!isWeb && showStartPicker && (
              <DateTimePicker
                value={startDate ? new Date(startDate) : new Date()}
                mode="date"
                display="default"
                onChange={onChangeStart}
              />
            )}
          </View>

          <View style={styles.gap} />

          <View style={styles.flex1}>
            <FormLabel required>End Date</FormLabel>
            <TouchableOpacity
              onPress={() => !isWeb && setShowEndPicker(true)}
              activeOpacity={0.7}
            >
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={endDate}
                editable={isWeb}
                onChangeText={text => isWeb && setEndDate(text)}
              />
            </TouchableOpacity>
            {!isWeb && showEndPicker && (
              <DateTimePicker
                value={endDate ? new Date(endDate) : new Date()}
                mode="date"
                display="default"
                onChange={onChangeEnd}
              />
            )}
          </View>
        </View>

        {/* Budget / Currency */}
        <View style={styles.row}>
          <View style={styles.flex1}>
            <FormLabel required>Budget</FormLabel>
            <TextInput
              style={styles.input}
              placeholder="e.g. 8000000"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
            />
          </View>
          <View style={styles.gap} />
          <View style={styles.currencyContainer}>
            <FormLabel>Currency</FormLabel>
            <View>
              <TouchableOpacity
                style={styles.currencyBox}
                onPress={() => setCurrencyOpen(prev => !prev)}
                activeOpacity={0.7}
              >
                <Text style={styles.currencyText}>{currency}</Text>
                <Ionicons
                  name={currencyOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#6b7280"
                />
              </TouchableOpacity>
              {currencyOpen && (
                <View style={styles.currencyDropdown}>
                  {currencyOptions.map(code => (
                    <TouchableOpacity
                      key={code}
                      style={styles.currencyItem}
                      onPress={() => {
                        setCurrency(code);
                        setCurrencyOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.currencyItemText,
                          code === currency && styles.currencyItemTextActive,
                        ]}
                      >
                        {code}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Description */}
        <FormLabel>Description</FormLabel>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your trip, places to visit, goals..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Travel Type */}
        <FormLabel>Travel Type</FormLabel>
        <View style={styles.travelTypeRow}>
          {(['Solo', 'Couple', 'Family', 'Friends', 'Business'] as TravelType[]).map(
            type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.travelChip,
                  travelType === type && styles.travelChipActive,
                ]}
                onPress={() => setTravelType(type)}
              >
                <Text
                  style={[
                    styles.travelChipText,
                    travelType === type && styles.travelChipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* Transportation */}
        <FormLabel>Transportation Type</FormLabel>
        <TextInput
          style={styles.input}
          placeholder="Select transportation"
          value={transportation}
          onChangeText={setTransportation}
        />

        {/* Hotel */}
        <FormLabel>Hotel / Accommodation</FormLabel>
        <TextInput
          style={styles.input}
          placeholder="e.g. InterContinental Danang Sun Peninsula Resort"
          value={hotel}
          onChangeText={setHotel}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Create Trip Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleCreateTrip}>
          <Ionicons name="briefcase-outline" size={20} color="#ffffff" />
          <Text style={styles.primaryBtnText}>Create Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function FormLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <Text style={styles.label}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  coverContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  coverInner: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  coverTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  coverSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
    marginTop: 8,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 110,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  flex1: {
    flex: 1,
  },
  gap: {
    width: 12,
  },
  currencyContainer: {
    width: 110,
  },
  currencyBox: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyText: {
    fontSize: 14,
    color: '#111827',
  },
  currencyDropdown: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  currencyItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currencyItemText: {
    fontSize: 14,
    color: '#374151',
  },
  currencyItemTextActive: {
    fontWeight: '600',
    color: '#1d4ed8',
  },
  travelTypeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  travelChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  travelChipActive: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  travelChipText: {
    fontSize: 13,
    color: '#4b5563',
  },
  travelChipTextActive: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    gap: 8,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});