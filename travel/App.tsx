import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import TabNav from "./navigation/tabNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <TabNav />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tillåter att `TabNav` tar upp hela skärmytan
    backgroundColor: "#fff",
  },
});
