import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Platform, ScrollView, KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';

export default function TripEditScreen({ route, navigation }) {
    // Initialize state variables
    const editTrip = route?.params?.trip;
    const [tripName, setTripName] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [notes, setNotes] = useState('');

    // Load existing trip data if editing
    // ใช้ useEffect เพื่อโหลดข้อมูลทริปที่จะแก้ไข
    useEffect(() => {
        if (editTrip) {
            setTripName(editTrip.tripName || '');
            setDate(editTrip.date ? new Date(editTrip.date) : new Date());
            setPhoto(editTrip.photo || null);
            setNotes(editTrip.notes || '');
        }
    }, [editTrip]);

    // Reset form fields
    // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
    const resetForm = () => {
        setTripName('');
        setDate(new Date());
        setPhoto(null);
        setNotes('');
    };

    // Handle save action
    // ฟังก์ชันสำหรับบันทึกทริป
    const handleSave = async () => {
        if (!tripName.trim()) { Alert.alert('ต้องกรอกชื่อทริป'); return; }
        const newTrip = {
            id: editTrip ? editTrip.id : Date.now().toString(),
            tripName,
            date: date.toISOString(),
            photo,
            notes,
        };
        try {
            const tripsStr = await AsyncStorage.getItem('trips');
            let trips = tripsStr ? JSON.parse(tripsStr) : [];
            if (editTrip) {
                trips = trips.map(t => t.id === editTrip.id ? newTrip : t);
            } else {
                trips.push(newTrip);
            }
            await AsyncStorage.setItem('trips', JSON.stringify(trips));
            Alert.alert(editTrip ? 'บันทึกการแก้ไขแล้ว!' : 'บันทึกทริปสำเร็จ!');
            resetForm(); // <---- เพิ่มบรรทัดนี้
            navigation.goBack();
        } catch (err) {
            Alert.alert('เกิดข้อผิดพลาด', err.message);
        }
    };

    // Handle photo selection
    // ฟังก์ชันสำหรับเลือกภาพจากแกลเลอรี่
    const handleChoosePhoto = () => {
        ImagePicker.launchImageLibrary(
            { mediaType: 'photo', quality: 0.6 },
            response => {
                if (!response.didCancel && response.assets && response.assets.length > 0) {
                    setPhoto(response.assets[0].uri);
                }
            }
        );
    };

    // Handle date and time changes
    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงวันที่และเวลา
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) setDate(selectedDate);
    };

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงเวลา
    // ใช้ selectedTime เพื่ออัปเดตเวลาใน date
    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            let newDate = new Date(date);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            setDate(newDate);
        }
    };

    return (
        // ใช้ KeyboardAvoidingView เพื่อหลีกเลี่ยงคีย์บอร์ดปิดฟิลด์อินพุต
        // ใช้ ScrollView เพื่อให้สามารถเลื่อนดูฟอร์มได้เมื่อคีย์บอร์ดเปิด
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={{ fontFamily: 'Kanit-Bold', fontSize: 28, marginBottom: 24, color: '#C62828', textAlign: 'center', }}>{editTrip ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล'}</Text>
                <Text style={styles.label}>ชื่อทริป *</Text>
                <TextInput
                    style={styles.input}
                    value={tripName}
                    onChangeText={setTripName}
                    placeholder="ชื่อทริป"
                />
                <Text style={styles.label}>วันที่</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                    <Text>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                    />
                )}
                <Text style={styles.label}>เวลา</Text>
                <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
                    <Text>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onTimeChange}
                    />
                )}
                <Text style={styles.label}>เลือกรูปภาพ</Text>
                <TouchableOpacity
                    style={[styles.input, { alignItems: 'center', marginBottom: 8 }]}
                    onPress={handleChoosePhoto}>
                    <Text style={{ color: '#888', fontFamily: 'Kanit-Regular' }}>{photo ? 'เปลี่ยนรูป' : 'เลือกรูป'}</Text>
                </TouchableOpacity>
                {photo && (
                    <Image
                        source={{ uri: photo }}
                        style={{ width: 120, height: 120, borderRadius: 12, alignSelf: 'center', margin: 12 }}
                    />
                )}
                <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="รายละเอียดอื่น ๆ"
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={{ fontFamily: 'Kanit-Bold', color: '#fff', fontSize: 20 }}>{editTrip ? 'บันทึกการแก้ไข' : 'บันทึกทริป'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#bbb', marginTop: 12 }]} onPress={() => navigation.goBack()}>
                    <Text style={{ fontFamily: 'Kanit-Bold', color: '#fff', fontSize: 20 }}>ยกเลิก</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, alignItems: 'stretch' },
    title: { fontFamily: 'Kanit-Bold', fontSize: 28, marginBottom: 24, color: '#C62828', textAlign: 'center', fontWeight: 'bold' },
    label: { fontFamily: 'Kanit-Regular', fontSize: 16, marginBottom: 6, marginTop: 16, color: '#C62828' },
    input: {
        backgroundColor: '#fff',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        fontFamily: 'Kanit-Regular',
        color: '#222',
        marginBottom: 2
    },
    button: {
        backgroundColor: '#C62828',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: { fontFamily: 'Kanit-Bold', color: '#fff', fontSize: 20, fontWeight: 'bold' },
});