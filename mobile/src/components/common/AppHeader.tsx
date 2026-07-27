import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  avatarUri?: string | null;
  showNotificationDot?: boolean;
  onAvatarPress?: () => void;
  onMenuPress?: () => void;
};

const DEFAULT_AVATAR =
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress';

export default function AppHeader({
  avatarUri,
  showNotificationDot,
  onAvatarPress,
}: Props) {
  const imageUri =
    avatarUri?.trim() || DEFAULT_AVATAR;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onAvatarPress}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.avatar}
        />

        {showNotificationDot && (
          <View style={styles.dot} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },

  dot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EF4444',
  },
});