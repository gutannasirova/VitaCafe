import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ImageBackground, StyleSheet } from "react-native";

const foodItems = [
    { id: "1", title: "Салат с бурратой", calories: "120 ккал", price: "380 ₽", image: require("./assets/food_image2.png") },
    { id: "2", title: "Салат с лососем", calories: "140 ккал", price: "420 ₽", image: require("./assets/food_image2.png") },
    { id: "3", title: "Салат с авокадо", calories: "100 ккал", price: "360 ₽", image: require("./assets/food_image2.png") },
];

const popularItems = [
    { id: "4", title: "Салат Цезарь", description: "Курица, салат, сыр, соус", price: "350 ₽", image: require("./assets/food_image2.png") },
    { id: "5", title: "Паста Карбонара", description: "Спагетти, бекон, сливки", price: "420 ₽", image: require("./assets/food_image2.png") },
    { id: "6", title: "Суп Том Ям", description: "Креветки, кокос, чили", price: "490 ₽", image: require("./assets/food_image2.png") },
];

export default function HomeScreen() {
    return (
        <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
            {/* Верхняя панель */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={require("./assets/menu-icon.png")} style={styles.icon} />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>VitaCafe</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require("./assets/search.png")} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {/* Специальное предложение */}
            <View style={styles.specialOffer}>
                <Text style={styles.specialTitle}>Специально для тебя</Text>
                <Text style={styles.specialSubtitle}>25% скидка на любой салат!</Text>
                <Image source={require("./assets/food_image1.png")} style={styles.offerImage} />
            </View>

            {/* Популярные блюда */}
            <Text style={styles.sectionTitle}>Популярное</Text>
            <FlatList
                data={popularItems}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.popularCard}>
                        <Image source={item.image} style={styles.popularImage} />
                        <Text style={styles.popularTitle}>{item.title}</Text>
                        <Text style={styles.popularDescription}>{item.description}</Text>
                        <Text style={styles.popularPrice}>{item.price}</Text>
                    </View>
                )}
            />
        </ImageBackground>
    );
}

// Стили
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        paddingVertical: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
    logoContainer: {
        marginLeft: 10,
        marginTop: 10,
    },
    logo: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "serif",
    },
    specialOffer: {
        backgroundColor: "#76b82a",
        borderRadius: 15,
        padding: 30,
        marginHorizontal: 20,
        marginTop: 20,
        position: "relative",
        marginBottom: 30,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 6 },
        shadowRadius: 6,
        elevation: 5,
    },
    specialTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    specialSubtitle: {
        fontSize: 14,
        color: "#fff",
    },
    offerImage: {
        width: 140,
        height: 120,
        position: "absolute",
        left: 250,
        top: -10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 20,
        marginLeft: 20,
    },
    popularCard: {
        width: 220,
        height: 310,
        backgroundColor: "#76b82a",
        borderRadius: 15,
        marginHorizontal: 10,
        alignItems: "center",
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 4, height: 6 },
        shadowRadius: 6,
        elevation: 5,
    },
    popularImage: {
        width: 200,
        height: 160,
        resizeMode: "cover",
        left: 30,
        bottom: 10
    },
    popularTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        marginBottom: 5,
    },
    popularDescription: {
        fontSize: 14,
        color: "white",
        marginBottom: 5,
        textAlign: "left",
    },
    popularPrice: {
        fontSize: 20,
        color: "white",
    },
});
