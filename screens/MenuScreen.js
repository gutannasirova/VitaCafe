import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons"; // Иконки

const menuData = {
    Салаты: [
        { id: "1", title: "Салат с бурратой", calories: "120 ккал", price: 380, image: require("./assets/food_image2.png") },
        { id: "2", title: "Салат с бурратой", calories: "120 ккал", price: 380, image: require("./assets/food_image2.png") },
        { id: "3", title: "Салат с бурратой", calories: "120 ккал", price: 380, image: require("./assets/food_image2.png") },
        { id: "4", title: "Салат с бурратой", calories: "120 ккал", price: 380, image: require("./assets/food_image2.png") },
    ],
    Завтраки: [
        { id: "5", title: "Овсянка с фруктами", calories: "250 ккал", price: 300, image: require("./assets/food_image2.png") },
        { id: "6", title: "Омлет с зеленью", calories: "200 ккал", price: 320, image: require("./assets/food_image2.png") },
    ],
    Перекусы: [
        { id: "7", title: "Йогурт с гранолой", calories: "150 ккал", price: 250, image: require("./assets/food_image2.png") },
        { id: "8", title: "Ореховый микс", calories: "180 ккал", price: 280, image: require("./assets/food_image2.png") },
    ],
};

const MenuScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("Салаты");

    return (
        <ImageBackground source={require("./assets/fon.png")} style={styles.background}>
            <View style={styles.container}>
                {/* Верхняя панель с меню и поиском */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Feather name="menu" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.logo}>VitaCafe</Text>
                    <TouchableOpacity>
                        <Feather name="search" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Баннер с акцией */}
                <View style={styles.promoBanner}>
                    <View>
                        <Text style={styles.promoTitle}>Специально для тебя</Text>
                        <Text style={styles.promoText}>25% скидка на любой салат!</Text>
                    </View>
                    <Image source={require("./assets/food_image2.png")} style={styles.promoImage} />
                </View>

                {/* Категории */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>Категории</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>Смотреть все</Text>
                    </TouchableOpacity>
                </View>

                {/* Кнопки категорий и фильтр */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Feather name="sliders" size={22} color="black" />
                    </TouchableOpacity>

                    {Object.keys(menuData).map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.categoryButtonActive,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text style={selectedCategory === category ? styles.categoryTextActive : styles.categoryText}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Блюда из выбранной категории */}
                <FlatList
                    data={menuData[selectedCategory]}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={({ item }) => (
                        <View style={styles.foodCard}>
                            <Image source={item.image} style={styles.foodImage} />
                            <Text style={styles.foodTitle}>{item.title}</Text>
                            <Text style={styles.foodCalories}>{item.calories}</Text>
                            <Text style={styles.foodPrice}>{item.price}р</Text>
                            <TouchableOpacity style={styles.addToCart}>
                                <Feather name="shopping-cart" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

// 🎨 **Стили**
const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "serif",
    },
    promoBanner: {
        flexDirection: "row",
        backgroundColor: "#76b82a",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
    },
    promoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    promoText: {
        fontSize: 14,
        color: "#fff",
    },
    promoImage: {
        width: 120,
        height: 95,
        borderRadius: 10,
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    viewAll: {
        fontSize: 16,
        color: "#76b82a",
    },
    filterContainer: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
    },
    filterButton: {
        padding: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginRight: 10,
    },
    categoryButton: {
        backgroundColor: "#A4D279",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        marginRight: 10,
    },
    categoryButtonActive: {
        backgroundColor: "#fff",
    },
    categoryText: {
        fontSize: 16,
        color: "black",
    },
    categoryTextActive: {
        fontSize: 16,
        fontWeight: "bold",
    },
    foodCard: {
        backgroundColor: "#76b82a",
        width: "48%",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
    },
    foodImage: {
        width: 150,
        height: 120,
        left: 30,
        bottom: 15,
    },
    foodTitle: {
        fontSize: 18,
        color: "#fff",
        marginTop: 5,
    },
    foodCalories: {
        fontSize: 14,
        color: "#fff",
    },
    foodPrice: {
        fontSize: 20,
        color: "#fff",
        marginVertical: 5,
    },
    addToCart: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 25,
    },
});

export default MenuScreen;
