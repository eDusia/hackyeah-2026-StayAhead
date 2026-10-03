import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text } from 'react-native';

import { getTranslations } from '@/i18n/translations';
import { JobsScreen } from '@/screens/JobsScreen';
import { MessagesScreen } from '@/screens/MessagesScreen';
import { NewsScreen } from '@/screens/NewsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RoadmapScreen } from '@/screens/RoadmapScreen';
import { TodayScreen } from '@/screens/TodayScreen';
import { useUserStore } from '@/store/useUserStore';
import type { MainTabParamList } from '@/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  const language = useUserStore((state) => state.language);
  const t = getTranslations(language);

  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabel: ({ color, children }) => (
          <Text
            numberOfLines={1}
            style={{
              color,
              fontSize: 10,
              fontWeight: '600',
              textAlign: 'center',
              marginTop: 3,
              width: '100%',
            }}
          >
            {children}
          </Text>
        ),
        tabBarItemStyle: {
          flex: 1,
          minWidth: 0,
          paddingHorizontal: 2,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingTop: 6,
          paddingBottom: Platform.OS === 'ios' ? 22 : 10,
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
        options={{ title: t.tabs.roadmap }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{ title: t.tabs.news }}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{ title: t.tabs.today }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{ title: t.tabs.jobs }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: t.tabs.messages }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t.tabs.profile }}
      />
    </Tab.Navigator>
  );
}
