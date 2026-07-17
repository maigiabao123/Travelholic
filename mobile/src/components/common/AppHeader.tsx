// src/components/common/AppHeader.tsx
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface AppHeaderProps {
  avatarUri: string;
  showNotificationDot?: boolean;
  onMenuPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  avatarUri,
  showNotificationDot = true,
  onMenuPress,
}) => {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={onMenuPress}
      >
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, { width: 14 }]} />
      </TouchableOpacity>

      <View style={styles.headerRight}>
        {showNotificationDot && <View style={styles.notificationDot} />}
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  menuBtn: { width: 32, height: 32, justifyContent: 'center' },
  menuLine: {
    height: 3,
    width: 18,
    borderRadius: 2,
    backgroundColor: '#111827',
    marginBottom: 4,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginRight: 12,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
});

export default AppHeader;