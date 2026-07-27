// src/app/trips/[id].tsx

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getTripById, Trip } from '../../services/tripService';

const TripDetailScreen: React.FC = () => {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const tripId = Array.isArray(params.id)
    ? params.id[0]
    : params.id ?? '';

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      try {
        if (!tripId) {
          throw new Error('Trip ID was not found');
        }

        const response = await getTripById(tripId);

        if (!response?.trip) {
          throw new Error('Trip information was not found');
        }

        setTrip(response.trip);
      } catch (error) {
        Alert.alert(
          'Error',
          error instanceof Error
            ? error.message
            : 'Unable to load trip information',
        );
      } finally {
        setLoading(false);
      }
    }

    loadTrip();
  }, [tripId]);

  const goHome = () => {
    router.push('/');
  };

  const goItinerary = () => {
    router.push({
      pathname: '/itinerary/[tripId]',
      params: { tripId },
    });
  };

  const goExpenses = () => {
    router.push({
      pathname: '/expenses/[tripId]',
      params: { tripId },
    });
  };

  const goChecklist = () => {
    router.push({
      pathname: '/checklist/[tripId]',
      params: { tripId },
    });
  };

  const goWeather = () => {
    router.push({
      pathname: '/weather/[tripId]',
      params: { tripId },
    });
  };

  const formatDate = (
    dateValue: string | null | undefined,
  ): string => {
    if (!dateValue) {
      return 'N/A';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatMoney = (
    amount: number | string | null | undefined,
    currencyCode: string | null | undefined,
  ): string => {
    const numericAmount = Number(amount ?? 0);
    const currency = currencyCode || '';

    if (Number.isNaN(numericAmount)) {
      return `${currency} 0`.trim();
    }

    return `${currency} ${numericAmount.toLocaleString('en-US', {
      maximumFractionDigits: 2,
    })}`.trim();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />

        <Text style={styles.loadingText}>
          Loading trip information...
        </Text>
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          Trip information could not be found.
        </Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={goHome}
        >
          <Text style={styles.backButtonText}>
            Return to Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const budget = Number(trip.budget ?? 0);

  // This remains 0 until an expenses API is connected.
  const spent = 0;
  const remaining = Math.max(budget - spent, 0);
  const spentProgress =
    budget > 0 ? Math.min(spent / budget, 1) : 0;

  const imageSource = trip.cover_image_url
    ? { uri: trip.cover_image_url }
    : { uri: 'https://picsum.photos/800/500?random=1' };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO IMAGE AND TOP BAR */}
        <View style={styles.heroContainer}>
          <Image
            source={imageSource}
            style={styles.heroImage}
          />

          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={goHome}
            >
              <Text style={styles.circleBtnIcon}>{'<'}</Text>
            </TouchableOpacity>

            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.circleBtn}>
                <Text style={styles.circleBtnIcon}>♥</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroBottomRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {trip.status || 'Upcoming'}
              </Text>
            </View>
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          {/* TITLE */}
          <View style={styles.titleRow}>
            <View style={styles.titleContent}>
              <Text style={styles.title}>
                {trip.name || 'Untitled trip'}
              </Text>

              <View style={styles.subRow}>
                <Text style={styles.iconText}>📍</Text>

                <Text style={styles.subTitle}>
                  {trip.destination || 'Unknown destination'}
                  {trip.country ? `, ${trip.country}` : ''}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <Text style={styles.editText}>✎</Text>
            </TouchableOpacity>
          </View>

          {/* INFORMATION SUMMARY */}
          <View style={styles.infoRow}>
            <InfoCard
              icon="📅"
              value={formatDate(trip.start_date)}
              label="Start Date"
            />

            <InfoCard
              icon="📅"
              value={formatDate(trip.end_date)}
              label="End Date"
            />

            <InfoCard
              icon="💰"
              value={formatMoney(
                trip.budget,
                trip.currency_code,
              )}
              label="Budget"
            />

            <InfoCard
              icon="🏖️"
              value={trip.travel_type || 'N/A'}
              label="Travel Type"
            />
          </View>

          {/* DESCRIPTION */}
          <SectionContainer title="Description">
            <Text style={styles.descText}>
              {trip.description ||
                'No description is available for this trip.'}
            </Text>
          </SectionContainer>

          {/* ADDITIONAL INFORMATION */}
          {(trip.transportation_type || trip.hotel_name) && (
            <SectionContainer title="Trip Information">
              {trip.transportation_type && (
                <Text style={styles.descText}>
                  Transportation: {trip.transportation_type}
                </Text>
              )}

              {trip.hotel_name && (
                <Text style={styles.descText}>
                  Hotel: {trip.hotel_name}
                </Text>
              )}
            </SectionContainer>
          )}

          {/* ITINERARY */}
          <SectionHeader
            title="Itinerary"
            actionLabel="View all"
          />

          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>
              No itinerary data is available.
            </Text>
          </View>

          {/* BUDGET OVERVIEW */}
          <SectionHeader
            title="Budget Overview"
            actionLabel="View details"
          />

          <View style={styles.budgetCard}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressSegment,
                  {
                    flex: Math.max(1 - spentProgress, 0),
                  },
                ]}
              />

              <View
                style={[
                  styles.progressSegmentSpent,
                  {
                    flex: spentProgress,
                  },
                ]}
              />
            </View>

            <View style={styles.budgetRow}>
              <BudgetItem
                label="Total Budget"
                value={formatMoney(
                  budget,
                  trip.currency_code,
                )}
                color="#0057ff"
              />

              <BudgetItem
                label="Spent"
                value={formatMoney(
                  spent,
                  trip.currency_code,
                )}
                color="#f59e0b"
              />

              <BudgetItem
                label="Remaining"
                value={formatMoney(
                  remaining,
                  trip.currency_code,
                )}
                color="#16a34a"
              />
            </View>
          </View>

          {/* QUICK ACTIONS */}
          <SectionContainer title="Quick Actions">
            <View style={styles.quickRow}>
              <QuickAction
                icon="📅"
                label="Itinerary"
                onPress={goItinerary}
              />

              <QuickAction
                icon="💳"
                label="Expenses"
                onPress={goExpenses}
              />

              <QuickAction
                icon="✅"
                label="Checklist"
                onPress={goChecklist}
              />

              <QuickAction
                icon="🌤️"
                label="Weather"
                onPress={goWeather}
              />
            </View>
          </SectionContainer>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={goExpenses}
        >
          <Text style={styles.primaryBtnText}>
            + Add Expense
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* =========================================================
   SUB COMPONENTS
