// screens/SettingsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22 }}>
                ⚙️ Settings Screen
            </Text>
        </View>
    );
}