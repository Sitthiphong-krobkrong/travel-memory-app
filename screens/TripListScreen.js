import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function TripListScreen({ navigation }) {
    const [trips, setTrips] = useState([]);

    const loadTrips = useCallback(async () => {
        const tripsStr = await AsyncStorage.getItem('trips');
        setTrips(tripsStr ? JSON.parse(tripsStr) : []);
    }, []);

    // ใช้ useFocusEffect ดึงข้อมูลใหม่ทุกครั้งที่หน้านี้ active
    useFocusEffect(
        useCallback(() => {
            loadTrips();
        }, [loadTrips])
    );

    // ลบ trip
    const handleDeleteTrip = (id) => {
        Alert.alert('ลบทริป', 'ต้องการลบทริปนี้?', [
            { text: 'ยกเลิก' },
            {
                text: 'ลบ', style: 'destructive', onPress: async () => {
                    let updated = trips.filter(trip => trip.id !== id);
                    await AsyncStorage.setItem('trips', JSON.stringify(updated));
                    setTrips(updated);
                }
            }
        ]);
    };

    // แปลงวันที่เป็นรูปแบบที่ต้องการ
    // ฟังก์ชันสำหรับแปลงวันที่ ISO เป็นรูปแบบที่ต้องการ
    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const d = new Date(isoDate);
        return d.toLocaleDateString('th-TH', {
            year: 'numeric', month: 'short', day: 'numeric',
        }) + ' ' +
            d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    };

    // ฟังก์ชันสำหรับ render แต่ละ trip item
    // ใช้ FlatList เพื่อแสดงรายการทริป
    const renderTripItem = ({ item }) => (
        <View style={styles.tripCard}>
            {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.tripPhoto} />
            ) : (
                <View style={styles.tripPhotoPlaceholder}>
                    <MaterialIcons name="photo" size={28} color="#ccc" />
                </View>
            )}
            <View style={{ flex: 1, marginLeft: 12 }}>
                <TouchableOpacity onPress={() => navigation.navigate('TripEdit', { trip: item })}>
                    <Text style={styles.tripTitle}>{item.tripName}</Text>
                    <Text style={styles.tripDate}>{formatDate(item.date)}</Text>
                    <Text style={styles.tripDetail} numberOfLines={2}>{item.notes}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleDeleteTrip(item.id)}>
                <MaterialIcons name="delete" size={24} color="#C62828" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F7FAFC', padding: 16 }}>
            <FlatList
                data={trips}
                keyExtractor={item => item.id}
                renderItem={renderTripItem}
                contentContainerStyle={{ paddingVertical: 10 }}
                ListEmptyComponent={<Text style={{ color: '#aaa', textAlign: 'center', marginTop: 48 }}>ยังไม่มีทริป</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tripCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 13,
        marginVertical: 7,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 7,
        elevation: 2,
        minHeight: 80,
        maxHeight: 120,
    },
    tripPhoto: { width: 54, height: 54, borderRadius: 9, backgroundColor: '#eee' },
    tripPhotoPlaceholder: {
        width: 54, height: 54, borderRadius: 9, backgroundColor: '#f2f2f2',
        alignItems: 'center', justifyContent: 'center',
    },
    tripTitle: { fontFamily: 'Kanit-Bold', fontSize: 18, color: '#C62828', marginBottom: 2 },
    tripDate: { fontFamily: 'Kanit-Regular', fontSize: 13, color: '#888', marginBottom: 2 },
    tripDetail: { fontFamily: 'Kanit-Regular', fontSize: 15, color: '#222' },
});
