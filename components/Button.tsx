import React from 'react';
import { 
  StyleSheet, 
  Text, 
  Pressable, 
  View, 
  StyleProp, 
  ViewStyle,
  Platform
} from 'react-native';
import { Colors } from '@/constants/Colors';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  interpolate,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button({ label, onPress, style }: ButtonProps) {
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 150, easing: Easing.bezierFn(0.25, 0.1, 0.25, 1) });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 200, easing: Easing.bezierFn(0.25, 0.1, 0.25, 1) });
  };

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
      ],
      backgroundColor: interpolateColor(
        pressed.value,
        [0, 1],
        [Colors.gold, Colors.goldDark]
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(pressed.value, [0, 1], [1, 0.98]) },
      ],
      color: interpolateColor(
        pressed.value,
        [0, 1],
        [Colors.background, Colors.background]
      ),
    };
  });

  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.pressableArea,
          { opacity: pressed ? 0.9 : 1 }
        ]}
      >
        <Animated.View style={[styles.button, animatedButtonStyle]}>
          <Animated.Text style={[styles.buttonText, animatedTextStyle]}>
            {label}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 56,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  pressableArea: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: Colors.gold,
    borderRadius: 16,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.goldGlow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
  },
});