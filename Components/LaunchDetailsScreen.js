import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';

const LaunchDetailsScreen = ({ route, navigation }) => {
  const { launch } = route.params || {};

  if (!launch) {
    return <Text style={styles.errorText}>Error: No launch data available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: launch.links.patch.large }} style={styles.missionPatch} />
      <Text style={styles.title}>{launch.name}</Text>
      <Text>Date: {new Date(launch.date_utc).toLocaleDateString()}</Text>
      <Text>Rocket: {launch.rocket}</Text>
      <Text>Status: {launch.success ? '✅ Success' : '❌ Failed'}</Text>
      <Text>Details: {launch.details || 'No details available'}</Text>

      <Button title="🔙 Back to List" onPress={() => navigation.goBack()} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  missionPatch: { width: 150, height: 150, alignSelf: 'center', marginBottom: 15 },
  errorText: { textAlign: 'center', fontSize: 16, color: 'red', marginTop: 20 },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});

export default LaunchDetailsScreen;
