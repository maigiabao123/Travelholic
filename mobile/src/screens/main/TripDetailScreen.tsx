// src/app/trips/[id].tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const TripDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // id = tripId
  const tripId = id ?? '';

  const goHome = () => router.push('/');
  const goItinerary = () =>
    router.push({ pathname: '/itinerary/[tripId]', params: { tripId } });
  const goExpenses = () =>
    router.push({ pathname: '/expenses/[tripId]', params: { tripId } });
  const goChecklist = () =>
    router.push({ pathname: '/checklist/[tripId]', params: { tripId } });
  const goBooking = () =>
    router.push({ pathname: '/booking/create', params: { tripId } });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HERO IMAGE + TOP BAR */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://picsum.photos/800/500?random=1' }}
            style={styles.heroImage}
          />

          {/* Top bar */}
          <View style={styles.topBar}>
            {/* back về Home */}
            <TouchableOpacity style={styles.circleBtn} onPress={goHome}>
              <Text style={styles.circleBtnIcon}>{'<'}</Text>
            </TouchableOpacity>

            <View style={styles.topBarRight}>
              <TouchableOpacity style={styles.circleBtn}>
                <Text style={styles.circleBtnIcon}>♥</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upcoming + index */}
          <View style={styles.heroBottomRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Upcoming</Text>
            </View>
          </View>
        </View>

        {/* MAIN CARD */}
        <View style={styles.mainCard}>
          {/* Title */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Da Nang Beach Getaway</Text>
              <View style={styles.subRow}>
                <Text style={styles.iconText}>📍</Text>
                <Text style={styles.subTitle}>Da Nang, Vietnam</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.editText}>✎</Text>
            </TouchableOpacity>
          </View>

          {/* Info summary row */}
          <View style={styles.infoRow}>
            <InfoCard icon="📅" value="20 May 2024" label="Start Date" />
            <InfoCard icon="📅" value="25 May 2024" label="End Date" />
            <InfoCard icon="💰" value="$800" label="Budget" />
            <InfoCard icon="🏖️" value="Beach" label="Travel Type" />
          </View>

          {/* Description */}
          <SectionContainer title="Description">
            <Text style={styles.descText}>
              A relaxing vacation to enjoy the beautiful beaches, delicious
              seafood and explore the amazing places in Da Nang.
            </Text>
            <TouchableOpacity style={styles.seeMoreBtn}>
              <Text style={styles.seeMoreText}>See more ▾</Text>
            </TouchableOpacity>
          </SectionContainer>

          {/* Itinerary */}
          <SectionHeader title="Itinerary" actionLabel="View all" />
          <View style={styles.itineraryList}>
            <ItineraryItem
              title="My Khe Beach"
              date="20 May 2024"
              img="https://picsum.photos/200/120?random=2"
            />
            <ItineraryItem
              title="Ba Na Hills"
              date="21 May 2024"
              img="https://picsum.photos/200/120?random=3"
            />
            <ItineraryItem
              title="Hoi An Ancient Town"
              date="22 May 2024"
              img="https://picsum.photos/200/120?random=4"
            />
          </View>

          {/* Budget Overview */}
          <SectionHeader title="Budget Overview" actionLabel="View details" />
          <View style={styles.budgetCard}>
            {/* Progress bar */}
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressSegment, { flex: 0.4 }]} />
              <View style={[styles.progressSegmentSpent, { flex: 0.2 }]} />
              <View style={{ flex: 0.4 }} />
            </View>

            <View style={styles.budgetRow}>
              <BudgetItem label="Total Budget" value="$800" color="#0057ff" />
              <BudgetItem label="Spent" value="$320" color="#f59e0b" />
              <BudgetItem label="Remaining" value="$480" color="#16a34a" />
            </View>
          </View>

          {/* Quick Actions */}
          <SectionContainer title="Quick Actions">
            <View style={styles.quickRow}>
              <QuickAction icon="📅" label="Itinerary" onPress={goItinerary} />
              <QuickAction icon="💳" label="Expenses" onPress={goExpenses} />
              <QuickAction icon="✅" label="Checklist" onPress={goChecklist} />
              <QuickAction icon="🧳" label="Bookings" onPress={goBooking} />
              {/* Notes sẽ thêm sau khi bạn tạo route notes/[tripId].tsx */}
            </View>
          </SectionContainer>
        </View>
      </ScrollView>

      {/* Bottom primary button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryBtn} onPress={goExpenses}>
          <Text style={styles.primaryBtnText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ==== Sub components ==== */

type InfoCardProps = {
  icon: string;
  value: string;
  label: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, value, label }) => (
  <View style={styles.infoCard}>
    <Text style={styles.infoIcon}>{icon}</Text>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoLabel}>{label}</Text>
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
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
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
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

type ItineraryItemProps = {
  title: string;
  date: string;
  img: string;
};

const ItineraryItem: React.FC<ItineraryItemProps> = ({
  title,
  date,
  img,
}) => (
  <TouchableOpacity style={styles.itineraryItem}>
    <Image source={{ uri: img }} style={styles.itineraryImage} />
    <View style={styles.itineraryTextBox}>
      <Text style={styles.itineraryTitle}>{title}</Text>
      <Text style={styles.itineraryDate}>{date}</Text>
    </View>
    <Text style={styles.chevron}>{'>'}</Text>
  </TouchableOpacity>
);

type BudgetItemProps = {
  label: string;
  value: string;
  color: string;
};

const BudgetItem: React.FC<BudgetItemProps> = ({ label, value, color }) => (
  <View style={styles.budgetItem}>
    <Text style={styles.budgetLabel}>{label}</Text>
    <Text style={[styles.budgetValue, { color }]}>{value}</Text>
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
  <TouchableOpacity style={styles.quickItem} onPress={onPress}>
    <Text style={styles.quickIcon}>{icon}</Text>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

/* ==== Styles ==== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
    marginBottom: 20
  },
  tagText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 12,

  },
  pageIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  pageIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
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
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  seeMoreBtn: {
    marginTop: 4,
  },
  seeMoreText: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '500',
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

  itineraryList: {
    marginTop: 8,
  },
  itineraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 8,
  },
  itineraryImage: {
    width: 64,
    height: 48,
    borderRadius: 10,
    marginRight: 10,
  },
  itineraryTextBox: {
    flex: 1,
  },
  itineraryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  itineraryDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#9ca3af',
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
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: '700',
  },

  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  quickItem: {
    width: '20%',
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