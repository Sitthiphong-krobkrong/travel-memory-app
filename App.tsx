import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TripStack from './screenStacks/TripStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './screens/SettingsScreen';
const Icon = require('react-native-vector-icons/MaterialCommunityIcons').default;
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TripList"
        screenOptions={{
          tabBarActiveTintColor: '#C62828',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18 },
          tabBarLabelStyle: { fontFamily: 'Kanit-Bold', fontSize: 15 },
          headerStyle: { backgroundColor: '#C62828' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Kanit-Bold', fontSize: 22 }
        }}
      >
        <Tab.Screen
          name="TripList"
          component={TripStack}
          options={{
            tabBarLabel: 'รายการ'
            , headerShown: false // << ซ่อน header ของ Tab
            , tabBarIcon: ({ color, size }) => (
              <Icon name="view-list-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'ตั้งค่า'
            , headerShown: false // << ซ่อน header ของ Tab
            , tabBarIcon: ({ color, size }) => (
              <Icon name="cogs" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#C62828',
    padding: 24,
    fontFamily: 'Kanit-Regular', // <= ต้องตรงชื่อฟอนต์ที่ลงไว้!
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Kanit-Regular', // <= ต้องตรงชื่อฟอนต์ที่ลงไว้!
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Kanit-Regular', // <= ต้องตรงชื่อฟอนต์
  },
  bodyText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Kanit-Regular', // <= ต้องตรงชื่อฟอนต์
  },
});