import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AgentChatScreen } from '@/screens/AgentChatScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RoadmapScreen } from '@/screens/RoadmapScreen';
import type { MainTabParamList } from '@/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? Math.max(insets.bottom, 16) : 16;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#818cf8',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: bottomOffset,
          left: 20,
          right: 20,
          height: 64,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          borderWidth: 1,
          borderColor: 'rgba(51, 65, 85, 0.7)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(51, 65, 85, 0.7)',
          borderRadius: 32,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 12,
        },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Feather.glyphMap> = {
            Home: 'compass',
            Roadmap: 'map',
            AgentChat: 'message-square',
            Profile: 'user',
          };

          return <Feather name={icons[route.name]} size={size - 2} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dziś' }} />
      <Tab.Screen name="Roadmap" component={RoadmapScreen} options={{ title: 'Ścieżka' }} />
      <Tab.Screen name="AgentChat" component={AgentChatScreen} options={{ title: 'Mentor' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}
