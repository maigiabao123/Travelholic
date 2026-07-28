import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import destinations from '@/data/countryData';

type Destination = {
  id: string;
  name: string;
  flag?: string;
  subtitle?: string;
  heroImage: any;

  about?: {
    title?: string;
    description: string;
    image?: any;
  };

  quickFacts?: QuickFact[];
  attractions?: Attraction[];
  cities?: City[];
  foods?: Food[];
};

type QuickFact = {
  label: string;
  value: string;
  iconName?: string;
  icon?: string;
  iconColor?: string;
};

type Attraction = {
  id: string;
  name: string;
  image: any;
  rating: number;
  location: string;
};

type City = {
  id: string;
  name: string;
  image: any;
  description: string;
};

type Food = {
  id: string;
  name: string;
  image: any;
  description: string;
};

export default function CountryScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const params = useLocalSearchParams<{ id?: string | string[] }>();

  const countryId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const country = countryId
    ? (destinations as Record<string, Destination>)[countryId]
    : undefined;

  const [isFavourite, setIsFavourite] = useState(false);

  if (!country) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Không tìm thấy dữ liệu quốc gia.
        </Text>

        <Pressable
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Text style={styles.goBackText}>Quay lại</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DestinationHeader
          country={country}
          isFavourite={isFavourite}
          onBack={() => router.back()}
          onToggleFavourite={() =>
            setIsFavourite((value) => !value)
          }
        />

        <View style={styles.content}>
          {country.about && (
            <AboutSection
              data={country.about}
              countryName={country.name}
              width={width}
            />
          )}

          {country.quickFacts &&
            country.quickFacts.length > 0 && (
              <QuickFacts facts={country.quickFacts} />
            )}

          {country.attractions &&
            country.attractions.length > 0 && (
              <AttractionsSection
                attractions={country.attractions}
                onSeeAll={() => {
                  // Sau này có thể điều hướng tới:
                  // router.push(`/country/${country.id}/attractions`);
                }}
              />
            )}

          {country.cities &&
            country.cities.length > 0 && (
              <CitiesSection
                cities={country.cities}
                onSeeAll={() => {
                  // Sau này có thể điều hướng tới:
                  // router.push(`/country/${country.id}/cities`);
                }}
              />
            )}

          {country.foods &&
            country.foods.length > 0 && (
              <FoodsSection
                foods={country.foods}
                onSeeAll={() => {
                  // Sau này có thể điều hướng tới:
                  // router.push(`/country/${country.id}/foods`);
                }}
              />
            )}
        </View>
      </ScrollView>

      <BottomActions
        isFavourite={isFavourite}
        onPlanTrip={() => {
          router.push({
            pathname: '/booking/create',
            params: {
              countryId: country.id,
              countryName: country.name,
            },
          });
        }}
        onSave={() =>
          setIsFavourite((value) => !value)
        }
      />
    </View>
  );
}

/* =========================================
   HEADER
========================================= */

function DestinationHeader({
  country,
  isFavourite,
  onBack,
  onToggleFavourite,
}: {
  country: Destination;
  isFavourite: boolean;
  onBack: () => void;
  onToggleFavourite: () => void;
}) {
  return (
    <View style={styles.header}>
      <Image
        source={country.heroImage}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.headerOverlay} />

      <Pressable
        style={styles.backButton}
        onPress={onBack}
      >
        <Ionicons
          name="chevron-back"
          size={30}
          color="#111827"
        />
      </Pressable>

      <Pressable
        style={styles.favouriteButton}
        onPress={onToggleFavourite}
      >
        <Ionicons
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavourite ? '#EF233C' : '#111827'}
        />
      </Pressable>

      <View style={styles.headerText}>
        <View style={styles.titleRow}>
          <Text style={styles.countryName}>
            {country.name}
          </Text>

          {country.flag && (
            <Text style={styles.flag}>
              {country.flag}
            </Text>
          )}
        </View>

        <Text style={styles.subtitle}>
          {country.subtitle}
        </Text>
      </View>
    </View>
  );
}

