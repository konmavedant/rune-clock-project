import { View, Text, StyleSheet, Pressable, Platform, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/Button';

export default function HomeScreen() {
  const router = useRouter();
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.9);

  useEffect(() => {
    // Animate title when component mounts
    titleOpacity.value = withTiming(1, { duration: 1200 });
    titleScale.value = withTiming(1, { duration: 1200, easing: Easing.bezierFn(0.16, 1, 0.3, 1) });
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ scale: titleScale.value }]
    };
  });

  const handleGetStarted = () => {
    router.push('/webview');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg' }}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Animated.Text style={[styles.title, animatedTitleStyle]}>
              RUNE CLOCK
            </Animated.Text>
          </View>
        </View>

        <Button
          label="Let's Get Started"
          onPress={handleGetStarted}
          style={styles.button}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 42,
    color: Colors.gold,
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  button: {
    marginBottom: 48,
    width: '80%',
    alignSelf: 'center',
  },
});