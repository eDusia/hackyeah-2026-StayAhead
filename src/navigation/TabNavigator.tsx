import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import { JobsScreen } from '@/screens/JobsScreen';
import { MessagesScreen } from '@/screens/MessagesScreen';
import { NewsScreen } from '@/screens/NewsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RoadmapScreen } from '@/screens/RoadmapScreen';
import { TodayScreen } from '@/screens/TodayScreen';
import type { MainTabParamList } from '@/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
          marginBottom: 4,
        },
        tabBarItemStyle: {
          paddingHorizontal: 0,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 86 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconSize = 21;
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Roadmap: focused ? 'map' : 'map-outline',
            News: focused ? 'newspaper' : 'newspaper-outline',
            Today: focused ? 'calendar' : 'calendar-outline',
            Jobs: focused ? 'briefcase' : 'briefcase-outline',
            Messages: focused ? 'chatbubbles' : 'chatbubbles-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={icons[route.name]} size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Roadmap"
        component={RoadmapScreen}
        options={{ title: 'Ścieżka' }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ title: 'Nowości' }}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{ title: 'Plan na dziś' }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{ title: 'Oferty pracy' }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Wiadomości' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}
