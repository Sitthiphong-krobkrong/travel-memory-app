import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 22 }}> Map View</Text>
      {/* <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        <Marker
          coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
          title="Bangkok"
          description="Your Marker"
        />
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
