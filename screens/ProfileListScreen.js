import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const profiles = [
  { id: '1', name: 'Alice', age: 28 },
  { id: '2', name: 'Bob', age: 32 },
];

export default function ProfileListScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 18,
              marginBottom: 12,
              backgroundColor: '#F2F2F2',
              borderRadius: 12,
            }}
            onPress={() => navigation.navigate('ProfileDetail', { profile: item })}
          >
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
            <Text style={{ color: '#888' }}>อายุ {item.age}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