/* =========================================
   ABOUT
========================================= */

function AboutSection({
  data,
  countryName,
  width,
}: {
  data: NonNullable<Destination['about']>;
  countryName: string;
  width: number;
}) {
  return (
    <View style={styles.aboutCard}>
      <View
        style={[
          styles.aboutTextContainer,
          { width: width * 0.53 },
        ]}
      >
        <Text style={styles.aboutTitle}>
          {data.title || `About ${countryName}`}
        </Text>

        <Text style={styles.aboutDescription}>
          {data.description}
        </Text>
      </View>

      {data.image && (
        <Image
          source={data.image}
          style={[
            styles.aboutImage,
            { width: width * 0.35 },
          ]}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

/* =========================================
   QUICK FACTS
========================================= */

function QuickFacts({
  facts,
}: {
  facts: QuickFact[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Quick Facts
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContent}
      >
        {facts.map((fact, index) => (
          <View
            key={`${fact.label}-${index}`}
            style={styles.factCard}
          >
            <View style={styles.factIconContainer}>
              {fact.iconName ? (
                <MaterialCommunityIcons
                  name={fact.iconName as any}
                  size={28}
                  color={fact.iconColor || '#7C3AED'}
                />
              ) : (
                <Text style={styles.factEmoji}>
                  {fact.icon}
                </Text>
              )}
            </View>

            <Text style={styles.factLabel}>
              {fact.label}
            </Text>

            <Text style={styles.factValue}>
              {fact.value}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* =========================================
   ATTRACTIONS
========================================= */

function AttractionsSection({
  attractions,
  onSeeAll,
}: {
  attractions: Attraction[];
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Top Attractions"
        onSeeAll={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContent}
      >
        {attractions.map((attraction) => (
          <View
            key={attraction.id}
            style={styles.attractionCard}
          >
            <Image
              source={attraction.image}
              style={styles.attractionImage}
              resizeMode="cover"
            />

            <Text
              style={styles.attractionName}
              numberOfLines={2}
            >
              {attraction.name}
            </Text>

            <View style={styles.ratingRow}>
              <Ionicons
                name="star"
                size={16}
                color="#FF8A00"
              />
              <Text style={styles.ratingText}>
                {attraction.rating}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color="#374151"
              />
              <Text
                style={styles.locationText}
                numberOfLines={1}
              >
                {attraction.location}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* =========================================
   CITIES
========================================= */

function CitiesSection({
  cities,
  onSeeAll,
}: {
  cities: City[];
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Cities to Visit"
        onSeeAll={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContent}
      >
        {cities.map((city) => (
          <View key={city.id} style={styles.cityCard}>
            <Image
              source={city.image}
              style={styles.cityImage}
              resizeMode="cover"
            />

            <Text style={styles.cityName}>
              {city.name}
            </Text>

            <Text
              style={styles.cityDescription}
              numberOfLines={3}
            >
              {city.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* =========================================
   FOODS
========================================= */

function FoodsSection({
  foods,
  onSeeAll,
}: {
  foods: Food[];
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Must-Try Foods"
        onSeeAll={onSeeAll}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.foodsContent}
      >
        {foods.map((food) => (
          <View key={food.id} style={styles.foodCard}>
            <Image
              source={food.image}
              style={styles.foodImage}
              resizeMode="cover"
            />

            <Text style={styles.foodName}>
              {food.name}
            </Text>

            <Text
              style={styles.foodDescription}
              numberOfLines={2}
            >
              {food.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/* =========================================
   SECTION HEADER
========================================= */

function SectionHeader({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Pressable onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all</Text>
      </Pressable>
    </View>
  );
}

/* =========================================
   BOTTOM ACTIONS
========================================= */

function BottomActions({
  isFavourite,
  onPlanTrip,
  onSave,
}: {
  isFavourite: boolean;
  onPlanTrip: () => void;
  onSave: () => void;
}) {
  return (
    <SafeAreaView style={styles.bottomSafeArea}>
      <View style={styles.bottomActions}>
        <Pressable
          style={styles.planButton}
          onPress={onPlanTrip}
        >
          <Ionicons
            name="briefcase-outline"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.planButtonText}>
            Plan a Trip
          </Text>
        </Pressable>

        <Pressable
          style={styles.saveButton}
          onPress={onSave}
        >
          <Ionicons
            name={
              isFavourite
                ? 'bookmark'
                : 'bookmark-outline'
            }
            size={24}
            color="#111827"
          />

          <Text style={styles.saveButtonText}>
            {isFavourite
              ? 'Saved'
              : 'Save to Wishlist'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 120,
  },

  content: {
    backgroundColor: '#FFFFFF',
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  errorText: {
    color: '#374151',
    fontSize: 16,
    textAlign: 'center',
  },

  goBackButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },

  goBackText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  header: {
    height: 350,
    position: 'relative',
    backgroundColor: '#CBD5E1',
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  headerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },

  backButton: {
    position: 'absolute',
    top: 55,
    left: 28,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  favouriteButton: {
    position: 'absolute',
    top: 55,
    right: 28,
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  headerText: {
    position: 'absolute',
    left: 32,
    bottom: 40,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countryName: {
    color: '#FFFFFF',
    fontSize: 46,
    fontWeight: '800',
  },

  flag: {
    fontSize: 38,
    marginLeft: 10,
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 5,
  },

  aboutCard: {
    minHeight: 220,
    marginHorizontal: 28,
    marginTop: -30,
    padding: 24,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },

  aboutTextContainer: {
    paddingRight: 10,
  },

  aboutTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
  },

  aboutDescription: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 27,
  },

  aboutImage: {
    height: 170,
    borderRadius: 16,
  },

  section: {
    marginTop: 30,
  },

  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '800',
  },

  seeAll: {
    color: '#087DFF',
    fontSize: 16,
    fontWeight: '700',
  },

  horizontalContent: {
    paddingHorizontal: 29,
  },

  factCard: {
    width: 108,
    minHeight: 137,
    marginRight: 10,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#F6F8FC',
  },

  factIconContainer: {
    width: 44,
    height: 44,
    marginBottom: 8,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },

  factEmoji: {
    fontSize: 23,
  },

  factLabel: {
    color: '#4B5563',
    fontSize: 12,
    textAlign: 'center',
  },

  factValue: {
    marginTop: 8,
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },

  attractionCard: {
    width: 168,
    minHeight: 204,
    marginRight: 14,
    paddingBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  attractionImage: {
    width: '100%',
    height: 118,
  },

  attractionName: {
    marginHorizontal: 10,
    marginTop: 10,
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 8,
  },

  ratingText: {
    marginLeft: 5,
    color: '#4B5563',
    fontSize: 13,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 6,
  },

  locationText: {
    flex: 1,
    marginLeft: 4,
    color: '#4B5563',
    fontSize: 13,
  },

  cityCard: {
    width: 140,
    minHeight: 190,
    marginRight: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },

  cityImage: {
    width: '100%',
    height: 106,
  },

  cityName: {
    marginHorizontal: 10,
    marginTop: 10,
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
  },

  cityDescription: {
    marginHorizontal: 10,
    marginTop: 5,
    color: '#4B5563',
    fontSize: 12,
    lineHeight: 18,
  },

  foodsContent: {
    paddingHorizontal: 29,
  },

  foodCard: {
    width: 125,
    marginRight: 12,
    alignItems: 'center',
  },

  foodImage: {
    width: 105,
    height: 105,
    borderRadius: 53,
  },

  foodName: {
    marginTop: 10,
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
  },

  foodDescription: {
    marginTop: 5,
    color: '#4B5563',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },

  bottomSafeArea: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
  },

  bottomActions: {
    gap: 10,
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  planButton: {
    flex: 1,
    height: 58,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#087DFF',
  },

  planButtonText: {
    marginLeft: 9,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  saveButton: {
    flex: 1,
    height: 58,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  saveButtonText: {
    marginLeft: 8,
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
  },
});