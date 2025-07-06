import { SafeAreaView, View, Text, StyleSheet, StatusBar } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
// import TripDetailScreen from './screens/TripDetailScreen';
// import AddTripScreen from './screens/AddTripScreen';
import TripListScreen from './screens/TripListScreen';
import TripEditScreen from './screens/TripEditScreen';
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
        {/* <Tab.Screen name="Home" component={HomeScreen}
          options={{
            //tabBarLabel: 'หน้าหลัก',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen name="TripList" component={TripListScreen}
          options={{
            tabBarLabel: 'รายการ',
            tabBarIcon: ({ color, size }) => (
              <Icon name="view-list-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen name="AddEdit" component={TripEditScreen}
          options={{
            tabBarLabel: 'เพิ่ม/แก้ไข',
            tabBarIcon: ({ color, size }) => (
              <Icon name="square-edit-outline" size={size} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name="Addtrip" component={AddTripScreen}
          options={{
            //tabBarLabel: 'เพิ่มทริป',
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus-box-outline" size={size} color={color} />
            ),
          }}
        /> */}
        {/* <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            //tabBarLabel: 'โปรไฟล์',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-outline" size={size} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen name="ตั้งค่า" component={SettingsScreen}
          options={{
            tabBarLabel: 'ตั้งค่า',
            tabBarIcon: ({ color, size }) => (
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