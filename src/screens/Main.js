import { View, StyleSheet } from "react-native";

import Header from "../components/main/Header";

const Main = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#080808",
  },
});
