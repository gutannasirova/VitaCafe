import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Animated } from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [showAddresses, setShowAddresses] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [showSupport, setShowSupport] = useState(false);

    const handleEditProfile = () => {
        console.log('Edit profile');
    };

    const toggleSection = (section) => {
        if (section === 'addresses') setShowAddresses(!showAddresses);
        if (section === 'orders') setShowOrders(!showOrders);
        if (section === 'cards') setShowCards(!showCards);
        if (section === 'support') setShowSupport(!showSupport);
    };

    const addresses = ['Москва, ул. Ленина, 10', 'СПб, Невский, 25'];
    const orders = ['Заказ #1243 - 1500₽', 'Заказ #1242 - 1200₽'];
    const cards = ['Visa **** 1234', 'Mastercard **** 5678'];
    const supportEmail = 'support@vitacafe.com';
    const [qrVisible, setQrVisible] = useState(false);

    const spinValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(spinValue, {
                    toValue: 0,
                    duration: 4000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-50deg"],
    });

    return (
        <ImageBackground source={require('./assets/fon.png')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Личный кабинет</Text>

                <View style={styles.profileCard}>
                    <Image source={require('./assets/Ava.png')} style={styles.avatar} />
                    {qrVisible && (
                        <View style={styles.qrModal}>
                            <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.closeButton}>
                                <AntDesign name="closecircleo" size={30} color="white" />
                            </TouchableOpacity>
                            <Image source={require('./assets/QRcod.png')} style={styles.qrFull} />
                        </View>
                    )}
                    <Text style={styles.name}>Иван Иванов</Text>
                    <TouchableOpacity onPress={handleEditProfile} style={styles.editIcon}>
                        <MaterialIcons name="edit" size={24} color="#777" />
                    </TouchableOpacity>
                </View>

                <View style={styles.bonusBlock}>
                    <View>
                        <Text style={styles.bonusTitle}>Бонусный счет</Text>
                        <Text style={styles.bonusSub}>1 балл = 1 руб</Text>
                        <View style={styles.bonusRow}>
                            <FontAwesome name="gift" size={20} color="white" />
                            <Text style={styles.bonusPoints}> 1500 бонусов</Text>
                        </View>
                    </View>
                    <Image source={require('./assets/QRcod.png')} style={styles.avatar} />
                </View>

                <Animated.Image
                    source={require('./assets/Bazelik.png')}
                    style={[styles.Bazelik, { transform: [{ rotate: spin }] }]}
                />
                <Animated.Image
                    source={require('./assets/Spinach2.png')}
                    style={[styles.Spinach, { transform: [{ rotate: spin }] }]}
                />

                <TouchableOpacity style={styles.navItem} onPress={() => toggleSection('addresses')}>
                    <Text style={styles.navText}>Адреса</Text>
                    <Text style={styles.arrow}>{showAddresses ? '▲' : '>'}</Text>
                </TouchableOpacity>
                {showAddresses && (
                    <>
                        {addresses.map((addr, idx) => (
                            <Text key={idx} style={styles.detailText}>{addr}</Text>
                        ))}
                        <TouchableOpacity style={styles.addButton} onPress={() => console.log('Добавить адрес')}>
                            <AntDesign name="pluscircleo" size={15} color="#4CAF50" style={styles.addIcon} />
                            <Text style={styles.addText}>Добавить адрес</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.navItem} onPress={() => toggleSection('orders')}>
                    <Text style={styles.navText}>История заказов</Text>
                    <Text style={styles.arrow}>{showOrders ? '▲' : '>'}</Text>
                </TouchableOpacity>
                {showOrders && orders.map((order, idx) => <Text key={idx} style={styles.detailText}>{order}</Text>)}

                <TouchableOpacity style={styles.navItem} onPress={() => toggleSection('cards')}>
                    <Text style={styles.navText}>Мои карты</Text>
                    <Text style={styles.arrow}>{showCards ? '▲' : '>'}</Text>
                </TouchableOpacity>
                {showCards && (
                    <>
                        {cards.map((card, idx) => (
                            <Text key={idx} style={styles.detailText}>{card}</Text>
                        ))}
                        <TouchableOpacity style={styles.addCardButton} onPress={() => console.log('Добавить карту')}>
                            <AntDesign name="pluscircleo" size={15} color="#4CAF50" style={styles.addCardIcon} />
                            <Text style={styles.addCardText}>Добавить карту</Text>
                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity style={styles.navItem} onPress={() => toggleSection('support')}>
                    <Text style={styles.navText}>Поддержка</Text>
                    <Text style={styles.arrow}>{showSupport ? '▲' : '>'}</Text>
                </TouchableOpacity>
                {showSupport && <Text style={styles.detailText}>{supportEmail}</Text>}

                <Text style={styles.logo}>VitaCafe</Text>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        width: 311,
        padding: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 26,
        marginBottom: 30,
        fontFamily: 'faberge',
    },
    profileCard: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 18,
        fontFamily: 'faberge',
        marginLeft: 10,
        flex: 1,
    },
    editIcon: {
        position: 'absolute',
        right: 15,
        top: 33,
    },
    bonusBlock: {
        backgroundColor: '#7bc100',
        borderRadius: 20,
        padding: 15,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bonusTitle: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'faberge',
    },
    bonusSub: {
        color: 'white',
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'faberge',
    },
    bonusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bonusPoints: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'faberge',
    },
    navItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
    navText: {
        fontSize: 17,
        fontFamily: 'faberge',
    },
    arrow: {
        fontSize: 22,
        color: '#222',
        fontFamily: 'faberge',
    },
    detailText: {
        fontSize: 15,
        paddingVertical: 5,
        paddingLeft: 10,
        color: '#555',
        fontFamily: 'faberge',
    },
    logo: {
        fontSize: 33,
        textAlign: 'center',
        fontFamily: 'faberge',
        marginTop: 40,
    },
    Bazelik: {
        position: "absolute",
        top: 180,
        left: 280,
        width: 50,
        height: 50,
    },
    Spinach: {
        position: "absolute",
        top: 570,
        right: 280,
        width: 50,
        height: 50,
    },
    addCardButton: {
        flexDirection: 'row',  // Рядом иконка + текст
        alignItems: 'center',  // Выравнивание по центру
        backgroundColor: '#7bc100',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
        justifyContent: 'center', // Центрирование контента
    },
    addCardIcon: {
        marginRight: 48, // Отступ между иконкой и текстом
    },
    addCardText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'faberge',
    },
    addButton: {
        flexDirection: 'row',  // Рядом иконка + текст
        alignItems: 'center',  // Выравнивание по центру
        backgroundColor: '#7bc100',
        padding: 10,
        borderRadius: 15,
        marginTop: 10,
        justifyContent: 'center', // Центрирование контента
    },
    addIcon: {
        marginRight: 8, // Отступ между иконкой и текстом
    },
    addText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'faberge',
    },
});