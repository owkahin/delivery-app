import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { restaurantAPI } from '../services/api';
import { COLORS } from '../constants/colors';

export default function HomeScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async (term = '') => {
        setLoading(true);
        try {
            const response = await restaurantAPI.getAll(term);
            setRestaurants(response.data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchRestaurants(searchTerm);
    };

    const renderRestaurant = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: item._id })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>
                    {item.tags?.[0]} • {item.deliveryTime} • {item.priceRange}
                </Text>
                <Text style={styles.rating}>⭐ {item.rating || '4.5'}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Delivery App</Text>
                <Text style={styles.subtitle}>Jigjiga, Ethiopia 🇪🇹</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search food or restaurant"
                    placeholderTextColor={COLORS.textSecondary}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                refreshing={loading}
                onRefresh={() => fetchRestaurants(searchTerm)}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {loading ? 'Loading...' : 'No restaurants found'}
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        padding: 15,
        color: COLORS.text,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    searchButtonText: {
        color: COLORS.black,
        fontWeight: 'bold',
    },
    list: {
        padding: 20,
    },
    card: {
        backgroundColor: COLORS.secondary,
        borderRadius: 16,
        marginBottom: 15,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: COLORS.textSecondary,
    },
    cardContent: {
        padding: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 5,
    },
    details: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 5,
    },
    rating: {
        fontSize: 14,
        color: COLORS.primary,
    },
    emptyText: {
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 50,
    },
});
