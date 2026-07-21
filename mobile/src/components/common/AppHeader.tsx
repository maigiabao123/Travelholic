import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  avatarUri: string;
  showNotificationDot?: boolean;
  onAvatarPress?: () => void;
  onMenuPress?: () => void;
};

export default function AppHeader({
  avatarUri,
  showNotificationDot,
  onAvatarPress,
  onMenuPress,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Avatar clickable */}
      <TouchableOpacity onPress={onAvatarPress}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        {showNotificationDot && <View style={styles.dot} />}
      </TouchableOpacity>

      {/* Phần nút menu / setting bên phải nếu có */}
      {/* <TouchableOpacity onPress={onMenuPress}> ... </TouchableOpacity> */}
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