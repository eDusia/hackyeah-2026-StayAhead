import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigator } from '@/navigation/TabNavigator';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { useUserStore } from '@/store/useUserStore';
import type { RootStackParamList } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const isOnboarded = useUserStore((state) => state.profile.isOnboarded);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#020617' },
        }}
      >
        {isOnboarded ? (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
