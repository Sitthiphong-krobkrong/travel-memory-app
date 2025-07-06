// TripStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TripListScreen from '../screens/TripListScreen';
import TripEditScreen from '../screens/TripEditScreen';

const Stack = createNativeStackNavigator();

export default function TripStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TripList" component={TripListScreen}
                options={{
                    title: 'รายการข้อมูล',
                    headerStyle: { backgroundColor: '#C62828' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontFamily: 'Kanit-Regular', fontSize: 22 },
                }}
            />
            <Stack.Screen name="TripEdit" component={TripEditScreen}
                options={{
                    title: 'จัดการข้อมูล',
                    headerStyle: { backgroundColor: '#C62828' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontFamily: 'Kanit-Regular', fontSize: 22 },
                }}
            />
        </Stack.Navigator>
    );
}
