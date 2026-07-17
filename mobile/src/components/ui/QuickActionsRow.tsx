// src/components/common/QuickActionsRow.tsx
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface QuickAction {
  label: string;
  short: string;
  bg: string;
  route: string;
}

interface QuickActionsRowProps {
  actions: QuickAction[];
  onPressAction: (route: string) => void;
}

const QuickActionsRow: React.FC<QuickActionsRowProps> = ({
  actions,
  onPressAction,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.quickRow}
    >
      {actions.map(action => (
        <TouchableOpacity
          key={action.label}
          style={styles.quickItem}
          onPress={() => onPressAction(action.route)}
        >
          <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
            <Text style={styles.quickIconText}>{action.short}</Text>
          </View>
          <Text style={styles.quickLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  quickRow: { marginTop: 10, paddingRight: 16 },
  quickItem: { width: 80, marginRight: 12, alignItems: 'center' },
  quickIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickIconText: { fontSize: 20, fontWeight: '700' },
  quickLabel: {
    marginTop: 6,
    fontSize: 11,
    color: '#111827',
    textAlign: 'center',
  },
});

export default QuickActionsRow;