========================================================= */

type InfoCardProps = {
  icon: string;
  value: string;
  label: string;
};

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  value,
  label,
}) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoIcon}>{icon}</Text>

    <Text
      style={styles.infoValue}
      numberOfLines={2}
    >
      {value}
    </Text>

    <Text style={styles.infoLabel}>
      {label}
    </Text>
  </View>
);

type SectionContainerProps = {
  title?: string;
  children: React.ReactNode;
};

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
}) => (
  <View style={styles.sectionContainer}>
    {title && (
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
    )}

    {children}
  </View>
);

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
}) => (
  <View style={styles.sectionHeaderRow}>
    <Text style={styles.sectionTitle}>
      {title}
    </Text>

    {actionLabel && (
      <TouchableOpacity>
        <Text style={styles.sectionAction}>
          {actionLabel}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

type BudgetItemProps = {
  label: string;
  value: string;
  color: string;
};

const BudgetItem: React.FC<BudgetItemProps> = ({
  label,
  value,
  color,
}) => (
  <View style={styles.budgetItem}>
    <Text style={styles.budgetLabel}>
      {label}
    </Text>

    <Text
      style={[
        styles.budgetValue,
        { color },
      ]}
    >
      {value}
    </Text>
  </View>
);

type QuickActionProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.quickItem}
    onPress={onPress}
  >
    <Text style={styles.quickIcon}>
      {icon}
    </Text>

    <Text style={styles.quickLabel}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 24,
  },

  loadingText: {
    marginTop: 12,
    color: '#4b5563',
    fontSize: 14,
  },

  errorText: {
    color: '#dc2626',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 16,
  },

  backButton: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  backButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  scrollContent: {
    paddingBottom: 96,
  },

  heroContainer: {
    position: 'relative',
  },

  heroImage: {
    width: '100%',
    height: 260,
  },

  topBar: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.96)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleBtnIcon: {
    fontSize: 20,
  },

  topBarRight: {
    flexDirection: 'row',
    gap: 8,
  },

  heroBottomRow: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e0f2fe',
    marginBottom: 20,
  },

  tagText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 12,
  },

  mainCard: {
    marginTop: -24,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  titleContent: {
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },

  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  iconText: {
    marginRight: 4,
  },

  subTitle: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
  },

  editText: {
    fontSize: 18,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  infoCard: {
    width: '25%',
    paddingVertical: 12,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 22,
    marginBottom: 6,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: '#0f172a',
  },

  infoLabel: {
    fontSize: 11,
    marginTop: 2,
    color: '#6b7280',
    textAlign: 'center',
  },

  sectionContainer: {
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },

  descText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },

  sectionHeaderRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionAction: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '500',
  },

  emptySection: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
  },

  emptySectionText: {
    color: '#6b7280',
    fontSize: 13,
  },

  budgetCard: {
    marginTop: 8,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#f9fafb',
  },

  progressBarBackground: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    overflow: 'hidden',
  },

  progressSegment: {
    backgroundColor: '#1d4ed8',
  },

  progressSegmentSpent: {
    backgroundColor: '#f59e0b',
  },

  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  budgetItem: {
    flex: 1,
    alignItems: 'center',
  },

  budgetLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
    textAlign: 'center',
  },

  budgetValue: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },

  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },

  quickItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 12,
  },

  quickIcon: {
    fontSize: 22,
    marginBottom: 4,
    color: '#2563eb',
  },

  quickLabel: {
    fontSize: 11,
    color: '#4b5563',
    textAlign: 'center',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },

  primaryBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },

  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default TripDetailScreen;