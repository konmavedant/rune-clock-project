import React from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import * as Haptics from 'expo-haptics';

export function WebViewHeader() {
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <View style={styles.header}>
      <Pressable 
        onPress={handleBack}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.buttonPressed
        ]}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <ChevronLeft size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: Colors.gray200,
    opacity: 0.8,
  },
  backText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
    color: '#000',
  },
});