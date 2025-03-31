import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Modal, Animated, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons"; // Иконки
import Slider from "@react-native-community/slider"; // Ползунки

const menuData = {
    Салаты: [
        { id: "1", title: "Салат с бурратой", calories: 120, price: 380, image: require("./assets/food_image2.png") },
        { id: "2", title: "Салат Цезарь", calories: 250, price: 450, image: require("./assets/food_image2.png") },
        { id: "3", title: "Греческий салат", calories: 180, price: 320, image: require("./assets/food_image2.png") },
    ],
    Завтраки: [
        { id: "4", title: "Овсянка с фруктами", calories: 250, price: 300, image: require("./assets/food_image2.png") },
        { id: "5", title: "Омлет с зеленью", calories: 200, price: 320, image: require("./assets/food_image2.png") },
    ],
    Перекусы: [
        { id: "6", title: "Йогурт с гранолой", calories: 150, price: 250, image: require("./assets/food_image2.png") },
        { id: "7", title: "Ореховый микс", calories: 180, price: 280, image: require("./assets/food_image2.png") },
    ],
};

const MenuScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("Салаты");
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [caloriesRange, setCaloriesRange] = useState([150, 3000]); // Диапазон калорийности
    const [priceRange, setPriceRange] = useState([300, 3000]); // Диапазон стоимости
    const [searchQuery, setSearchQuery] = useState(""); // Состояние для поискового запроса
    const [filteredData, setFilteredData] = useState(menuData[selectedCategory]); // Фильтрованные данные
    const modalAnimation = useRef(new Animated.Value(0)).current;

    const openFilter = () => {
        setIsFilterVisible(true);
        Animated.timing(modalAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeFilter = () => {
        Animated.timing(modalAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsFilterVisible(false));
    };

    const applyFilters = () => {
        const filteredItems = menuData[selectedCategory].filter(
            (item) =>
                item.calories >= caloriesRange[0] &&
                item.calories <= caloriesRange[1] &&
                item.price >= priceRange[0] &&
                item.price <= priceRange[1]
        );
        setFilteredData(filteredItems);
        closeFilter();
    };

    // Функция для поиска по всем категориям
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setFilteredData(menuData[selectedCategory]); // Сброс поиска
            return;
        }

        // Поиск по всем категориям
        let foundCategory = selectedCategory;
        let foundItems = [];
        Object.keys(menuData).forEach((category) => {
            const items = menuData[category].filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            if (items.length > 0) {
                foundCategory = category;
                foundItems = items;
            }
        });

        // Переключение категории и обновление данных
        setSelectedCategory(foundCategory);
        setFilteredData(foundItems);
    };

    const modalTranslateY = modalAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [500, 0],
    });

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

                {/* Поисковая строка */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Поиск..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
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
                    <TouchableOpacity style={styles.filterButton} onPress={openFilter}>
                        <Feather name="sliders" size={22} color="black" />
                    </TouchableOpacity>

                    {Object.keys(menuData).map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.categoryButtonActive,
                            ]}
                            onPress={() => {
                                setSelectedCategory(category);
                                setFilteredData(menuData[category]);
                                setSearchQuery(""); // Сброс поиска при смене категории
                            }}
                        >
                            <Text style={selectedCategory === category ? styles.categoryTextActive : styles.categoryText}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Блюда из выбранной категории */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={styles.foodList}
                    renderItem={({ item }) => (
                        <View style={styles.foodCard}>
                            <Image source={item.image} style={styles.foodImage} />
                            <Text style={styles.foodTitle}>{item.title}</Text>
                            <Text style={styles.foodCalories}>{item.calories} ккал</Text>
                            <Text style={styles.foodPrice}>{item.price}р</Text>
                            <TouchableOpacity style={styles.addToCart}>
                                <Feather name="shopping-cart" size={18} color="black" />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* Модальное окно фильтра */}
                <Modal
                    visible={isFilterVisible}
                    transparent={true}
                    animationType="none"
                    onRequestClose={closeFilter}
                >
                    <View style={styles.modalOverlay}>
                        <Animated.View
                            style={[
                                styles.modalContainer,
                                { transform: [{ translateY: modalTranslateY }] },
                            ]}
                        >
                            <Text style={styles.modalTitle}>Фильтры</Text>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Калорийность</Text>
                                <View style={styles.sliderContainer}>
                                    <Text>{caloriesRange[0]}</Text>
                                    <Slider
                                        style={{ width: "80%", height: 40 }}
                                        minimumValue={100}
                                        maximumValue={3000}
                                        step={50}
                                        value={caloriesRange[0]}
                                        onValueChange={(value) => setCaloriesRange([value, caloriesRange[1]])}
                                        minimumTrackTintColor="#76b82a"
                                        maximumTrackTintColor="#ccc"
                                    />
                                    <Text>{caloriesRange[1]}</Text>
                                </View>
                            </View>
                            <View style={styles.filterSection}>
                                <Text style={styles.filterLabel}>Стоимость</Text>
                                <View style={styles.sliderContainer}>
                                    <Text>{priceRange[0]}</Text>
                                    <Slider
                                        style={{ width: "80%", height: 40 }}
                                        minimumValue={200}
                                        maximumValue={3000}
                                        step={100}
                                        value={priceRange[0]}
                                        onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                                        minimumTrackTintColor="#76b82a"
                                        maximumTrackTintColor="#ccc"
                                    />
                                    <Text>{priceRange[1]}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                                <Text style={styles.applyButtonText}>Применить</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>
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
    searchContainer: {
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
    },
    searchInput: {
        fontSize: 16,
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
        backgroundColor: "#76b82a",
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
    foodList: {
        marginTop: 15,
    },
    foodCard: {
        backgroundColor: "#76b82a",
        width: "48%",
        padding: 15,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    filterSection: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sliderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    applyButton: {
        backgroundColor: "#76b82a",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    applyButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default MenuScreen;
