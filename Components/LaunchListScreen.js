import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LaunchListScreen = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://api.spacexdata.com/v4/launches')
      .then(response => response.json())
      .then(data => {
        setLaunches(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Fetching Launches...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>SpaceX Launches</Text>
      <FlatList
        data={launches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.launchItem}
            onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
          >
            {/* <Image
              source={{ uri: item.links?.patch?.small}}
              style={styles.missionImage}
              resizeMode="contain"
            /> */}
            <View style={styles.launchInfo}>
              <Text style={styles.missionName}>{item.name}</Text>
              <Text>Date: {new Date(item.date_utc).toLocaleDateString()}</Text>
              <Text>Rocket: {item.rocket}</Text>
              <Text>Status: {item.success ? '✅ Success' : '❌ Failed'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#007AFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 18, color: '#555' },
  launchItem: { flexDirection: 'row', backgroundColor: 'white', padding: 15, marginVertical: 8, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  missionImage: { width: 50, height: 50, marginRight: 15 },
  launchInfo: { flex: 1 },
  missionName: { fontSize: 18, fontWeight: 'bold' },
});

export default LaunchListScreen;
