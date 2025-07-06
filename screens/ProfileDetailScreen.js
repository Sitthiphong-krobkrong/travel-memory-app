import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileDetailScreen({ route }) {
  const { profile } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{profile.name}</Text>
      <Text style={{ fontSize: 20, color: '#888', marginTop: 8 }}>อายุ: {profile.age} ปี</Text>
      {/* เพิ่มข้อมูลอื่น ๆ ได้ */}
    </View>
  );
}
